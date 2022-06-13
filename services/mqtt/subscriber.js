const mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:1883");

client.on('connect', function () {
    client.subscribe("Test");
    console.log("client has subscribed");
});

client.on('message', function (topic, message) {
    console.log(message.toString());
})