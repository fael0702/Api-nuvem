import { clienteRepositorio } from "../repositories/clienteRepositorio";
import { Cliente } from "../entities/Cliente";

export class ClienteController {
    public async create(client: Cliente) {

        const cliente = client;

        try {
            const newPedido = clienteRepositorio.create(cliente)

            await clienteRepositorio.save(newPedido)
        } catch (error) {
            console.error(error)
        }
    }
    
}