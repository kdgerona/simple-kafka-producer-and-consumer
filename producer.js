const { Kafka } = require('kafkajs');

const run = async () => {
  const kafka = new Kafka({
    clientId: 'producer-spike-app',
    brokers: ['10.110.49.101:9092'],
  });

  const { KAFKA_TOPIC = 'sample-topic' } = process.env;

  console.log('ENV:', KAFKA_TOPIC);

  const producer = kafka.producer();

  await producer.connect();

  process.stdin.on('data', async (message) => {
    const message_value = message.toString();
    await producer.send({
      topic: KAFKA_TOPIC,
      messages: [{ value: message_value }],
    });
    console.log(`MESSAGE SENT: ${message_value}`);
  });
};

run();
