import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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

    @Get(':skucode/findone')
    // @UsePipes(new ValidationPipe())
    async findone(@Param('skucode') sku_code: string) {
        return this.skuService.findone(sku_code)
    }

    @Post('addsku')
    // @UsePipes(new ValidationPipe())
    async addsku(@Body() body: SkuCreateDto) {
        // console.log(body.quantity)
        return this.skuService.addSku(body)
    }
    
    @Put(':id/updatesku')
    async updateUser(
        @Param('id') id,
        @Body() body: SkuCreateDto
    ) {
        // console.log(sku_code)
        return this.skuService.updateSku(id, body);
    }

    @Get('getreletion')
    async getRelation() {
        return this.skuService.findreletion()
    }
}
