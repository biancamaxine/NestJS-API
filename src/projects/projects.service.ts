import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

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

  private async readAll(query?: { title?: string; owner?: string }) {
    return this.PROJECTS.find({
      relations: ['tags'],
    }).then((projects) => {
      if (query) {
        if (query.title) {
          projects = projects.filter((project) =>
            project.title
              .toLocaleLowerCase()
              .includes(query.title.toLocaleLowerCase()),
          );

          if (query.owner)
            projects = projects.filter((project) =>
              project.owner
                .toLocaleLowerCase()
                .includes(query.owner.toLocaleLowerCase()),
            );

          return projects;
          //
        } else if (query.owner) {
          projects = projects.filter((project) =>
            project.owner
              .toLocaleLowerCase()
              .includes(query.owner.toLocaleLowerCase()),
          );
          return projects;
        }
      }
      return projects;
    });
  }

  private async readOne(id: string) {
    if (!validate(id))
      throw new HttpException(
        `Propriety id is not valid!`,
        HttpStatus.BAD_REQUEST,
      );

    const project = await this.PROJECTS.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!project) throw new NotFoundException(`Project id: #${id} not found!`);
    return project;
  }

  async read(
    id?: any,
    query?: {
      title?: string;
      owner?: string;
    },
  ) {
    if (id) return this.readOne(id);
    return this.readAll(query);
  }

  async create(createProjectDto: CreateProjectDto) {
    const tags = await Promise.all(
      createProjectDto.tags.map((name) => this.preloadTagByName(name)),
    );

    const project = this.PROJECTS.create({
      ...createProjectDto,
      tags,
    });
    try {
      await this.PROJECTS.save(project);
      return { message: 'Project created successfully!' };
    } catch {
      return new BadGatewayException('Server Failure! Please try again later!');
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    if (!validate(id))
      throw new HttpException(
        `Propriety id is not valid!`,
        HttpStatus.BAD_REQUEST,
      );

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

    if (!project) throw new NotFoundException(`Project id: #${id} not found!`);
    try {
      this.PROJECTS.save(project);
      return { message: 'Project updated successfully!' };
    } catch {
      return new BadGatewayException('Server Failure! Please try again later!');
    }
  }

  async delete(id: string) {
    if (!validate(id))
      throw new HttpException(
        `Propriety id is not valid!`,
        HttpStatus.BAD_REQUEST,
      );

    const project = await this.PROJECTS.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!project) throw new NotFoundException(`Project id: #${id} not found!`);
    try {
      this.PROJECTS.remove(project);
      return { message: 'Project deleted successfuly!' };
    } catch {
      return new BadGatewayException('Server Failure! Please try again later!');
    }
  }

  private async preloadTagByName(name: string) {
    const tag = await this.TAGS.findOne({
      where: { name },
    });

    if (!tag) return this.TAGS.create({ name });
    return tag;
  }
}
