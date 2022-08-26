# Twinaide

Twinaide is an open source platform for managing and creating interoperable digital twins. The twinaide project consists of 3 separate projects: a single page application developed with React, a rest api developed with nodejs and expressjs, and a flask api developed to interact with third party services.

Source codes of api developed using nodejs, expressjs and mongodb can be accessed at [twinaide](https://github.com/suatbayir1/twinaide)

The source code of the interface developed using reactjs and various javascript libraries can be accessed at [twinaide-ui](https://github.com/suatbayir1/twinaide-ui)

API developed using python and flask technologies and communicating with third party services can be accessed at [twinaide-python](https://github.com/suatbayir1/twinaide-python)

# Getting Started with Twinaide

### Instal Dependencies

To download the libraries used in the twinaide project, the `npm install` command should be run.

### Set config file
Before starting the API, a file named `config.env` should be created under the `twinaide/config` folder and the variable information that appears in the `twinaide/test.env` file should be set.

```
# Server Variables
PORT = <YOUR-PORT>
NODE_ENV = <development | production>

# MongoDB URI
MONGO_URI = <YOUR-MONGO-URI>

# JSON Web Token
JWT_SECRET_KEY = <YOUR-JWT-SECRET-KEY>
JWT_EXPIRE = <YOUR-JWT-EXPIRE-TIME>

# Cookie
JWT_COOKIE = <YOUR-JWT-COOKIE>
```

### Start API

To start the API, `npm run start` command must be run in the root directory. After running the command the following output should be obtained.

```
> twinaide@1.0.0 start
> nodemon server.js

[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
App started on 5000 : development
mongodb connection successful
```

# Project Folder Structure

The folder structure where the backend processes are located is created as above. The development of the above folder structure will be welcomed, however, developers are also expected to comply with this structure as much as possible in terms of project integrity.

### Config

The config folder contains constant values used throughout the project. database connection urls, port settings and password information.

### Controllers

Methods that respond to http requests are located in the controllers folder. The methods are divided into separate modules according to the main category they are related to, and collected in the server file and respond to external requests.

### Helpers

Methods that are used from more than one place and that perform auxiliary functions are collected under the helpers folder.

### Middlewares

In the middlewares folder, requests from outside are subjected to a number of checks before reaching the controller and it is decided to proceed.

### Models

Under the models folder, the structure of the data to be kept in mongodb is decided and communication with the database is facilitated by using the `mongoose` library.

### Routes

The routes folder contains files that manage routing operations.

### Services

In the services folder, there are publisher and subscriber codes of 2 different brokers, kafka and mqtt.

# Data Transfer

Currently, data transfer is supported for 2 different message brokers, kafka and mqtt.

## Start Kafka

To start kafka and zookeeper services, `docker-compose up` command must be run in root directory. 

## MQTT Broker

To run mqtt broker, you must first set up an mqtt broker server on your computer. [mosquitto](https://mosquitto.org/) you can follow the installation steps on this link