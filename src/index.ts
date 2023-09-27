import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

// Conecta ao banco
AppDataSource.initialize().then(async () => {

  console.log("Conectado ao banco de dados");
  const app = express();
  app.use(express.json())
  app.use(routes)

  return app.listen(process.env.PORT)

}).catch(error => {
  console.log("Erro ao conectar no banco de dados: ");
  console.error(error);
})