var todoManager = require('../manager/todo'),
		logger = require('../util/logger')(__filename);

function addServices(app) {

	app.post('/todo', addTodo);
	app.del('/todo/:id', delTodo);
	app.get('/todo/:id', getTodo);
	app.put('/todo/:id', modTodo);
	app.put('/todo/:id/check/:state', checkTodo);
	app.get('/todos/count', countTodos);
	app.get('/todos', getAll);
	app.put('/todos/check/:state', checkAll);
	app.del('/todos/checked', delChecked);
}

function addTodo(req, res) {
	todoManager.addTodo(req.body.text, function(err, msg, todo) {

		if (err) {
			logger.error(err);
			return res.send(500);
		}

		logger.info(msg, todo);

		res.json({
			status: 200,
			msg: msg,
			todo: todo
		});
	});
}

function getTodo(req, res) {
	todoManager.getTodo(req.params.id, function(err, msg, todo) {

		if (err) {
			logger.error(err);
			return res.send(500);
		}

		logger.info(msg);

		res.json({
			status: 200,
			msg: msg,
			todo: todo
		});
	});
}

function delTodo(req, res) {
	todoManager.delTodo(req.params.id, function(err, msg) {

		if (err) {
			logger.error(err);
			return res.send(500);
		}

		logger.info(msg);

		res.json({
			status: 200,
			msg: msg
		});
	});
}

function modTodo(req, res) {
	todoManager.modTodo(req.params.id, req.body.text, req.body.tags, function(err, msg, todo) {

		if (err) {
			logger.error(err);
			return res.send(500);
		}

		logger.info(msg);

		res.json({
			status: 200,
			msg: msg,
			todo: todo
		});
	});
}

function checkTodo(req, res) {
	todoManager.checkTodo(req.params.id, req.params.state, function(err, msg, todo) {

		if (err) {
			logger.error(err);
			return res.send(500);
		}

		logger.info(msg);

		res.json({
			status: 200,
			msg: msg,
			todo: todo
		});
	});
}

function countTodos(req, res) {
	todoManager.countTodos(function(err, msg, result) {

		if (err) {
			logger.error(err);
			return res.send(500);
		}

		logger.info(msg);

		res.json({
			status: 200,
			msg: msg,
			result: result
		});
	});
}

function getAll(req, res) {
	todoManager.getAll(function(err, msg, todos) {

		if (err) {
			logger.error(err);
			return res.send(500);
		}

		logger.info(msg);

		res.json({
			status: 200,
			msg: msg,
			todos: todos
		});
	});
}

function checkAll(req, res) {
	todoManager.checkAll(req.params.state, function(err, msg) {

		if (err) {
			logger.error(err);
			return res.send(500);
		}

		logger.info(msg);

		res.json({
			status: 200,
			msg: msg
		});
	});
}


function delChecked(req, res) {
	todoManager.delChecked(function(err, msg) {

		if (err) {
			logger.error(err);
			return res.send(500);
		}

		logger.info(msg);

		res.json({
			status: 200,
			msg: msg
		});
	});
}


module = module.exports = addServices;

