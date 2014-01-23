iris.ui(function (self) {

	self.settings({
		id : null,
		onUpdate: null
	});

	var todos = iris.resource(iris.path.resource.todo);

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.todo.html);

		self.get("check").on("click", function () {
			todos.toggle(self.setting("id"), function() {
				self.render();
				if (self.setting("onUpdate")) {
					self.setting("onUpdate")();
				}
			});
		});

		self.get("destroy").on("click", function () {
			todos.remove(self.setting("id"), function() {
				self.destroyUI();
				if (self.setting("onUpdate")) {
					self.setting("onUpdate")();
				}
			});
		});

		self.get().on("dblclick", function () {
			self.get().addClass("editing");
			self.get("text").select();
		});

		self.get("text").on("blur change", function (e) {
			if ( !self.get().hasClass("editing") ) {
				return;	
			} 

			self.get().removeClass("editing");
			if ( this.value.trim() !== "" ) {
				todos.edit(self.setting("id"), this.value, function() {
					self.render();
				});
			}
		}).on("keyup", function(e) {
			if (e.keyCode === 27) {
				self.get().removeClass("editing");
				self.render();
			}
		});

		self.render();
	};

	self.render = function () {
		var todo = todos.getTodo(self.setting("id"));
		self.get().toggleClass("completed", todo.completed);
		self.get('check-span').toggleClass("glyphicon-check", todo.completed).toggleClass("glyphicon-unchecked", !todo.completed);
		self.inflate({todo: todo});
		return self;
	};

	self.show = function () {
		var todo = todos.getTodo(self.setting("id"));
		if (todo.visible) {
			self.get().hide().fadeIn("slow");
		}
		return self;
	};

},iris.path.ui.todo.js);
