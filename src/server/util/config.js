
var env = process.env.ENV || 'local';

// print process.argv
process.argv.forEach(function (val, index, array) {
	var match = val.match(/ENV=(.+)/);
	if (match) {
		env = match[1];
	}
});



if ( !env ) {
	console.error('***ERROR*** you have to define the environment variable ENV to specify the running environment: "ENV=local node app"');
	return process.exit(1);
}

var configPath = '../config/' + env + '.json';
var config = require(configPath);

console.log('Configuration loaded for enviroment: "' + env + '"');

module = module.exports = config;
