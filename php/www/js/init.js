(function() {

	var parent = {
		delTodoUI: delTodoUI,
		checkTodoUI: checkTodoUI,
		modTodoUI: modTodoUI
	};

	var todosUI = [];

	window.addEventListener('load', function() {
		loadLocalStorage();
		applyFilter();

		document.getElementById('new-todo').onkeypress = function(event) {
			var text = event.target.value.trim();
			if (event.keyCode === 13 && text !== "") {
				var todo = TODO_APP.addTodo(text);
				addTodoUI(todo);
				event.target.value = "";
				render(false);
			}
		};

		document.getElementById('clear-completed').onclick = function() {
			delChecked();
		};

		document.getElementById('toggle-all').onclick = function() {
			var state = TODO_APP.itemsLeft() > 0;
			checkAll(state);
		};

		document.getElementById('undo').onclick = function() {
			TODO_APP.load(TODO_APP.undo());
			init();
		};

		document.getElementById('redo').onclick = function() {
			TODO_APP.load(TODO_APP.redo());
			init();
		};

		document.getElementById('sort-asc').onclick = function() {
			init(true);
			this.disabled = true;
		};

		document.getElementById('sort-desc').onclick = function() {
			init(true, true);
			this.disabled = true;
		};

		window.onhashchange = applyFilter;
	});

	function addTodoUI(todo) {
		var todoUI = new TODO_APP.TodoUI(todo, parent);
		todosUI.push(todoUI);
		document.getElementById('todo-list').appendChild(todoUI.container);
	}

	function delTodoUI(todoUI) {
		document.getElementById('todo-list').removeChild(todoUI.container);
		var removed = false,
				i = 0;

		while (!removed && i < todosUI.length) {
			if (todosUI[i] === todoUI) {
				todosUI.splice(i, 1);
				removed = true;
			} else {
				i++;
			}
		}

		render(false);
	}

	function checkTodoUI(todoUI) {
		/*
		 if (todoUI.todo.getChecked()) {
		 document.getElementById('todo-list').appendChild(todoUI.container);
		 }
		 */
		render(false);
	}
	
	function modTodoUI(todoUI) {
		render(false);
	}

	function delChecked() {
		TODO_APP.delChecked();
		var toDelete = [];

		todosUI.forEach(function(todoUI) {
			if (todoUI.todo.isDeleted()) {
				toDelete.push(todoUI);
			}
		});

		toDelete.forEach(function(todoUI) {
			delTodoUI(todoUI);
		});

		render(false);
	}


	function checkAll(state) {
		TODO_APP.checkAll(state);
		render(true);
	}

	function applyFilter() {
		var pattern = "#/";
		var pos = window.location.hash.indexOf(pattern);
		var filter = window.location.hash.substring(pos + pattern.length);

		TODO_APP.filterTodos(filter);
		render(true);
		renderLink(filter);
	}

	function render(renderChildren) {
		var itemsLeft = document.getElementById('todo-count');
		var clearCompleted = document.getElementById('clear-completed');
		var mainSection = document.getElementById('main');
		var footer = document.getElementById('footer');

		document.getElementById('undo').disabled = !TODO_APP.canUndo();
		document.getElementById('redo').disabled = !TODO_APP.canRedo();

		document.getElementById('sort-asc').disabled = TODO_APP.countTodos() < 2;
		document.getElementById('sort-desc').disabled = TODO_APP.countTodos() < 2;

		if (TODO_APP.countTodos() > 0) {
			footer.style.display = '';
			mainSection.style.display = '';
			itemsLeft.innerHTML = '<strong>' + TODO_APP.itemsLeft() + "</strong> item" + (TODO_APP.itemsLeft() !== 1 ? "s" : "") + " left";
		} else {
			mainSection.style.display = 'none';
			footer.style.display = 'none';
		}

		if (TODO_APP.countTodos() - TODO_APP.itemsLeft() > 0) {
			clearCompleted.style.display = '';
			clearCompleted.innerHTML = "Clear completed (" + (TODO_APP.countTodos() - TODO_APP.itemsLeft()) + ")";
		} else {
			clearCompleted.style.display = 'none';
		}
    
    if (TODO_APP.itemsLeft() > 0) {
      document.getElementById('toggle-all').children[0].className = 'glyphicon glyphicon-check';
      document.getElementById('toggle-all').children[0].innerHTML = '  Mark all as complete';
    } else {
      document.getElementById('toggle-all').children[0].className = 'glyphicon glyphicon-unchecked';
      document.getElementById('toggle-all').children[0].innerHTML = '  Mark all as uncomplete';
    }

		if (renderChildren) {
			todosUI.forEach(function(todoUI) {
				todoUI.render();
			});
		}
	}

	function renderLink(filter) {
		var links = document.getElementById('filters').getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			links[i].className = '';
		}

		var activeLink = document.getElementById('filter-' + filter) || document.getElementById('filter-all');
		activeLink.className = 'selected';

	}

	function loadLocalStorage() {
		if (localStorage && localStorage.todos) {
			TODO_APP.load(JSON.parse(localStorage.todos));
			TODO_APP.initUndoRedoDecorator();
			init();
		}
	}

	function init(sort, desc) {
		var i,
    todo;
    
		todosUI = [];
		document.getElementById('todo-list').innerHTML = "";

		var todos = null;
		if (sort) {
			todos = TODO_APP.getSortedTodos();
		} else {
			todos = TODO_APP.getTodos();
		}
		if (sort && desc) {
			for (i = todos.length - 1; i >=0 ; i--) {
				todo = todos[i];
				addTodoUI(todo);
			}
		} else {
			for (i in todos) {
				todo = todos[i];
				addTodoUI(todo);
			}
		}

		render(true);
	}
})();


