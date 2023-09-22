import { Code, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Item } from "./Item";

@Entity('sku')
export class Sku {

    @PrimaryColumn()
    id: string

    @Column({ type: 'money'})
    valor: number
    
    @OneToOne(type => Item, sku => Sku)
    itens: Item
}