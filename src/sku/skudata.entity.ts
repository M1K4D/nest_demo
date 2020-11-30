import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
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
}