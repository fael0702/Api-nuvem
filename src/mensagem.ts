import pedidoRepositorio from "./projeto/pedido/pedido.repositorio";

const { PubSub } = require('@google-cloud/pubsub');

const pubSubClient = new PubSub({
  projectId: process.env.PROJETOID,
  keyFilename: process.env.CAMINHO
});
const subscriptionNameOrId = process.env.SUBSCRIPTIONNAME;

const timeout = 60;

function listenForMessages(subscriptionNameOrId: any, timeout: any) {
  const subscription = pubSubClient.subscription(subscriptionNameOrId);

  let messageCount = 0;
  const messageHandler = async (message: any) => {
    // console.log(`Received message ${message.id}:`);
    // console.log(`\tData: ${message.data}`);
    // console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    const receivedMessage = JSON.parse(message.data.toString());
    console.log(receivedMessage)

    await pedidoRepositorio.salvar(receivedMessage)

    message.ack();
  };

  subscription.on('message', messageHandler);

  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

listenForMessages(subscriptionNameOrId, timeout);