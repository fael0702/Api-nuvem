import { Request, Response } from "express";
import PedidoService from "./pedido.service";

class PedidoController {

    public async buscarPedidoUuid(req: Request, res: Response) {

        try {

            const pedidos = await PedidoService.buscarPedidoUuid(req.params.uuid)

            return res.json(pedidos)
        } catch (error) {
            console.error(error)
        }
    }

    public async buscarPedidoCliente(req: Request, res: Response) {

        try {

            const clientes = await PedidoService.buscarPedidoCliente(+req.params.id_cliente)

            return res.json(clientes)
        } catch (error) {
            console.error(error)
        }
    }

    public async buscarPedidoSku(req: Request, res: Response) {

        try {

            const skus = await PedidoService.buscarPedidoSku(req.params.id_sku)

            return res.json(skus)
        } catch (error) {
            console.error(error)
        }
    }

}

export default new PedidoController()