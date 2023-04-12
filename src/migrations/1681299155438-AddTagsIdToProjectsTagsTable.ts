import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddTagsIdToProjectsTagsTable1681299155438 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('projects_tags', new TableColumn({
            name: 'tagsId',
            type: 'uuid',
            isNullable: true,
        }));

        await queryRunner.createForeignKey('projects_tags', new TableForeignKey({
            name: 'projects_tags_tags',
            columnNames: ['tagsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('project_tags', 'projects_tags_tags');
        
        await queryRunner.dropColumn('projects_tags', 'tagsId');
    }

}
