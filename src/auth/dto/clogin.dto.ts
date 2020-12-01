import { IsString, IsNotEmpty } from "class-validator";

export class cloginDto{
    @IsString()
    @IsNotEmpty()
    username: string;


    @IsString()
    @IsNotEmpty()
    password: string;
}