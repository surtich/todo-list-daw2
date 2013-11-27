(function(root) {

	if (!root.TODO_APP) {
		root.TODO_APP = {};
	}
	
	function loggerDecorator (message, params, result) {
		console.log('[message = ' + message + ']', 'params = ', params, 'result =', result);
	}
	
	root.TODO_APP.addTodo = root.TODO_APP.addDecorator(root.TODO_APP.addTodo, {post: loggerDecorator}, 'Todo added');
	root.TODO_APP.delTodo = root.TODO_APP.addDecorator(root.TODO_APP.delTodo, {post: loggerDecorator}, 'Todo deleted');
	root.TODO_APP.modTodo = root.TODO_APP.addDecorator(root.TODO_APP.modTodo, {post: loggerDecorator}, 'Todo modified');
	root.TODO_APP.checkTodo = root.TODO_APP.addDecorator(root.TODO_APP.checkTodo, {post: loggerDecorator}, 'Todo checked/unchecked');
	root.TODO_APP.checkAll = root.TODO_APP.addDecorator(root.TODO_APP.checkAll, {post: loggerDecorator}, 'All todos have changed their state');
	root.TODO_APP.delChecked = root.TODO_APP.addDecorator(root.TODO_APP.delChecked, {post: loggerDecorator}, 'All checked todos has been deleted');

	window.addEventListener('load', function() {
		root.TODO_APP.undo = root.TODO_APP.addDecorator(root.TODO_APP.undo, {post: loggerDecorator}, 'Undo called');
		root.TODO_APP.redo = root.TODO_APP.addDecorator(root.TODO_APP.redo, {post: loggerDecorator}, 'Redo called');
	});
})(this);