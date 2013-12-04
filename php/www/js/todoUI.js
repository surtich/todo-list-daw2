(function(root) {

	if (!root.TODO_APP) {
		root.TODO_APP = {};
	}

	function TodoUI(todo, parent) {
		var that = this;

		var li = document.createElement("li");

		var div = document.createElement("div");
		div.className = 'view row';


		var divCheck = document.createElement("div");
		divCheck.className = 'col-md-1';

		var check = document.createElement("input");
		check.type = 'checkbox';
		check.className = 'toggle';
		check.onclick = function() {
			root.TODO_APP.checkTodo(todo.getId(), !todo.getChecked());
			that.render();
			that.parent.checkTodoUI(that);
		};
		divCheck.appendChild(check);    
    div.appendChild(divCheck);

    var text = document.createElement("input");
		text.type = 'text';
		text.value = todo.getText();
		text.className = "edit form-control";

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

    
    var divLabel = document.createElement("div");
    divLabel.className = 'col-md-10';
		
		var label = document.createElement("label");
		label.innerHTML = todo.getPurifiedText();
		label.ondblclick = function(event) {
			text.value = todo.getText();
			li.className = 'editing';
			text.focus();
			return false;
		};
    divLabel.appendChild(label);
		div.appendChild(divLabel);
    
    var divButton = document.createElement("div");
		divButton.className = 'col-md-1';

		var button = document.createElement("button");
		button.className = 'destroy';
		button.onclick = function() {
			delTodo();
		};
    divButton.appendChild(button);
    div.appendChild(divButton);

		li.appendChild(div);
		li.appendChild(text);

		this.todo = todo;
		this.container = li;
		this.checker = check;
		this.parent = parent;

		this.render();

		this.modTodo = function() {
			var task = text.value.trim();
			if (task !== '') {
				root.TODO_APP.modTodo(this.todo.getId(), task);
				label.innerHTML = this.todo.getPurifiedText();
				that.render();
			} else {
				delTodo();
			}
			this.parent.modTodoUI();
		};
		
		function delTodo() {
			li.className = 'deleted';
			root.TODO_APP.delTodo(that.todo.getId());
			parent.delTodoUI(that);
		}
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
			var regExp = /^@@([^@]+)@@/;
			var match = this.todo.getText().match(regExp);

			if (match) {
				this.container.className = match[1];
			} else {
				this.container.className = 'view';
				this.checker.checked = false;
			}
		}
	};

	root.TODO_APP.TodoUI = TodoUI;

})(this);
