import { Pedido } from "../../entities/Pedido"
import pedidoRepositorio from "./pedido.repositorio"

class PedidoService {

    public async buscarPedidoUuid(uuid: string) {
        try {
            const pedidos: Pedido[] = await pedidoRepositorio.buscarPedidoUuid(uuid)

            for (const pedido of pedidos) {
                pedido['total_pedido'] = pedido.itens.reduce((acc, item) => acc + (item.sku.valor * item.quantidade), 0)
            }

            return pedidos
        } catch (error) {
            console.error(error)
        }
    }

    public async buscarPedidoCliente(uuid: number) {
        try {
            const pedidos: Pedido[] = await pedidoRepositorio.buscarPedidoCliente(uuid)

            for (const pedido of pedidos) {
                pedido['total_pedido'] = pedido.itens.reduce((acc, item) => acc + (item.sku.valor * item.quantidade), 0)
            }

            return pedidos
        } catch (error) {
            console.error(error)
        }
    }

    public async buscarPedidoSku(uuid: string) {
        try {
            const pedidos: Pedido[] = await pedidoRepositorio.buscarPedidoSku(uuid)

            for (const pedido of pedidos) {
                pedido['total_pedido'] = pedido.itens.reduce((acc, item) => acc + (item.sku.valor * item.quantidade), 0)
            }

            return pedidos
        } catch (error) {
            console.error(error)
        }
    }
}

export default new PedidoService()