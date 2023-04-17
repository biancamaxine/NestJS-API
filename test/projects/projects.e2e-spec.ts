import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { CreateProjectDto } from '../../src/projects/dtos/create-project.dto';
import { ProjectsModule } from '../../src/projects/projects.module';

describe('Projects: /projects', () => {
  let app: INestApplication;

  const project: CreateProjectDto = {
    title: 'API: NestJS with TypeORM',
    owner: 'Bianca Maxine',
    description: 'Create a api restful with NestJS',
    tags: ['nestjs', 'typeorm', 'nodejs', 'typescript']
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProjectsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'docker',
          database: 'postgres_test',
          autoLoadEntities: true,
          synchronize: true,
        })
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create POST /projects', () => {
    return request(app.getHttpServer())
      .post('/projects')
      .send(project)
      .expect(HttpStatus.CREATED)
      .then(({body}) => {
        
        const expectedProject = jasmine.objectContaining({
          ...project,
          tags: jasmine.arrayContaining(
            project.tags.map(name => jasmine.objectContaining({name}))
          )
        });

        expect(body).toEqual(expectedProject);
      });
  });
});
