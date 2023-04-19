import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let id: string;
  let date: Date;

  beforeEach(async () => {
    service = new ProjectsService();
    id = '7df079c6-b25b-4693-8314-cf827e467733';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should creates a project', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputProject = {
      id,
      title: 'Test',
      owner: 'bianca maxine',
      description: 'Test description',
      tags: expectOutputTags,
    };

    const mockProjectsRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputProject)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputProject)),
    };
    const mockTagsRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };

    //@ts-expect-error defined part of methods
    service['PROJECTS'] = mockProjectsRepository;
    //@ts-expect-error defined part of methods
    service['TAGS'] = mockTagsRepository;

    const CreateProjectDto: CreateProjectDto = {
      title: 'Test',
      owner: 'bianca maxine',
      description: 'Test description',
      tags: ['nestjs'],
    };
    const newProject = await service.create(CreateProjectDto);

    expect(mockProjectsRepository.save).toHaveBeenCalled();
    expect(expectOutputProject).toStrictEqual(newProject);
  });

  it('should read projects', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputProjects = [
      {
        id,
        title: 'Test',
        owner: 'bianca maxine',
        description: 'Test description',
        tags: expectOutputTags,
      },
    ];

    const mockProjectsRepository = {
      read: jest.fn().mockReturnValue(Promise.resolve(expectOutputProjects)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputProjects)),
    };

    //@ts-expect-error defined part of methods
    service['PROJECTS'] = mockProjectsRepository;

    const projects = await service.read();

    expect(mockProjectsRepository.find).toHaveBeenCalled();
    expect(expectOutputProjects).toStrictEqual(projects);
  });

  it('should read a project', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputProject = {
      id,
      title: 'Test',
      owner: 'bianca maxine',
      description: 'Test description',
      tags: expectOutputTags,
    };

    const mockProjectsRepository = {
      read: jest.fn().mockReturnValue(Promise.resolve(expectOutputProject)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputProject)),
    };

    //@ts-expect-error defined part of methods
    service['PROJECTS'] = mockProjectsRepository;

    const project = await service.read(id);

    expect(mockProjectsRepository.findOne).toHaveBeenCalled();
    expect(expectOutputProject).toStrictEqual(project);
  });

  it('should updates a project', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputProject = {
      id,
      title: 'Test',
      owner: 'bianca maxine',
      description: 'Test description',
      tags: expectOutputTags,
    };

    const mockProjectsRepository = {
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputProject)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputProject)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputProject)),
    };
    const mockTagsRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };

    //@ts-expect-error defined part of methods
    service['PROJECTS'] = mockProjectsRepository;
    //@ts-expect-error defined part of methods
    service['TAGS'] = mockTagsRepository;

    const UpdateProjectDto: UpdateProjectDto = {
      title: 'Test',
      owner: 'bianca maxine',
      description: 'Test description',
      tags: ['nestjs'],
    };
    const updatedProject = await service.update(id, UpdateProjectDto);

    expect(mockProjectsRepository.save).toHaveBeenCalled();
    expect(expectOutputProject).toStrictEqual(updatedProject);
  });

  it('should deletes a project', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputProject = {
      id,
      title: 'Test',
      owner: 'bianca maxine',
      description: 'Test description',
      tags: expectOutputTags,
    };

    const mockProjectsRepository = {
      delete: jest.fn().mockReturnValue(Promise.resolve(expectOutputProject)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputProject)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputProject)),
    };

    //@ts-expect-error defined part of methods
    service['PROJECTS'] = mockProjectsRepository;

    const removedProject = await service.delete(id);

    expect(mockProjectsRepository.remove).toHaveBeenCalled();
    expect(mockProjectsRepository.findOne).toHaveBeenCalled();
    expect(expectOutputProject).toStrictEqual(removedProject);
  });
});
