var MongoClient = require('mongodb').MongoClient,
		config = require('../util/config').DB,
		logger = require('../util/logger')(__filename);

/**
 * MongoDB database
 */
var db, pending = [], opening = false;


function flushPending (err, db) {
	var f, F;
	for ( f = 0, F = pending.length; f < F; f++ ) {
		pending[f](err, db);
	}
	
	pending = [];
}

function getMongoDB (callback) {
	if ( db ) {
		return callback(null, db);
	}

	pending.push(callback);
	
	if ( opening ) {
		return;
	}

	opening = true;

	// 
	// The primary committer to node-mongodb-native says:
	//  "You open do MongoClient.connect once when your app boots up and reuse the db object.
	//   It's not a singleton connection pool each .connect creates a new connection pool."
	//
	// The connection string looks like 'mongodb://127.0.0.1:27017/igzgeoshare-test?w=1'
	//   - safe=true is deprecated (http://stackoverflow.com/questions/14995602/how-can-i-know-if-connection-is-safe-true)
	//   - use w=1 instead of (https://github.com/mongodb/node-mongodb-native/blob/master/docs/articles/MongoClient.md)
	// 
	MongoClient.connect(config.CONN, function(err, database) {

		opening = false;
		db = database;

		if (err) {
			logger.error("MongoClient.connect: " + err);

			flushPending(err, null);
			return;
		}

		logger.info('Mongodb connection established');

		flushPending(null, db);
	});

}

module = module.exports = getMongoDB;