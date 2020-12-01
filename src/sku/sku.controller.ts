import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { SkuCreateDto } from './dto/sku-create.dto';
import { SkuService } from './sku.service';

@Controller('sku')
@UsePipes(new ValidationPipe())
export class SkuController {
    constructor(private skuService: SkuService) { }

    @Get('getsku')
    async getsku() {
        return this.skuService.getSku();
    }

    @Get(':id/findone')
    async findone(@Param('id',ParseIntPipe) sku_code: number) {
        return this.skuService.findone(sku_code)
    }

    @Post('addsku')
    async addsku(@Body() body: SkuCreateDto) {
        return this.skuService.addSku(body)
    }
    
    @Patch(':id/updatesku')
    async updateUser(
        @Param('id') id,
        @Body() body: SkuCreateDto
    ) {
        // console.log(sku_code)
        return this.skuService.updateSku(id, body);
    }

    @Get('getall')
    async getALL() {
        return this.skuService.findALL()
    }
}
