import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sku } from "./Sku";
import { Pedido } from "./Pedido";

@Entity('item')
export class Item {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text'})
    categoria: string

    @Column({ type: 'text'})
    sub_categoria: string

    @Column({ type: 'integer'})
    quantity: number 

    @ManyToOne(type => Sku, sku => sku.items)
    @JoinColumn({name: 'sku_id'})
    sku: Sku

    @ManyToOne(type => Pedido, pedido => pedido.items)
    @JoinColumn({name: 'pedido_id'})
    pedido: Pedido
}