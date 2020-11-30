import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class skuData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sku_code: string

    @Column()
    sku_name: string

    @Column()
    owner_product: string

    @Column()
    quantity: number
}