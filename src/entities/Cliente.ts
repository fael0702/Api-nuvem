import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./Pedido";

@Entity('cliente')
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text'})
    nome: string

    @OneToMany(type => Pedido, pedido => pedido.cliente)
    pedidos: Pedido[]
}