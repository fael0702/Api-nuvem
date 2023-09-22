import { Router } from "express";
import { PedidoController } from "./controllers/PedidoController";
import { ClienteController } from "./controllers/ClienteController";

const routes = Router()

routes.post('/pedido', new PedidoController().create)
routes.get('/buscar-pedido', new PedidoController().buscarPedido)
// routes.post('/cliente', new ClienteController().create)

export default routes