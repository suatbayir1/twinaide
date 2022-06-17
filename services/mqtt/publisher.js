const mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", function () {
    setInterval(function () {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        data = {
            "timestamp": time,
            "value": parseInt(Math.random() * 50)
        }
        console.log(data);
        client.publish('mqtt-test-topic', JSON.stringify(data));
    }, 1000);
})

client.on("error", function (error) { console.log("Can't connect" + error) })