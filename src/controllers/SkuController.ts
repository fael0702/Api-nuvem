import { Sku } from "../entities/Sku";
import { skuRepositorio } from "../repositories/skuRepositorio";

export class SkuController {
    public async create(sku: Sku) {

        try {
            const newPedido = skuRepositorio.create(sku)

            await skuRepositorio.save(newPedido)
        } catch (error) {
            console.error(error)
        }
    }
}