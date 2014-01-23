var express = require('express'),
	fs = require('fs'),
	logger = require('./util/logger')(__filename);


var app = express();
app.use(express.bodyParser());


app.use(express.static(__dirname + '/../client'));

app.use(app.router);

app.use(express.errorHandler({
	dumpExceptions: true,
	showStack: true
}));


//
// Routes
//
var basePath = __dirname + '/service/';
fs.readdirSync(basePath).forEach(function(filename) {
	require(basePath + filename)(app);
});

//
// Init app
//
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
if ( !port ) {
	console.error('***ERROR*** you have to define the environment variable PORT "PORT=3000 node app"');
	return process.exit(1);
}


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.listen(port, ipaddress, function () {
	logger.info('Application listening on http://' + ipaddress + ':' + port);
});