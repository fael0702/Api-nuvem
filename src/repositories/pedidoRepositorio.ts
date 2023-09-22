import { AppDataSource } from "../data-source";
import { Pedido } from "../entities/Pedido";

export const pedidoRepositorio = AppDataSource.getRepository(Pedido)

