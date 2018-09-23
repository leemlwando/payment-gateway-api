const { ServiceBroker } = require("moleculer");
const ApiService = require("moleculer-web");

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const broker = new ServiceBroker(require('./moleculer.config'));

broker.loadServices(folder = "./services", fileMask = "**/*.service.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


  
app.listen(3050,()=>console.log('server started on port 3050'));

broker.start();
