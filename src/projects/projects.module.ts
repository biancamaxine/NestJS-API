import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { ProjectsController } from './projects.controller';
import { projectsProviders } from './projects.providers';
import { ProjectsService } from './projects.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectsController],
  providers: [...projectsProviders, ProjectsService],
})
export class ProjectsModule {}
