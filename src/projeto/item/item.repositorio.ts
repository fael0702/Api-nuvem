import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Item } from "../../entities/Item"
import skuRepositorio from "../sku/sku.repositorio"

class ItemRepositorio {

    private repositorio: Repository<Item>
    constructor() {
      this.repositorio = AppDataSource.getRepository(Item)
    }

    public async salvar(item: Item): Promise<Item> {

      if (item.sku) {
        await skuRepositorio.salvar(item.sku)
      }

      return this.repositorio.save(item)
    }
  
}

export default new ItemRepositorio()