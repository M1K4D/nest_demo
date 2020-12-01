import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { SkuCreateDto } from './dto/sku-create.dto';
import { SkuRepository } from './sku.repository';
import { skuData } from './entity/skudata.entity';
import { skuHis } from './entity/sku_his.entity';

// const SKU_DATA = [
//     { id: 1, sku_code: 'xz000', sku_name: 'testp', owner_product: 'kiki', quantity: 0 },
// ]

@Injectable()
export class SkuService {
    constructor(private readonly sku: SkuRepository) { }
    async getSku() {
        try {
            const find = this.sku.find()
            const data = [...await find]
            return {
                success: true,
                data: data
            }
        } catch (error) {
            console.log('error message ::', error.message);
            throw new NotFoundException({
                success: false,
                message: error.message,
            });
        }
    }

    async addSku(body: SkuCreateDto) {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let err = '';

        const { sku_code, sku_name, owner_product, quantity } = body;
        const find = await this.sku.findOne({ where: { sku_code: sku_code } })
        if (find) {
            return {
                success: false,
                message: `sku code ${sku_code} is duplicate`
            }
        }

        const skudata = new skuData();
        const skuhis = new skuHis();

        try {
            skudata.sku_code = sku_code;
            skudata.sku_name = sku_name;
            skudata.owner_product = owner_product;
            skudata.quantity = quantity;
            await queryRunner.manager.save(skudata);

            skuhis.id_product = skudata;
            skuhis.quantity = quantity;
            await queryRunner.manager.save(skuhis);
            await queryRunner.commitTransaction();
        } catch (error) {
            console.log('error message ::', error.message);
            await queryRunner.rollbackTransaction();
            err = error.message;
        } finally {
            await queryRunner.release();
            if (err)
                throw new BadRequestException({
                    success: false,
                    message: err,
                });
            return {
                success: true,
                message: 'add success',
            }
        }
    }

    async findone(id: number) {
        const find = await this.sku.findOne({ where: { id: id } })

        try {
            if (!find) throw new Error(`${id} not found`)
            return {
                success: true,
                data: find
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async updateSku(id: number, body: any) {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let err = '';
        try {
            const { sku_code, sku_name, owner_product, quantity } = body;
            const found = await this.sku.findOne({ where: { id: id } })
            if (!found) throw new Error('not found sku code.');
            if (found.quantity + quantity < 0) throw new Error(`quantity not enough`)
            if (quantity) {
                await getConnection()
                    .createQueryBuilder()
                    .update(skuData)
                    .set({ quantity: found.quantity + quantity })
                    .where('id = :id', { id: found.id })
                    .execute();
            }
            if (sku_code) {
                const found = await this.sku.findOne({ where: { sku_code: sku_code } })
                if (found && found.id != id) throw new Error(`sku code ${sku_code} is duplicate`)
                await getConnection()
                    .createQueryBuilder()
                    .update(skuData)
                    .set({ sku_code: sku_code })
                    .where('id = :id', { id: found.id })
                    .execute();
            }
            if (sku_name) {
                await getConnection()
                    .createQueryBuilder()
                    .update(skuData)
                    .set({ sku_name: sku_name })
                    .where('id = :id', { id: found.id })
                    .execute();
            }
            if (owner_product) {
                await getConnection()
                    .createQueryBuilder()
                    .update(skuData)
                    .set({ owner_product: owner_product })
                    .where('id = :id', { id: found.id })
                    .execute();
            }
            const skuhis = new skuHis();
            skuhis.id_product = found
            skuhis.quantity = quantity
            await queryRunner.manager.save(skuhis);
            try {
                await queryRunner.commitTransaction();
            } catch (error) {
                console.log('error message ::', error.message);
                await queryRunner.rollbackTransaction();
                err = error.message;
            } finally {
                await queryRunner.release();
                if (err)
                    console.log(err)
                return {
                    success: true,
                    message: 'updated success',
                }
            }

        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: error.message,
            })
        }
    }

    async findALL() {
        try {
            const skus = await getConnection()
                .getRepository(skuData)
                .createQueryBuilder('skudata')
                .leftJoinAndSelect('skudata.skuhis', 'skuhis')
                .getMany()

            if (!skus) throw new Error(`not found`)
            return {
                success: true,
                data: skus
            }
        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message,
            });
        }
    }

}
