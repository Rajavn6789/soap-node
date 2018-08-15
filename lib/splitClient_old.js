const soap = require('soap');
const logger = require('./snLogger');
const url = 'http://localhost:8080/wsdl?wsdl';

const wsdlOptions = {
	returnFault: true,
}

var handleResponse = function(body, response, eid) {
	if (response && response.statusCode) {
		if (response.statusCode === 401) {
			console.log(body);
			logger.error('Server rejected the credentials...');
			return new Error('Invalid Credentials');
		}
	}
}

class SNClient{
  constructor(){
    this._client = null;
    this.initClient();
    //this.splitMessage();
  }

  initClient(){
    try{
      soap.createClient(url, wsdlOptions, (err, client) => {
        this._client = client;
        this._client.on('response', handleResponse);

        client.setSecurity(new soap.BasicAuthSecurity('raja', 'test@123'));

        if (err){
          logger.error('Unable to create client - [%s]', err);
          return err;
        }

        logger.info('Soap client has been initialized with [%s] auth', 'Basic');

      });
    }
    catch(err) {
        logger.error('Error creating client.[%s]', err);
        throw err;
      }
  }

  splitMessage(){
    const args = {
      message: "id1:12:34:56:out42",
      splitter: ":"
    };

    this._client.MessageSplitter(args, function (err, res) {
      if (err){
        throw err
      }else{
        logger.info('Response - [%s]', JSON.stringify(res));
      }
    });
  }
}


const snc = new SNClient();
