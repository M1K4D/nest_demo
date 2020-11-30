import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SkuCreateDto } from './dto/sku-create.dto';

const SKU_DATA = [
    { id: 1, sku_code: 'xz000', sku_name: 'testp', owner_product: 'kiki', quantity: 0 },
]

@Injectable()
export class SkuService {
    // async getSku() {
    //     try {
    //         if (!SKU_DATA.length) throw new Error('no data')
    //         return {
    //             sucess: true,
    //             data: SKU_DATA
    //         }
    //     } catch (error) {
    //         throw new NotFoundException({
    //             sucess: false,
    //             message: error.message
    //         })
    //     }
    // }

    async addSku(body: SkuCreateDto) {
        try {
            
        } catch (error) {
            
        }
    }

    // async updateSku(id: number, body: SkuCreateDto) {
    //     try {
    //         const { sku_code, sku_name, owner_product, quantity } = body;
    //         const find = SKU_DATA.find(e => e.id == id)
    //         // console.log(quantity)

    //         if (!find) throw new Error('not found.')
    //         if (find.quantity + quantity < 0) throw new Error('Not enough in stook')
    //         find.quantity = find.quantity + quantity;
    //         return {
    //             success: true,
    //             message: 'updated success.',
    //         };
    //     } catch (error) {
    //         throw new BadRequestException({
    //             success: false,
    //             message: error.message,
    //         })
    //     }
    // }
}
