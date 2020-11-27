import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SkuCreateDto {
    @IsString()
    @IsNotEmpty()
    sku_code: string;

    @IsString()
    @IsNotEmpty()
    sku_name: string;

    @IsString()
    @IsNotEmpty()
    owner_product:string;

    @IsNumber()
    quantity:number;
}