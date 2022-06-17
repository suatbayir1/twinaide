const mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:1883", { username: "suat1", password: "1234123526" });

client.on('connect', function () {
    client.subscribe("mqtt-test-topic");
    console.log("client has subscribed");
});

client.on('message', function (topic, message) {
    console.log(message.toString());
})

client.on("error", function (error) { console.log("Can't connect" + error) })
