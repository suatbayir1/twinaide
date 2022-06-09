const kafka = require('kafka-node');
const CustomError = require('./helpers/error/CustomError');

class SocketHandler {
    listen = (socket) => {
        socket.on("kafka", (arg) => this.kafkaConnector(socket, arg))

    }

    kafkaConnector = (socket, arg) => {
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


    }
}

module.exports = SocketHandler;