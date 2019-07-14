const amqp = require('amqplib');

module.exports = () => {
  let connection;
  const start = async ({ logger, config }) => {
    try {
      logger.info(`Bus connection on: ${config.url}`);
      connection = await amqp.connect(config.url);
      const channel = await connection.createChannel();

      const publish = queue => async message => {
        await channel.assertQueue(queue);
        return channel.sendToQueue(queue, Buffer.from(message));
      };

      const subscribe = async (queue, cb) => {
        await channel.assertQueue(queue);
        channel.consume(queue, msg => {
          if (msg !== null) {
            return cb(null, msg.content.toString());
          }
          const error = new Error(`Error receiving message: ${msg}`);
          return cb(error);
        }, { noAck: true });
      };

      // const testQueue = publish('test-queue');
      // await testQueue('My third message 5');

      // subscribe('send-sign-on', (err, data) => {
      //   console.log('obj 2');
      //   console.log(data);
      // });

      return { publish, subscribe };
    } catch (err) {
      logger.error(err);
    }
  };
  return { start };
};
