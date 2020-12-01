import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { skuHis } from "./sku_his.entity";

@Entity()
// @Unique(['sku_code'])
export class skuData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // @Unique()
    sku_code: string

    @Column()
    sku_name: string

    @Column()
    owner_product: string

    @Column()
    quantity: number

    @OneToMany(() => skuHis,skuhis => skuhis.id_product)
    skuhis:skuHis[];
}