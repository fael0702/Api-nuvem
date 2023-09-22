import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Item } from "./Item";

@Entity('pedido')
export class Pedido {

    @PrimaryColumn()
    id: string

    @Column({ type: 'timestamp' })
    created_at: Date

    @Column({ type: 'text'})
    tipo: string

    @ManyToOne(() => Cliente, cliente => cliente.pedidos)
    @JoinColumn({name: 'cliente_id'})
    cliente: Cliente

    @OneToMany(() => Item, (item) => item.pedido)
    itens: Item[]
}