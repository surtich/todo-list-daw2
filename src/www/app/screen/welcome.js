iris.screen(function(self) {

	var todos = iris.resource(iris.path.resource.todo),
			uis = [];

	function createTodo(todo) {
		uis.push(self.ui("todo-list", iris.path.ui.todo.js, {id: todo._id, onUpdate: onUpdate}).render().show());
	}

	function onUpdate() {
		render();
	}

	function init(todos) {
		var i = 0;
		for (; i < uis.length; i++) {
			uis[i].destroyUI();
		}
		uis = [];
		for (var id in todos) {
			createTodo(todos[id]);
		}
		render();
	}

	self.create = function() {
		self.tmpl(iris.path.screen.welcome.html);

		self.get("new-todo").on("keyup", function(e) {
			if (e.keyCode === 13 && this.value.trim() !== "") {
				todos.add(this.value, function(todo) {
					createTodo(todo);
					render();
				});
				this.value = "";
			}
		});

		self.get("toggle-all").on("click", function(e) {
			var completed = false;
			var span = $(this).find('span');
			if (span.hasClass('glyphicon-check')) {
				completed = true;
			}
			todos.checkAll(completed, init);
		});

		self.get("clear-completed").on("click", function() {
			todos.removeCompleted(init);
		});
		
		todos.init(function(todos) {
			init(todos);
		});

	};

	self.awake = function() {
		var filter = self.param("filter");
		if (filter) {
			todos.setFilter(filter);

			var $footer = self.get("footer");
			$(".selected", $footer).removeClass("selected");
			$("a[href='#;filter=" + filter + "']", $footer).addClass("selected");

			var uis = self.ui("todo-list");
			for (var i = 0; i < uis.length; i++) {
				uis[i].render();
			}
		}
	};

	function render() {
		var count = todos.count();
		self.inflate({
			completed: "Clear completed (" + count.completed + ")",
			remaining: {
				count: count.remaining,
				text: "item" + (count.remaining !== 1 ? "s " : " ") + "left"
			},
			hasTodos: (count.total !== 0),
			hasRemainings: (count.completed > 0),
			noRemainingTodos: (count.remaining === 0)
		});
		self.get("toggle-all").find('span').toggleClass("glyphicon-check", count.remaining !== 0).toggleClass("glyphicon-unchecked", count.remaining === 0);
	}

}, iris.path.screen.welcome.js);
