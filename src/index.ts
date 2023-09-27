import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import pedidoRepositorio from "./projeto/pedido/pedido.repositorio";
import { Pedido } from "./entities/Pedido";
import { Item } from "./entities/Item";

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

const { PubSub } = require('@google-cloud/pubsub');

const pubSubClient = new PubSub({
  projectId: process.env.PROJETOID,
  keyFilename: process.env.CAMINHO
});
const subscriptionNameOrId = process.env.SUBSCRIPTIONNAME;

const timeout = 60;

async function listenForMessages(subscriptionNameOrId: any, timeout: any) {
  const subscription = pubSubClient.subscription(subscriptionNameOrId);

  let messageCount = 0;
  const messageHandler = async (message: any) => {
    // console.log(`Received message ${message.id}:`);
    // console.log(`\tData: ${message.data}`);
    // console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    const receivedMessage = JSON.parse(message.data.toString());
    console.log(receivedMessage)

    let pedido: Pedido = receivedMessage;
    const itens = Object.assign([], receivedMessage.items)

    pedido.items = [];
    let item = new Item();

    for (const rm of itens) {
      item.id = rm.id
      item.quantity = rm.quantity
      item.categoria = rm.category.id
      item.sub_categoria = rm.category.sub_category.id
      item.sku = rm.sku
      pedido.items.push(item)
    }

    await pedidoRepositorio.salvar(pedido)

    message.ack();
  };

  subscription.on('message', messageHandler);

  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

listenForMessages(subscriptionNameOrId, timeout);