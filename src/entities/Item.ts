import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Sku } from "./Sku";
import { Pedido } from "./Pedido";

@Entity('item')
export class Item {
    
    @PrimaryColumn()
    id: number

    @Column({ type: 'text'})
    categoria: string

    @Column({ type: 'text'})
    sub_categoria: string

    @Column({ type: 'integer'})
    quantidade: number 

    @OneToOne(type => Sku, itens => Item)
    @JoinColumn({name: 'sku_id'})
    sku: Sku

    @ManyToOne(() => Pedido, pedido => pedido.itens)
    @JoinColumn({name: 'pedido_id'})
    pedido: Pedido
}