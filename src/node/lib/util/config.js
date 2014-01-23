
var env = process.env.ENV;

if ( !env ) {
	console.error('***ERROR*** you have to define the environment variable ENV to specify the running environment: "ENV=local node app"');
	return process.exit(1);
}

var configPath = '../config/' + env + '.json';
var config = require(configPath);

console.log('Configuration loaded for enviroment: "' + env + '"');

module = module.exports = config;
