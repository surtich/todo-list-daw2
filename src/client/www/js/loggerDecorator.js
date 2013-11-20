(function(root) {

	if (!root.TODO_APP) {
		root.TODO_APP = {};
	}
	
	function loggerDecorator (message, params, result) {
		console.log('[message = ' + message + ']', 'params = ', params, 'result =', result);
	}
	
	root.TODO_APP.addTodo = root.TODO_APP.addDecorator(root.TODO_APP.addTodo, loggerDecorator, 'Todo added');
	root.TODO_APP.delTodo = root.TODO_APP.addDecorator(root.TODO_APP.delTodo, loggerDecorator, 'Todo deleted');
	root.TODO_APP.modTodo = root.TODO_APP.addDecorator(root.TODO_APP.modTodo, loggerDecorator, 'Todo modified');
	root.TODO_APP.checkTodo = root.TODO_APP.addDecorator(root.TODO_APP.checkTodo, loggerDecorator, 'Todo checked/unchecked');
	root.TODO_APP.checkAll = root.TODO_APP.addDecorator(root.TODO_APP.checkAll, loggerDecorator, 'All todos have changed their state');
	root.TODO_APP.delChecked = root.TODO_APP.addDecorator(root.TODO_APP.delChecked, loggerDecorator, 'All checked todos has been deleted');
	
})(this);

