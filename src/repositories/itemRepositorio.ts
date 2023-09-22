import { AppDataSource } from "../data-source";
import { Item } from "../entities/Item";

export const itemRepositorio = AppDataSource.getRepository(Item)
