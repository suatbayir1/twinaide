const kafka = require('kafka-node');

const client = new kafka.KafkaClient({
    kafkaHost: `localhost:9096`,
    sasl: { mechanism: 'plain', username: "kafkauser", password: "kafkapassword" }
});

producer = new kafka.Producer(client);


producer.on('ready', function () {
    setInterval(() => {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


        payloads = [
            {
                topic: process.argv[2] || 'test1234', messages: JSON.stringify({
                    "timestamp": time,
                    "value": parseInt(Math.random() * process.argv[3])
                })
            },
        ];

        console.log(payloads)
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    }, 5000)

});

producer.on('error', function (err) { })