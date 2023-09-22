import { Item } from "../entities/Item";
import { itemRepositorio } from "../repositories/itemRepositorio";

export class ItemController {
    public async create(item: Item) {

        const itens = item;

        try {
            const newPedido = itemRepositorio.create(itens)

            await itemRepositorio.save(newPedido)
        } catch (error) {
            console.error(error)
        }
    }
}