(function(root) {

	if (!root.TODO_APP) {
		root.TODO_APP = {};
	}

	function TodoUI(todo, parent) {
		var that = this;

		var li = document.createElement("li");
    li.className = 'list-group-item';

		var div = document.createElement("div");
		div.className = 'row';

		var divCheck = document.createElement("div");
		divCheck.className = 'col-md-1';

		var check = document.createElement("button");
		check.type = 'button';
		check.className = 'view btn btn-default';
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
			if (li.className === 'editing list-group-item') {
				that.modTodo();
			}
		});
    
    
    var divLabel = document.createElement("div");
    divLabel.className = 'col-md-10';
		
		var label = document.createElement("label");
		label.innerHTML = todo.getPurifiedText();
    label.className = 'view';
		label.ondblclick = function(event) {
			text.value = todo.getText();
			li.className = 'editing list-group-item';
			text.focus();
			return false;
		};
    divLabel.appendChild(label);
    divLabel.appendChild(text);
		div.appendChild(divLabel);
    
    var divButton = document.createElement("div");
		divButton.className = 'col-md-1';

		var button = document.createElement("button");
		button.className = 'view btn btn-default';
    button.innerHTML = '<span class="glyphicon glyphicon-trash"></span>';
		button.onclick = function() {
			delTodo();
		};
    divButton.appendChild(button);
    div.appendChild(divButton);

		li.appendChild(div);

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
			li.className = 'deleted list-group-item';
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
			this.container.className = 'completed  list-group-item';
			this.checker.innerHTML = '<span class="glyphicon glyphicon-check"></span>';
		} else {
      this.checker.innerHTML = '<span class="glyphicon glyphicon-unchecked"></span>';
			var regExp = /^@@([^@]+)@@/;
			var match = this.todo.getText().match(regExp);

			if (match) {
				this.container.className = match[1] + " list-group-item";
			} else {
				this.container.className = 'view list-group-item';
			}
		}
	};

	root.TODO_APP.TodoUI = TodoUI;

})(this);
