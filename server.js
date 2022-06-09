// Libraries
const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const path = require("path");
const SocketHandler = require('./websocket');

// Routes
const routes = require('./routes/index');

// Helpers
const connectDatabase = require('./helpers/database/connectDatabase');

// Middlewares
const customErrorHandler = require('./middlewares/errors/customErrorHandler');

// Express instance
const app = express();

// CORS Policy
app.use(cors());

// Express BodyParser
app.use(express.json());

// Environment Variables
dotenv.config({
    path: './config/env/config.env'
});

// Mongodb Connection
connectDatabase();

// Routers Middleware
app.use('/api', routes);

// Error Handling
app.use(customErrorHandler);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// App start
const server = app.listen(process.env.PORT, () => {
    console.log(`App started on ${process.env.PORT} : ${process.env.NODE_ENV}`);
})

// Web Socket
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', socket => {
    console.log('Connected');
    const socketHandler = new SocketHandler();
    socketHandler.listen(socket);
});