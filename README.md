# Twinaide

Twinaide is an open source platform for managing and creating interoperable digital twins. The twinaide project consists of 3 separate projects: a single page application developed with React, a rest api developed with nodejs and expressjs, and a flask api developed to interact with third party services.

Source codes of api developed using nodejs, expressjs and mongodb can be accessed at [twinaide](https://github.com/suatbayir1/twinaide)

The source code of the interface developed using reactjs and various javascript libraries can be accessed at [twinaide-ui](https://github.com/suatbayir1/twinaide-ui)

API developed using python and flask technologies and communicating with third party services can be accessed at [twinaide-python](https://github.com/suatbayir1/twinaide-python)

# Getting Started with Twinaide

### Instal Dependencies

To download the libraries used in the twinaide project, the `npm install` command should be run.

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