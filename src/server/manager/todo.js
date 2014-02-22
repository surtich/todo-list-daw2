var todoDAO = require('../dao/todo'),
logger = require('../util/logger')(__filename),
check = require('../util/validator').check,
ObjectID = require('mongodb').ObjectID;

function addTodo(text, callback) {

    try {
        check(text, 'Todo text').notEmpty();
    } catch (err) {
        return callback(err, null);
    }

    var now = new Date();

    todoDAO.save({
        text: text,
        completed: false,
        creationDate: now,
        modifiedDate: now
    }, function(err, todo) {
        callback(err, "todo added", todo);
    });
}


function getTodo(todoId, callback) {

    try {
        check(todoId).ObjectID();
    } catch (err) {
        return callback(err, null);
    }
	
    todoDAO.get(todoId, function(err, todo) {
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


function delTodo(todoId, callback) {

    try {
        check(todoId).ObjectID();
    } catch (err) {
        return callback(err, null);
    }
	
    todoDAO.removeOne(todoId, function(err, result) {
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


function updateOne(todoId, update, callback) {
    try {
        check(todoId).ObjectID();
    } catch (err) {
        return callback(err, null);
    }
	
    update['$set'].modifiedDate = new Date();
	
    todoDAO.updateOne(todoId, update, function(err, todoSaved) {
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

function modTodo(todoId, newText, tags, callback) {
    try {
        check(newText, 'text').notEmpty();
    } catch (err) {
        return callback(err, null);
    }
    
    var update = {};
    
    if (tags) {
        update['$set'] = {
            text: newText,
            tags: tags
        };
    } else {
        update['$set'] = {
            text: newText
        };
        update['$unset'] = {
            tags: ''
        };
    }
	
    
    updateOne(todoId, update, callback);
}

function checkTodo(todoId, completed, callback) {
    try {
        check(completed).isBoolean();
    } catch (err) {
        return callback(err, null);
    }
	
    updateOne(todoId, {
        $set: {
            completed: Boolean(completed.toLowerCase() === 'true')
        }
    }, callback);
}


function countTodos(callback) {

    todoDAO.count(function(err, result) {
        callback(err, "todos counted", result);
    });
}

function find(query, callback) {
    todoDAO.find(query, function(err, result) {
        callback(err, "Todos retrieved", result);
    });
}

function getAll(callback) {
    find({}, callback);
}


function checkAll(completed, callback) {
    try {
        check(completed).isBoolean();
    } catch (err) {
        return callback(err, null);
    }
	
    var query = {};
	
    update(query, {
        completed: Boolean(completed.toLowerCase() === 'true')
    }, callback);
}


function delChecked(callback) {
	
    var query = {
        completed: true
    };
	
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
    delChecked: delChecked
};