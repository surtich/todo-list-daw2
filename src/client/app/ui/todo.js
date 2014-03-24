iris.ui(function(self) {

	self.settings({
		id: null,
		onUpdate: null
	});

	var todos = iris.resource(iris.path.resource.todo);

	self.create = function() {

		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.todo.html);

		self.get("check").on("click", function() {
			todos.toggle(self.setting("id"), function() {
				self.render();
				if (self.setting("onUpdate")) {
					self.setting("onUpdate")();
				}
			});
		});

		self.get("destroy").on("click", function() {
			todos.remove(self.setting("id"), function() {
				self.destroyUI();
				if (self.setting("onUpdate")) {
					self.setting("onUpdate")();
				}
			});
		});

		self.get('todo-label').on("dblclick", function() {
			self.get().addClass("editing editing-text");
			self.get("text").select();
		});

		self.get('todo-tags').on("dblclick", function() {
			self.get().addClass("editing editing-tags");
			self.get("tags").select();
		});

		self.get("text").add(self.get("tags")).on("blur change", function(e) {
			if (!self.get().hasClass("editing")) {
				return;
			}

			if (self.get("text").val().trim() !== "") {
				todos.edit(self.setting("id"), self.get("text").val(), self.get("tags").val(), function(err, data) {
					if (!err) {
						self.get().removeClass("editing editing-text editing-tags");
						self.render();
					} else if (e.type === 'blur') {
						self.get().removeClass("editing editing-text editing-tags");
						self.render();
					}
				});
			}
		}).on("keyup", function(e) {
			if (e.keyCode === 27) {
				self.get().removeClass("editing editing-text editing-tags");
				self.render();
			}
		});

		self.render();
	};

	self.render = function() {
		var todo = todos.getTodo(self.setting("id"));
		self.get().toggleClass("completed", todo.completed);
		self.get('check-span').toggleClass("glyphicon-check", todo.completed).toggleClass("glyphicon-unchecked", !todo.completed);
		self.get('todo-tags').text(todo.tags || 'NO TAGS');
		self.inflate({
			todo: todo
		});
		return self;
	};

	self.show = function() {
		var todo = todos.getTodo(self.setting("id"));
		if (todo.visible) {
			self.get().hide().fadeIn("slow");
		}
		return self;
	};

}, iris.path.ui.todo.js);
