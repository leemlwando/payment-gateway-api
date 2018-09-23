const { ServiceBroker } = require("moleculer");
const ApiService = require("moleculer-web");
const createError = require('http-errors');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const broker = new ServiceBroker(require('./moleculer.config'));

broker.loadServices(folder = "./services", fileMask = "**/*.service.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send({
        status:err.status,
        success:false,
        err:err
    });
  });

  
app.listen(5000,()=>console.log('api gateway started on port 3000'));

broker.start();
