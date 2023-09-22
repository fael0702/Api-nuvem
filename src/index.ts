import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { PedidoController } from "./controllers/PedidoController";
import { ClienteController } from "./controllers/ClienteController";
import { ItemController } from "./controllers/ItemController";
import { SkuController } from "./controllers/SkuController";
import { Pedido } from "./entities/Pedido";
import { Cliente } from "./entities/Cliente";
import { Item } from "./entities/Item";
import { Sku } from "./entities/Sku";

// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');
const projectId = "serjava-demo"
// Creates a client; cache this for further use
const pubSubClient = new PubSub({
  projectId: 'serjava-demo',
  keyFilename: 'C:/Users/Rafael/Documents/nuvem/google-credentials.json'
  });
const subscriptionNameOrId = 'meta-games-sub';

const timeout = 60;

function listenForMessages(subscriptionNameOrId: any, timeout: any) {
  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionNameOrId);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = async (message: any) => {
    // console.log(`Received message ${message.id}:`);
    // console.log(`\tData: ${message.data}`);
    // console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;
    const pedido = new PedidoController();
    const cliente = new ClienteController();
    const item = new ItemController();
    const sku = new SkuController();
    
    const receivedMessage = JSON.parse(message.data.toString());
    console.log(receivedMessage)

    let clienteAjuste = new Cliente()
    clienteAjuste.id = receivedMessage.customer.id
    clienteAjuste.nome = receivedMessage.customer.name

    let pedidoAjuste = new Pedido()
    pedidoAjuste.id = receivedMessage.uuid
    pedidoAjuste.created_at = receivedMessage.created_at
    pedidoAjuste.tipo = receivedMessage.type


    await cliente.create(clienteAjuste)
    await pedido.create(pedidoAjuste)
    
    for (const i of receivedMessage.items) {
        let itemAjuste = new Item()
        itemAjuste.id = i.id 
        itemAjuste.categoria = i.category.id
        itemAjuste.sub_categoria = i.category.sub_category.id
        itemAjuste.quantidade = i.quantity

        let skuAjuste = new Sku()
        skuAjuste.id = i.sku.id
        skuAjuste.valor = i.sku.value

        await item.create(itemAjuste)
        await sku.create(skuAjuste)
    }

    let total = parseFloat(receivedMessage.value.total)
    let qtde = parseFloat(receivedMessage.quantity)
    
    console.log("SAÍDA:", total * qtde)
    // "Ack" (acknowledge receipt of) the message

    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);

  // Wait a while for the subscription to run. (Part of the sample only.)
  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

listenForMessages(subscriptionNameOrId, timeout);

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json())

    app.use(routes)

    return app.listen(process.env.PORT)

})