import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './service/projects.service';

@Controller('projects')
export class ProjectsController {

    constructor(private readonly service: ProjectsService) {}

    @Get()
    readAll() {
        return this.service.readAll();
    }

    @Get(':id')
    readOne(@Param('id') id: string) {
        return this.service.readOne(id);
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
