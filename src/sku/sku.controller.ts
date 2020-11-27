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

    @Post('addsku')
    @UsePipes(new ValidationPipe())
    async addsku(@Body() body: SkuCreateDto) {
        return this.skuService.addSku(body)
    }
    @Put(':id/updatesku')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: SkuCreateDto
    ) {
        return this.skuService.updateSku(id, body);
    }
}
