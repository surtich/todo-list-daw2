(function(root) {

	var actions = {};

	if (!root.TODO_APP) {
		root.TODO_APP = {};
	}

	function undoRedoDecorator() {
		var jsonTodos;
		return {
			post: function() {
				jsonTodos = root.TODO_APP.toJSON();
				addAction(jsonTodos);
			}
		};
	}

	function addAction(jsonTodos) {
		var action = {
			jsonTodos: jsonTodos,
			previous: actions
		};
		actions.next = action;
		actions = action;
	}

	function canUndo() {
		return actions.previous !== undefined;
	}

	function canRedo() {
		return actions.next !== undefined;
	}

	function undo() {
		if (!canUndo()) {
			throw "There is nothing to undo";
		}
		actions = actions.previous;
		return actions.jsonTodos;
	}

	function redo() {
		if (!canRedo()) {
			throw "There is nothing to redo";
		}
		actions = actions.next;
		return actions.jsonTodos;
	}

	window.addEventListener('load', function() {
		root.TODO_APP.decoreFunctions(
				[
					'addTodo', 'delTodo', 'modTodo', 'checkTodo', 'checkAll', 'delChecked'
				],
				undoRedoDecorator()
				);
	});

	function init() {
		actions = {jsonTodos: root.TODO_APP.toJSON()};
	};

	root.TODO_APP.canUndo = canUndo;
	root.TODO_APP.canRedo = canRedo;
	root.TODO_APP.undo = undo;
	root.TODO_APP.redo = redo;
	root.TODO_APP.initUndoRedoDecorator = init;

})(this);

