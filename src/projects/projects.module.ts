import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './entities/project.entity';
import { Tag } from './entities/tag.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './service/projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Tag])
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
