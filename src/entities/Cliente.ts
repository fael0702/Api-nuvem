import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Pedido } from "./Pedido";

@Entity('cliente')
export class Cliente {

    @PrimaryColumn()
    id: number

    @Column({ type: 'text'})
    nome: string

    @OneToMany(() => Pedido, (pedido) => pedido.cliente)
    pedidos: Pedido[]
}