var todoDAO = require('../dao/todo'),
		logger = require('../util/logger')(__filename),
		check = require('../util/validator').check,
		ObjectID = require('mongodb').ObjectID;

function addTodo(text, user, callback) {

	try {
		check(text, 'Todo text').notEmpty();
	} catch (err) {
		return callback(err, null);
	}

	var now = new Date();

	todoDAO.save({
		text: text,
		completed: false,
    user: user,
		creationDate: now,
		modifiedDate: now
	}, function(err, todo) {
		callback(err, "todo added", todo);
	});
}


function getTodo(todoId, user, callback) {

	try {
		check(todoId).ObjectID();
	} catch (err) {
		return callback(err, null);
	}
	
	todoDAO.get(todoId, user, function(err, todo) {
		if (err) {
			return callback(err);
		}
		
		var msg;
		if (!todo) {
			msg = "There is no todo with id = " + todoId;
		} else {
			msg = "Todo retrieved";
		}
		callback(null, msg, todo);
	});

}


function delTodo(todoId, user, callback) {

	try {
		check(todoId).ObjectID();
	} catch (err) {
		return callback(err, null);
	}
	
	todoDAO.removeOne(todoId, user, function(err, result) {
		if (err) {
			return callback(err);
		}
		
		var msg;
		if (result === 0) {
			msg = "Not deleted: There is no todo with id = " + todoId;
		} else {
			msg = "Todo deleted";
		}
		callback(null, msg);
	});

}


function updateOne(todoId, user, shared, update,callback) {
	try {
		check(todoId).ObjectID();
	} catch (err) {
		return callback(err, null);
	}
	
	update.modifiedDate = new Date();
	
	todoDAO.updateOne(todoId, user, shared, update, function(err, todoSaved) {
		if (err) {
			return callback(err);
		}
		
		var msg = "Todo updated";
		
		callback(null, msg, todoSaved);
	});
}

function update(query, update, callback) {
	
	update.modifiedDate = new Date();
	
	todoDAO.update(query, update, function(err, results) {
		if (err) {
			return callback(err);
		}
		
		var msg = "Todos updated";
		
		callback(null, msg, results);
	});
}

function modTodo(todoId, newText, user, callback) {
	try {
		check(newText, 'text').notEmpty();
	} catch (err) {
		return callback(err, null);
	}
	
	
	updateOne(todoId, user, false, {text: newText}, callback);
}


function shareTodo(todoId, usersString, user, callback) {
  var users;
  if (usersString) {
    users = usersString.split(',');
  } else {
    users = [];
  }
          
	updateOne(todoId, user, false, {users: users}, callback);
}

function checkTodo(todoId, completed, user, callback) {
	try {
		check(completed).isBoolean();
	} catch (err) {
		return callback(err, null);
	}
	
	updateOne(todoId, user, true, {completed: Boolean(completed.toLowerCase() === 'true')}, callback);
}


function countTodos(user, callback) {

	todoDAO.count(user, function(err, result) {
		callback(err, "todos counted", result);
	});
}

function find(query, callback) {
	todoDAO.find(query, function(err, result) {
		callback(err, "Todos retrieved", result);
	});
}

function getAll(user, callback) {
	find({$or: [{user: user}, {users: {$in: [user]}}]}, callback);
}

function checkAll(completed, user, callback) {
	try {
		check(completed).isBoolean();
	} catch (err) {
		return callback(err, null);
	}
	
	var query = {$or: [{user: user}, {users: {$in: [user]}}]};
	
	update(query, {completed: Boolean(completed.toLowerCase() === 'true')}, callback);
}


function delChecked(user, callback) {
	
	var query = {user: user, completed: true};
	
	todoDAO.remove(query, function(err, result) {
		if (err) {
			return callback(err);
		}
		
		var msg = "Checked todos deleted";
		
		callback(null, msg);
	});

}


module.exports = {
	addTodo: addTodo,
	getTodo: getTodo,
	delTodo: delTodo,
	modTodo: modTodo,
	checkTodo: checkTodo,
	countTodos: countTodos,
	getAll: getAll,
	checkAll: checkAll,
	delChecked: delChecked,
  shareTodo: shareTodo
};