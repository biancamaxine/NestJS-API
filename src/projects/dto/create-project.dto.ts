import { IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly owner: string;

    @IsString()
    readonly description: string;

    @IsString({ each: true })
    readonly tags: string[];
}
