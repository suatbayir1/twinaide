const kafka = require('kafka-node');

let arg = {
    IP: "localhost",
    PORT: "9096",
    TOPIC: "test1234"
}

try {
    console.log("arg", arg);
    const client = new kafka.KafkaClient({
        kafkaHost: `${arg.IP}:${arg.PORT}`,
        sasl: { mechanism: 'plain', username: "kafkauser", password: "kafkapassword" }
    });

    const offset = new kafka.Offset(client);

    offset.fetchLatestOffsets([arg.TOPIC], function (error, offsets) {
        if (error) {
            console.log(error.message);
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
        });

        process.on('uncaughtException', function (err) {
            console.log(err);
        });
    });
} catch (e) {
    console.log(err);
}