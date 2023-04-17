import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CREATEPIVOTTABLEProjectsTags1681725430461
  implements MigrationInterface
{
  //
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: '__projects-tags__',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'projectsId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'tagsId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      '__projects-tags__',
      new TableForeignKey({
        name: '__key-projects__',
        columnNames: ['projectsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projects',
      }),
    );

    await queryRunner.createForeignKey(
      '__projects-tags__',
      new TableForeignKey({
        name: '__key-tags__',
        columnNames: ['tagsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('__projects-tags__', '__key-projects__');
    await queryRunner.dropForeignKey('__projects-tags__', '__key-tags__');

    await queryRunner.dropTable('__projects-tags__');
  }
}
