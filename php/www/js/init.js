(function() {

  var parent = {
    delTodoUI: delTodoUI,
    checkTodoUI: checkTodoUI,
    modTodoUI: modTodoUI
  };

  var todosUI = [];

  $(document).ready(function() {
    loadLocalStorage();
    applyFilter();

    $('#new-todo').keypress(function(event) {
      var text = event.target.value.trim();
      if (event.keyCode === 13 && text !== "") {
        var todo = TODO_APP.addTodo(text);
        addTodoUI(todo);
        event.target.value = "";
        render(false);
      }
    });

    $('#clear-completed').click(function() {
      delChecked();
    });

    $('#toggle-all').click(function() {
      var state = TODO_APP.itemsLeft() > 0;
      checkAll(state);
    });

    $('#undo').click(function(e) {
      TODO_APP.load(TODO_APP.undo());
      init();
      e.preventDefault();
    });

    $('#redo').click(function(e) {
      TODO_APP.load(TODO_APP.redo());
      init();
      e.preventDefault();
    });

    $('#sort-asc').click(function(e) {
      e.preventDefault();
      if (this.parentNode.className === 'disabled') {
        return;
      }
      init(true);
      this.parentNode.className = 'disabled';      
    });

    $('#sort-desc').click(function(e) {
      e.preventDefault();
      if (this.parentNode.className === 'disabled') {
        return;
      }
      init(true, true);
      this.parentNode.className = 'disabled';
    });

    $(window).bind('hashchange', applyFilter);
  });

  function addTodoUI(todo) {
    var todoUI = new TODO_APP.TodoUI(todo, parent);
    todosUI.push(todoUI);
    $('#todo-list').append(todoUI.container);
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
    var itemsLeft = $('#todo-count');
    var clearCompleted = $('#clear-completed');
    var mainSection = $('#main');
    var footer = $('#footer');

    $('#undo').prop('disabled', !TODO_APP.canUndo());
    $('#redo').prop('disabled', !TODO_APP.canRedo());

    if (TODO_APP.countTodos() < 2) {
      $('#sort-asc').parent()[0].className = 'disabled';
      document.getElementById('sort-desc').parentNode.className = 'disabled';
    } else {
      document.getElementById('sort-asc').parentNode.className = '';
      document.getElementById('sort-desc').parentNode.className = '';
    }

    if (TODO_APP.countTodos() > 0) {
      footer.css('display', '');
      mainSection.css('display', '');
      itemsLeft.html('<strong>' + TODO_APP.itemsLeft() + "</strong> item" + (TODO_APP.itemsLeft() !== 1 ? "s" : "") + " left");
    } else {
      mainSection.css('display', 'none');
      footer.css('display', 'none');
    }

    if (TODO_APP.countTodos() - TODO_APP.itemsLeft() > 0) {
      clearCompleted.css('display', '');
      clearCompleted.html("Clear completed (" + (TODO_APP.countTodos() - TODO_APP.itemsLeft()) + ")");
    } else {
      clearCompleted.css('display', 'none');
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