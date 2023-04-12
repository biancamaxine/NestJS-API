import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddProjectsIdToProjectsTagsTable1681298685364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('projects_tags', new TableColumn({
            name: 'projectsId',
            type: 'uuid',
            isNullable: true,
        }));

        await queryRunner.createForeignKey('projects_tags', new TableForeignKey({
            name: 'projects_tags_projects',
            columnNames: ['projectsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'projects'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropForeignKey('project_tags', 'projects_tags_projects');
            
            await queryRunner.dropColumn('projects_tags', 'projectsId');
    }

}
