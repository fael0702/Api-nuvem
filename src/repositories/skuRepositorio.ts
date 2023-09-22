import { AppDataSource } from "../data-source";
import { Sku } from "../entities/Sku";

export const skuRepositorio = AppDataSource.getRepository(Sku)
