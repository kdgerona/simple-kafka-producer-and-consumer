const { Kafka } = require('kafkajs');

const run = async () => {
  const kafka = new Kafka({
    clientId: 'consumer-spike-app',
    brokers: ['10.110.49.101:9092'],
  });

  const {
    KAFKA_TOPIC = 'sample-topic',
    KAFKA_GROUP_ID = 'consumer-0',
  } = process.env;

  console.log('ENV:', KAFKA_TOPIC, KAFKA_GROUP_ID);

  const consumer = kafka.consumer({ groupId: KAFKA_GROUP_ID });
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Partition', partition);
      console.log('Message', message);
    },
  });
};

run();
