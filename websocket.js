const kafka = require('kafka-node');
const mqtt = require("mqtt");
class SocketHandler {
    listen = (socket) => {
        socket.on("kafka", (arg) => this.kafkaConnector(socket, arg))
        socket.on("mqtt", (arg) => this.mqttConnector(socket, arg))
    }

    kafkaConnector = (socket, arg) => {
        try {
            console.log("arg", arg);
            const client = new kafka.KafkaClient({
                kafkaHost: `${arg.IP}:${arg.PORT}`,
                sasl: { mechanism: 'plain', username: arg.USERNAME, password: arg.PASSWORD }
            });

            client.on("error", (error) => {
                socket.emit('event', JSON.stringify({ error: error.message }));
                console.log("clientError", error.message);
                client.close();
            })

            const offset = new kafka.Offset(client);

            offset.on("error", (error) => {
                console.log("offsetError", error.message);
                // socket.emit('event', JSON.stringify({ error: error.message }));
                client.close();
            })

            offset.fetchLatestOffsets([arg.TOPIC], function (error, offsets) {
                if (error) {
                    // console.log(error.message);
                    socket.emit('event', JSON.stringify({ error: error.message }));
                    return;
                }

                const consumer = new kafka.Consumer(
                    client,
                    [
                        {
                            topic: arg.TOPIC,
                            partition: 0,
                            offset: offsets[arg.TOPIC][0]
                        }
                    ],
                    { autoCommit: false, fromOffset: true }
                );

                console.log('Connected');
                console.log(arg);
                consumer.on('message', function (message) {
                    console.log(message);
                    socket.emit('event', message.value);
                });

                socket.on('disconnect', () => {
                    console.log('Client disconnected');
                    consumer.close(true, function (err, message) {
                        console.log("consumer has been closed..");
                    });
                });

                process.on('uncaughtException', function (err) {
                    console.log(err);
                });
            });
        } catch (e) {
            console.log(err);
        }
    }

    mqttConnector = (socket, arg) => {
        try {
            console.log(arg);
            const client = mqtt.connect(`mqtt://${arg.IP}:${arg.PORT}`,
                { username: arg.USERNAME, password: arg.PASSWORD }
            );

            client.on('connect', function () {
                client.subscribe(arg.TOPIC);
                console.log("client has subscribed");
            });

            client.on('message', function (topic, message) {
                console.log(message.toString());
                socket.emit('event', message.toString());
            })

            client.on("error", function (error) {
                console.log("Can't connect" + error)
                socket.emit('event', JSON.stringify({ error: error.message }));
                client.end();
            })

            socket.on('disconnect', () => {
                console.log('mqtt disconnected');
                client.end();
            });

            process.on('uncaughtException', function (err) {
                console.log(err);
            });

            console.log(arg);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = SocketHandler;