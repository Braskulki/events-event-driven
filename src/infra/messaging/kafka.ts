import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['localhost:9092']
});

export const producer = kafka.producer({ allowAutoTopicCreation: true });
export const consumer = kafka.consumer({ groupId: 'event-driven-application' });

export async function sendMessage(data: { topic: string, messages: { value: string }[] }): Promise<void> {
  await producer.connect();
  await producer.send({ topic: data.topic, messages: data.messages });
}
