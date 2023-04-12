import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../entities/project.entity';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project)
        private readonly PROJECTS: Repository<Project>,

        @InjectRepository(Tag)
        private readonly TAGS: Repository<Tag>
    ) {}

    readAll() {
        return this.PROJECTS.find({
            relations: ['tags']
        });
    }

    async readOne(id: string) {
        const project = await this.PROJECTS.findOne(id, {
            relations: ['tags']
        });

        if (!project) throw new NotFoundException(`Project ID: ${id} not found!`);
        return project;
    }

    async create(createProjectDto: CreateProjectDto) {
        const tags = await Promise.all(
            createProjectDto.tags.map(name => this.preloadTagByName(name)),
        );
        
        const project = this.PROJECTS.create({
            ...createProjectDto,
            tags,
        });
        return this.PROJECTS.save(project);
    }

    async update(id: string, updateProjectDto: UpdateProjectDto) {
        const tags = updateProjectDto.tags && await Promise.all(
            updateProjectDto.tags.map(name => this.preloadTagByName(name))
        );
        
        const project = await this.PROJECTS.preload({
            id,
            ...updateProjectDto,
            tags
        });

        if (!project) throw new NotFoundException(`Project ID: ${id} not found!`);
        return this.PROJECTS.save(project);
    }

    async delete(id: string) {
        const project = await this.PROJECTS.findOne(id);

        if (!project) throw new NotFoundException(`Project ID: ${id} not found!`);
        return this.PROJECTS.remove(project);
    }

    private async preloadTagByName(name: string) {
        const tag = await this.TAGS.findOne({ name });

        if (!tag) return this.TAGS.create({ name });
        return tag;
    }
}
