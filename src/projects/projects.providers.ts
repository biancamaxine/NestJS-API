import { DataSource } from 'typeorm';
import { Project } from './entities/project.entity';
import { Tag } from './entities/tag.entity';

export const projectsProviders = [
  {
    provide: 'PROJECTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Project),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TAGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tag),
    inject: ['DATA_SOURCE'],
  },
];
