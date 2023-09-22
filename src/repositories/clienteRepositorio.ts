import { AppDataSource } from "../data-source";
import { Cliente } from "../entities/Cliente";

export const clienteRepositorio = AppDataSource.getRepository(Cliente)

