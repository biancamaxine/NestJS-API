import { CREATETABLEProjects1681720185421 } from 'src/migrations/1681720185421-CREATE_TABLE_projects';
import { CREATETABLETags1681721012945 } from 'src/migrations/1681721012945-CREATE_TABLE_tags';
import { CREATEPIVOTTABLEProjectsTags1681725430461 } from 'src/migrations/1681725430461-CREATE_PIVOT_TABLE_projects-tags';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'postgres',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [
    CREATETABLEProjects1681720185421,
    CREATETABLETags1681721012945,
    CREATEPIVOTTABLEProjectsTags1681725430461,
  ],
});
