var logger = require('../util/logger')(__filename),
		util = require('util'),
		mongodb = require('../util/mongodb'),
		async = require('async'),
		ObjectID = require('mongodb').ObjectID;


//
// User indexes
//

function checkIndex(next) {
	mongodb(function(err, db) {
		if (err) {
			throw err;
		}

		db.collection('todo').ensureIndex({
			"completed": 1
		},
		function(err, result) {
			if (err) {
				throw err;
			}
			next();
		}
		);
	});
}


function todoIndexes(callback) {
	async.parallel([checkIndex], function(err) {

		if (err) {
			return callback(err);
		}

		logger.info("All todo indexes have been ensured");

		if (callback) {
			callback();
		}
	});
}

todoIndexes();


function Todo() {
}

Todo.prototype.save = function(todo, callback) {
	mongodb(function(err, db) {
		if (err) {
			return callback(err, null);
		}

		db.collection('todo').save(todo, {safe: true}, callback);
	});
};


Todo.prototype.get = function(todoId, user, callback) {
	mongodb(function(err, db) {
		if (err) {
			return callback(err, null);
		}

		db.collection('todo').findOne({_id: new ObjectID(todoId), user: user}, callback);
	});
};

Todo.prototype.remove = function(query, callback) {
	mongodb(function(err, db) {
		if (err) {
			return callback(err, null);
		}

		db.collection('todo').remove(query, callback);
	});
};


Todo.prototype.removeOne = function(todoId, user, callback) {
	var query = {_id: new ObjectID(todoId), user: user};
	this.remove(query, callback);
};

Todo.prototype.updateOne = function(todoId, user, update, callback) {
  mongodb(function(err, db) {
		if (err) {
			return callback(err, null);
		}

		var query = {_id: new ObjectID(todoId), user: user};
		var sort = null;
		var options = {
			new : true, // set to true if you want to return the modified object rather than the original
		};

		db.collection('todo').findAndModify(query, sort, {'$set': update}, options, function(err, todoSaved) {
			if (err) {
				return callback(err, null);
			}
			callback(null, todoSaved);
		});
	});
};


Todo.prototype.update = function(query, update, callback) {

	mongodb(function(err, db) {
		if (err) {
			return callback(err, null);
		}

		var options = {
			multi: true
		};

		db.collection('todo').update(query, {'$set': update}, options, function(err, result) {
			if (err) {
				return callback(err, null);
			}

			callback(null, result);
		});
	});
};


Todo.prototype.count = function(user, callback) {
	mongodb(function(err, db) {
		if (err) {
			return callback(err, null);
		}
    
    Todo.prototype.find({user: user}, function(err, result) {
      if (err) {
       return  callback(err);
     } else {
       return  callback(null, result.length);
     }
        
    });
	});
};

Todo.prototype.find = function(query, callback) {
	mongodb(function(err, db) {
		if (err) {
			return callback(err, null);
		}
		
		var sort = {
			_id: 1
		};

		db.collection('todo').find(query, {sort: sort}).toArray(callback);
	});
};




module.exports = new Todo();