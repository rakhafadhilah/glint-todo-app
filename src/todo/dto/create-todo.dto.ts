import { IsString, IsDefined, IsBoolean, Min, IsEmpty } from 'class-validator';
export class CreateTodoDto{

    @IsString()
    @Min(15)
    @IsDefined()
    title: string;

    @IsString()
    desc?: string;
    // desc: string | undefined;

    @IsString()
    image?: string;

    @IsBoolean()
    @IsEmpty()
    status?: boolean;
}