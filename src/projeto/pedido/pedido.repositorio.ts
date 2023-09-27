import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Pedido } from "../../entities/Pedido"
import clienteRepositorio from "../cliente/cliente.repositorio"
import ItemRepositorio from "../item/item.repositorio"

class PedidoRepositorio {

    private repositorio: Repository<Pedido>
    constructor() {
        this.repositorio = AppDataSource.getRepository(Pedido)
    }

    public async buscarPedidoUuid(uuid: string) {
        try {
            const qb = this.repositorio.createQueryBuilder('p')
                .innerJoinAndSelect('p.cliente', 'c')
                .innerJoinAndSelect('p.itens', 'i')
                .innerJoinAndSelect('i.sku', 's')
                .where('p.uuid = :uuid')
                .setParameters({ uuid: uuid })

            return await qb.getMany()
        } catch (error) {
            console.error(error);
            throw new Error(error)
        }
    }

    public async buscarPedidoCliente(cliente: number) {
        try {
            const qb = this.repositorio.createQueryBuilder('p')
                .innerJoinAndSelect('p.cliente', 'c')
                .innerJoinAndSelect('p.itens', 'i')
                .innerJoinAndSelect('i.sku', 's')
                .where('c.id = :id')
                .setParameters({ id: cliente })

            return await qb.getMany()
        } catch (error) {
            console.error(error);
            throw new Error(error)
        }
    }

    public async buscarPedidoSku(id: string) {
        try {
            const qb = this.repositorio.createQueryBuilder('p')
                .innerJoinAndSelect('p.cliente', 'c')
                .innerJoinAndSelect('p.itens', 'i')
                .innerJoinAndSelect('i.sku', 's')
                .where('s.id = :id')
                .setParameters({ id: id })

            return await qb.getMany()
        } catch (error) {
            console.error(error);
            throw new Error(error)
        }
    }

    public async salvar(pedido: Pedido) {
        try {
            if (pedido.customer) {
              pedido.customer = await clienteRepositorio.salvar(pedido.customer)
            }
      
            if (pedido.items.length) {

              const itens = Object.assign([], pedido.items)
              pedido.items = []
              
              for (const item of itens) {
                const itemSalvo = await ItemRepositorio.salvar(item)
                pedido.items.push(itemSalvo)
              }
            }
      
            this.repositorio.save(pedido)
          } catch (error) {
            console.error(error)
            throw new Error(error)
          }
    }

}

export default new PedidoRepositorio()