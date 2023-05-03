import { Client, Message } from 'react-native-mqtt';

// create an MQTT client instance
const client = new Client({
  uri: 'mqtt://44.202.67.39:1883',
  clientId: 'myClientId',
  user: 'jasminesMind',
  pass: 'Devlacus333',
});

// connect to the broker
client.connect()
  .then(() => {
    console.log('connected to MQTT broker');

    // create a message object with the payload
    const message = new Message('Hello, MQTT!');

    // publish the message to the 'banana' topic
    client.publish('banana', message)
      .then(() => console.log('published message to banana topic'))
      .catch((error) => console.log('failed to publish message:', error));
  })
  .catch((error) => console.log('failed to connect to MQTT broker:', error));
