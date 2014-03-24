iris.screen(function(self) {

	var todos = iris.resource(iris.path.resource.todo);

	function createTodo(id) {
		return self.ui("todo-list", iris.path.ui.todo.js, {id: id, onUpdate: onUpdate});
	}

	function onUpdate() {
		render();
	}

	function init(todos) {
		var i = self.uis.length - 1;
		for (; i >= 0; i--) {
			self.uis[i].destroyUI();
		}
    
		for (var id in todos) {
			createTodo(id);
		}
        
        self.ui('tags', iris.path.ui.tags.js);
        
		render();
	}

	self.create = function() {
		self.tmpl(iris.path.screen.welcome.html);

		self.get("new-todo").on("keyup", function(e) {
			if (e.keyCode === 13 && this.value.trim() !== "") {
				todos.add(this.value, function(id) {
					createTodo(id).show();
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
			var $tags = self.get("tags");
			$(".selected", $footer).removeClass("selected");
			$(".selected", $tags).removeClass("selected");
			if (filter.indexOf('tag:') !== 0) {
				$("a[href='#;filter=" + filter + "']", $footer).addClass("selected");
			} else {
				$("a[href='#;filter=" + filter + "']", $tags).addClass("selected");
			}

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
