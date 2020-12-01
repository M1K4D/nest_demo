import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SkuCreateDto {
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    sku_code: string;

    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    sku_name: string;

    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    owner_product: string;

    @IsNumber()
    quantity: number;
}