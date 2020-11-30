import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { skuData } from "./skudata.entity";

@Entity()
export class skuHis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number

    // @Column()
    @ManyToOne(() => skuData,skudata => skudata.id)
    id_product: skuData
}