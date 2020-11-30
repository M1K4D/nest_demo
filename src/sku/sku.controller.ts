import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { SkuCreateDto } from './dto/sku-create.dto';
import { SkuService } from './sku.service';

@Controller('sku')
export class SkuController {
    constructor(private skuService: SkuService) { }

    @Get('getsku')
    async getsku() {
        return this.skuService.getSku();
    }

    @Get(':skucode/findone')
    @UsePipes(new ValidationPipe())
    async findone(@Param('skucode') sku_code: string) {
        return this.skuService.findone(sku_code)
    }

    @Post('addsku')
    @UsePipes(new ValidationPipe())
    async addsku(@Body() body: SkuCreateDto) {
        // console.log(body.quantity)
        return this.skuService.addSku(body)
    }
    @Put(':skucode/updatesku')
    // @UsePipes(new ValidationPipe())
    async updateUser(
        @Param('skucode') sku_code,
        @Body() body: SkuCreateDto
    ) {
        console.log(sku_code)
        return this.skuService.updateSku(sku_code, body);
    }
}
