const kafka = require('kafka-node');
const mqtt = require("mqtt");
class SocketHandler {
    listen = (socket) => {
        socket.on("kafka", (arg) => this.kafkaConnector(socket, arg))
        socket.on("mqtt", (arg) => this.mqttConnector(socket, arg))
    }

    kafkaConnector = (socket, arg) => {
        try {
            const client = new kafka.KafkaClient(`${arg.IP}:${arg.PORT}`);
            const offset = new kafka.Offset(client);
            offset.fetchLatestOffsets([arg.TOPIC], function (error, offsets) {
                if (error)
                    return handleError(error);

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
            const client = mqtt.connect(`mqtt://${arg.IP}:${arg.PORT}`);

            client.on('connect', function () {
                client.subscribe(arg.TOPIC);
                console.log("client has subscribed");
            });

            client.on('message', function (topic, message) {
                console.log(message.toString());
                socket.emit('event', message.toString());
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