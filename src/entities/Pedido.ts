import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Item } from "./Item";

@Entity('pedido')
export class Pedido {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    uuid: string

    @Column({ type: 'timestamp' })
    created_at: Date

    @Column({ type: 'text'})
    tipo: string

    @ManyToOne(type => Cliente, cliente => cliente.pedidos)
    @JoinColumn({name: 'cliente_id'})
    cliente: Cliente

    @OneToMany(type => Item, item => item.pedido)
    itens: Item[]
}