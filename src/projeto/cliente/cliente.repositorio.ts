import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Cliente } from "../../entities/Cliente"

class ClienteRepositorio {
    
    private repositorio: Repository<Cliente>
    constructor() {
      this.repositorio = AppDataSource.getRepository(Cliente)
    }
  
    public async salvar(cliente: Cliente): Promise<Cliente> {
      
      try {
        return this.repositorio.save(cliente)
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    }
}

export default new ClienteRepositorio()