(function(root) {

	if (!root.TODO_APP) {
		root.TODO_APP = {};
	}

	function TodoUI(todo, parent) {
		var that = this;

		var li = $('<li class="list-group-item">');

		var div = $('<div class="row">');

		var divCheck = $('<div class="col-md-1">');

		var check = $('<button class="view btn btn-default">').click(function() {
      root.TODO_APP.checkTodo(todo.getId(), !todo.getChecked());
			that.render();
			that.parent.checkTodoUI(that);
    });
    
		divCheck.append(check);    
    div.append(divCheck);

    var text = $('<input type="text" class="edit form-control">').val(todo.getText()).keyup (function(event) {
			if (event.keyCode === 13) {
				that.modTodo();
			} else if (event.keyCode === 27) {
				that.render();
			}
		}).bind('blur', function() {
			if (li.hasClass('editing')) {
				that.modTodo();
			}
		});
    
    var divLabel = $('<div class="col-md-10">');
		
		var label = $('<label class="view">').html(todo.getPurifiedText()).dblclick( function(event) {
			text.value = todo.getText();
			li.addClass('editing').removeClass('view');
			text.focus();
			return false;
		}).appendTo(divLabel);
    
    divLabel.append(text);
		div.append(divLabel);
    
    var divButton = $('<div class="col-md-1">');

		var button = $('<button class="view btn btn-default">').html('<span class="glyphicon glyphicon-trash"></span>')
    .click(function() {
			delTodo();
		});
    divButton.append(button);
    div.append(divButton);
    
		li.append(div);
    
		this.todo = todo;
		this.container = li[0];
		this.checker = check[0];
		this.parent = parent;

		this.render();

		this.modTodo = function() {
			var task = text.val().trim();
			if (task !== '') {
				root.TODO_APP.modTodo(this.todo.getId(), task);
				label.html(this.todo.getPurifiedText());
				that.render();
			} else {
				delTodo();
			}
			this.parent.modTodoUI();
		};
		
		function delTodo() {
			li.toggleClass('deleted', false);
			root.TODO_APP.delTodo(that.todo.getId());
			parent.delTodoUI(that);
		}
	}

	TodoUI.prototype.render = function() {
		if (this.todo.isVisible()) {
			$(this.container).css('display', '');
		} else {
			$(this.container).css('display', 'none');
		}

		if (this.todo.getChecked()) {
			this.container.className = 'completed list-group-item';
			$(this.checker).html('<span class="glyphicon glyphicon-check"></span>');
		} else {
      $(this.checker).html('<span class="glyphicon glyphicon-unchecked"></span>');
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
