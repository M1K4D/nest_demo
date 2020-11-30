import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class skuHis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sku_code: string

    @Column()
    quantity: number
}