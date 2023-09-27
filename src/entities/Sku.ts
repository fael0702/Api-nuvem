import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";

@Entity('sku')
export class Sku {

    @PrimaryGeneratedColumn()
    codigo: number

    @Column()
    id: string

    @Column('decimal', { precision: 10, scale: 2 })
    value: number

    @OneToMany(type => Item, item => item.sku)
    items: Item
}