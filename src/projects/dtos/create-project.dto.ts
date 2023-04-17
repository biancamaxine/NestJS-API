import { IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly owner: string;

  @IsString()
  readonly description: string;

  @IsString({ each: true })
  readonly tags: string[];
}
