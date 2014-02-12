var todoManager = require('../manager/todo'),
    sec = require('../middleware/sec'),
	logger = require('../util/logger')(__filename);

function addServices(app) {

	app.post('/todo', sec.ensureAuthenticated, addTodo);
	app.del('/todo/:id', sec.ensureAuthenticated, delTodo);
	app.get('/todo/:id', sec.ensureAuthenticated, getTodo);
	app.put('/todo/:id', sec.ensureAuthenticated, modTodo);
	app.put('/todo/:id/check/:state', sec.ensureAuthenticated, checkTodo);
	app.get('/todos/count', sec.ensureAuthenticated, countTodos);
	app.get('/todos', sec.ensureAuthenticated, getAll);
	app.put('/todos/check/:state', sec.ensureAuthenticated, checkAll);
	app.del('/todos/checked', sec.ensureAuthenticated, delChecked);
}

function addTodo(req, res) {
	todoManager.addTodo(req.body.text, req.session.me, function(err, msg, todo) {

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
	todoManager.getTodo(req.params.id, req.session.me, function(err, msg, todo) {

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
	todoManager.delTodo(req.params.id, req.session.me, function(err, msg) {

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
	todoManager.modTodo(req.params.id, req.body.text, req.session.me, function(err, msg, todo) {

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
	todoManager.checkTodo(req.params.id, req.params.state, req.session.me, function(err, msg, todo) {

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
	todoManager.countTodos(req.session.me, function(err, msg, result) {

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
	todoManager.getAll(req.session.me, function(err, msg, todos) {

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
	todoManager.checkAll(req.params.state, req.session.me, function(err, msg) {

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
	todoManager.delChecked(req.session.me, function(err, msg) {

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

