(function() {
	function TodoUI(text, parent) {
		var that = this;
		var todo = TODO_APP.addTodo(text);

		var li = document.createElement("li");

		var div = document.createElement("div");
		div.className = 'view';

		var check = document.createElement("input");
		check.type = 'checkbox';
		check.className = 'toggle';
		check.onclick = function() {
			todo.setChecked(!todo.getChecked());
			that.render();
			that.parent.render();
		};
		div.appendChild(check);


		var text = document.createElement("input");
		text.type = 'text';
		text.value = todo.getText();
		text.className = "edit";

		text.onkeyup = function(event) {
			if (event.keyCode === 13) {
				that.modTodo();
			} else if (event.keyCode === 27) {
				that.render();
			}
		};

		text.addEventListener('blur', function() {
			if (li.className === 'editing') {
				that.modTodo();
			}
		});

		var label = document.createElement("label");
		label.innerHTML = todo.getText();
		label.ondblclick = function(event) {
			text.value = todo.getText();
			li.className = 'editing';
			text.focus();
			return false;
		};
		div.appendChild(label);

		var button = document.createElement("button");
		button.className = 'destroy';
		button.onclick = function() {
			TODO_APP.delTodo(todo.getId());
			parent.delTodoUI(that);
		};

		div.appendChild(button);

		li.appendChild(div);
		li.appendChild(text);

		this.todo = todo;
		this.container = li;
		this.checker = check;
		this.parent = parent;

		this.render();

		this.modTodo = function() {
			TODO_APP.modTodo(this.todo.getId(), text.value);
			label.innerHTML = text.value;
			this.render();
		};
	}

	TodoUI.prototype.render = function() {
		if (this.todo.isVisible()) {
			this.container.style.display = '';
		} else {
			this.container.style.display = 'none';
		}
		if (this.todo.getChecked()) {
			this.container.className = 'completed';
			this.checker.checked = true;
		} else {
			this.container.className = 'view';
			this.checker.checked = false;
		}
	};

	TODO_APP.TodoUI = TodoUI;

})();

