import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Sku } from "../../entities/Sku"

class SkuRepositorio {
    
    private repositorio: Repository<Sku>
    constructor() {
      this.repositorio = AppDataSource.getRepository(Sku)
    }

    public async salvar(sku: Sku): Promise<Sku> {

      return await this.repositorio.save(sku);
    }
  
}

export default new SkuRepositorio()