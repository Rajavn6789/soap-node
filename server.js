const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');

const logger = require('./lib/utils/logger');
const splitterServices = require('./lib/services/Splitter/splitter');
const calcServices = require('./lib/services/Calculator/calculator');

/*
TODO
1) logger not logging errors log
2) Add Basic security to SOAP Client
3) winston logger file rotator
4) remove multiple sopa method calls
*/

// load the WSDL file
const calcWsdl = fs.readFileSync('./lib/services/Calculator/calculator.wsdl', 'utf8');
logger.info('calc wsdl file has been sync loaded')

const splitterWsdl = fs.readFileSync('./lib/services/Splitter/splitter.wsdl', 'utf8');
logger.info('splitter wsdl file has been sync loaded')

// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!"');
})

// service objects for servers
const calcServiceObject = {
  Calculator: {
        soap: {
            add: calcServices.add,
            subtract: calcServices.subtract,
            multiply: calcServices.multiply,
            divide: calcServices.divide,
        }
    }
};

const splitterServiceObject = {
  MessageSplitterService: {
        MessageSplitterServiceSoapPort: {
            MessageSplitter: splitterServices.splitterFunc
    }
  }
};

var port = 8081;
app.listen(port, function () {
  const calcServer = soap.listen(app, "/calculator", calcServiceObject, calcWsdl);
  const splitterServer = soap.listen(app, "/splitter", splitterServiceObject, splitterWsdl);
  logger.info('Calc Server has been initialised on port [%d]', port);
  logger.info('Splitter Server has been initialised on port [%d]', port);
});
