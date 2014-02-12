var logger = require('../util/logger')(__filename),
		util = require('util'),
		mongodb = require('../util/mongodb'),
		async = require('async');


//
// User indexes
//


function userIndexes(callback) {
	async.parallel([], function(err) {

		if (err) {
			return callback(err);
		}

		logger.info("All todo indexes have been ensured");

		if (callback) {
			callback();
		}
	});
}

userIndexes();


function User() {
}

User.prototype.save = function(user, callback) {
	mongodb(function(err, db) {
		if (err) {
			return callback(err, null);
		}

		db.collection('user').insert(user, {safe: true}, callback);
	});
};


User.prototype.get = function(idUser, callback) {
	mongodb(function(err, db) {
		if (err) {
			return callback(err, null);
		}

		db.collection('user').findOne({_id: idUser}, callback);
	});
};



module.exports = new User();