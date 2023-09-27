import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./Pedido";

@Entity('cliente')
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text'})
    name: string

    @OneToMany(type => Pedido, pedido => pedido.customer)
    pedidos: Pedido[]
}