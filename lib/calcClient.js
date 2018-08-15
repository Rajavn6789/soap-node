const soap = require('soap');
const logger = require('./utils/logger');
const url = 'http://localhost:8081/calculator?wsdl';

soap.createClient(url, (err, client) => {
  if (err) throw err;

    const args = {
      a: 10,
      b: 5
    };

    client.add(args, function (err, res) {
      if (err){
        throw err
      }else{
        logger.info('Addition Response - [%s]', JSON.stringify(res));
      }
    });

    client.subtract(args, function (err, res) {
      if (err){
        throw err
      }else{
        logger.info('Subtraction Response - [%s]', JSON.stringify(res));
      }
    });

    client.multiply(args, function (err, res) {
      if (err){
        throw err
      }else{
        logger.info('Multiply Response - [%s]', JSON.stringify(res));
      }
    });

    client.divide(args, function (err, res) {
      if (err){
        throw err
      }else{
        logger.info('Divison Response - [%s]', JSON.stringify(res));
      }
    });

    client.divide({a:10, b: 0}, function (err, res) {
      if (err){
        logger.error('Unable to divide [%s]', JSON.stringify(err.Fault.faultstring));
        return err
      }else{
        logger.info('Divison Response - [%s]', JSON.stringify(res));
      }
    });

});
