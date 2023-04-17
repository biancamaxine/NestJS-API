import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Project } from './entities/project.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ProjectsService {
  @Inject('PROJECTS_REPOSITORY')
  private readonly PROJECTS: Repository<Project>;

  @Inject('TAGS_REPOSITORY')
  private readonly TAGS: Repository<Tag>;

  private async findAll(query?: { title?: string; owner?: string }) {
    return this.PROJECTS.find({
      relations: ['tags'],
    }).then((projects) => {
      if (query) {
        if (query.title) {
          projects = projects.filter((project) =>
            project.title.includes(query.title),
          );

          if (query.owner)
            projects = projects.filter((project) =>
              project.owner.includes(query.owner),
            );

          return projects;
          //
        } else if (query.owner) {
          projects = projects.filter((project) =>
            project.owner.includes(query.owner),
          );
          return projects;
        }
      }
      return projects;
    });
  }

  private async findOne(id: string) {
    const project = await this.PROJECTS.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!project) throw new NotFoundException(`Project ID: ${id} not found!`);
    return project;
  }

  async read(
    id?: any,
    query?: {
      title?: string;
      owner?: string;
    },
  ) {
    if (id) return this.findOne(id);
    return this.findAll(query);
  }

  async create(createProjectDto: CreateProjectDto) {
    const tags = await Promise.all(
      createProjectDto.tags.map((name) => this.preloadTagByName(name)),
    );

    const project = this.PROJECTS.create({
      ...createProjectDto,
      tags,
    });
    return this.PROJECTS.save(project);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const tags =
      updateProjectDto.tags &&
      (await Promise.all(
        updateProjectDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    const project = await this.PROJECTS.preload({
      id,
      ...updateProjectDto,
      tags,
    });

    if (!project) throw new NotFoundException(`Project ID: ${id} not found!`);
    return this.PROJECTS.save(project);
  }

  async delete(id: string) {
    const project = await this.PROJECTS.findOne({
      where: { id },
    });

    if (!project) throw new NotFoundException(`Project ID: ${id} not found!`);
    return this.PROJECTS.remove(project);
  }

  private async preloadTagByName(name: string) {
    const tag = await this.TAGS.findOne({
      where: { name },
    });

    if (!tag) return this.TAGS.create({ name });
    return tag;
  }
}
