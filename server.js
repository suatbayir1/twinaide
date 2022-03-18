// Libraries
const express = require("express");
const dotenv = require("dotenv");

// Routes
const routes = require('./routes/index');

// Helpers
const connectDatabase = require('./helpers/database/connectDatabase');

// Middlewares
const customErrorHandler = require('./middlewares/errors/customErrorHandler');

// Express instance
const app = express();

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

// App start
app.listen(process.env.PORT, () => {
    console.log(`App started on ${process.env.PORT} : ${process.env.NODE_ENV}`);
})
