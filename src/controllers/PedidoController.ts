import { pedidoRepositorio } from "../repositories/pedidoRepositorio";
import { Pedido } from "../entities/Pedido";
import { AppDataSource } from "../data-source";
import { Item } from "../entities/Item";
import { Sku } from "../entities/Sku";
import { Request, Response } from "express";

export class PedidoController {
    
    public async create(ped: Pedido) {

        const pedido = ped;

        try {
            const newPedido = pedidoRepositorio.create(pedido)

            await pedidoRepositorio.save(newPedido)
        } catch (error) {
            console.error(error)
        }
    }

    async buscarPedido(req: Request, res: Response) {
        try {
            const qb = AppDataSource.createQueryBuilder();
        
            const subQuery = qb
                .subQuery()
                .select('sum(it.quantidade * sk.valor)', 'total_pedido')
                .from(Item, 'it')
                .innerJoin(Sku, 'sk', 'sk.id = it.sku_id')
                .where('it.pedido_id = p.id')
                .getQuery();
            
            const pedido = await qb
                .select('*')
                .addSelect(`(${subQuery})`, 'total_pedido')
                .from(Pedido, 'p')
                .innerJoin('p.itens', 'i')
                .innerJoin('p.cliente', 'c')
                .innerJoin('i.sku', 's')
                .getRawMany();
        
            return res.json(pedido);
        } catch(err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar pedido' });
        }
    }
}