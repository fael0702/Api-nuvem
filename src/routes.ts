import { Router } from "express";
import pedidoController from "./projeto/pedido/pedido.controller";

const routes = Router()


routes.get('/pedido/uuid/:uuid', pedidoController.buscarPedidoUuid)
routes.get('/pedido/cliente/:id_cliente', pedidoController.buscarPedidoCliente)
routes.get('/pedido/sku/:id_sku', pedidoController.buscarPedidoSku)


export default routes