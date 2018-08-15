const soap = require('soap');
const logger = require('./utils/logger');
const url = 'http://localhost:8081/splitter?wsdl';

soap.createClient(url, (err, client) => {
  if (err) throw err;

	const args = {
		message: "id1:12:34:56:out42",
		splitter: ":"
	};

	client.MessageSplitter(args, function (err, res) {
		if (err){
			throw err
		}else{
			logger.info('Splitted Response - [%s]', JSON.stringify(res));
		}
	});

});
