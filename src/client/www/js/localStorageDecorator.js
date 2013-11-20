(function(root) {

	if (!root.TODO_APP) {
		root.TODO_APP = {};
	}

	function localStorageDecorator() {
		localStorage.todos = JSON.stringify(root.TODO_APP.toJSON());
		console.log('[localStorage sotored]', localStorage.todos);
	}

	window.addEventListener('load', function() {
		root.TODO_APP.decoreFunctions(
				[
					'addTodo', 'delTodo', 'modTodo', 'checkTodo', 'checkAll', 'delChecked', 'undo', 'load'
				], {post: localStorageDecorator});
	});

})(this);

