import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  readAll() {
    return this.service.read();
  }

  @Get(':id')
  readOne(
    @Param('id') id?: string,
    // @Query()
    // query?: {
    //   title?: string;
    //   owner?: string;
    // },
  ) {
    return this.service.read(id);
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.service.create(createProjectDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.service.update(id, updateProjectDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
