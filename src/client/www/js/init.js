window.onload = function() {
    render();

    document.getElementById('new-todo').onkeypress = function(event) {
        if (event.keyCode === 13) {
            addTodo(event.target.value);
            event.target.value = "";
        }
    };

    document.getElementById('clear-completed').onclick = function() {
        delChecked();
    };

    document.getElementById('check-all').onclick = function() {
        var state = TODO_APP.itemsLeft() > 0;
        checkAll(state);
    };

    window.onhashchange = function() {
        var pattern = "#/";
        var pos = window.location.hash.indexOf(pattern);
        var filter = window.location.hash.substring(pos + pattern.length);

        TODO_APP.filterTodos(filter);
        render();
    };


};


function addTodo(text) {
    var todo = TODO_APP.addTodo(text);

    var li = document.createElement("li");
    li.id = 'todo_' + todo.getId();

    var check = document.createElement("input");
    check.type = 'checkbox';
    check.onclick = function() {
        todo.setChecked(!todo.getChecked());
        render();
    };
    li.appendChild(check);

    var text = document.createElement("input");
    text.type = 'text';
    text.value = todo.getText();
    text.style.display = 'none';
    li.appendChild(text);
    text.onkeyup = function(event) {
        console.log(event.keyCode);
    };
    
    var span = document.createElement("span");    
    span.innerHTML = todo.getText();
    span.ondblclick = function() {
        text.style.display = 'inline';
        span.style.display = 'none';
    };
    li.appendChild(span);

    var button = document.createElement("input");
    button.type = 'button';
    button.onclick = function() {
        TODO_APP.delTodo(todo.getId());
        document.getElementById('todos').removeChild(li);
        render();
    };

    li.appendChild(button);

    document.getElementById('todos').appendChild(li);
    render();
}

function delChecked() {
    TODO_APP.delChecked();
    var todos = document.getElementById('todos');
    var i = todos.children.length - 1;
    for (; i >= 0; i--) {
        var li = todos.children[i];
        var check = li.children[0];
        if (check.checked) {
            todos.removeChild(li);
        }
    }
    render();
}


function checkAll(state) {
    TODO_APP.checkAll(state);
    var todos = document.getElementById('todos');
    var i = todos.children.length - 1;
    for (; i >= 0; i--) {
        var li = todos.children[i];
        var check = li.children[0];
        check.checked = state;
    }
    render();
}


function render() {
    var itemsLeft = document.getElementById('items-left');
    var clearCompleted = document.getElementById('clear-completed');

    if (TODO_APP.countTodos() > 0) {
        itemsLeft.style.display = 'block';
        itemsLeft.innerHTML = TODO_APP.itemsLeft() + " item" + (TODO_APP.itemsLeft() !== 1 ? "s" : "") + " left";
    } else {
        itemsLeft.style.display = 'none';
    }

    if (TODO_APP.countTodos() - TODO_APP.itemsLeft() > 0) {
        clearCompleted.style.display = 'block';
        clearCompleted.innerHTML = "Clear completed (" + (TODO_APP.countTodos() - TODO_APP.itemsLeft()) + ")";
    } else {
        clearCompleted.style.display = 'none';
    }

    var todos = document.getElementById('todos');
    var i = 0;
    for (; i < todos.children.length; i++) {
        var li = todos.children[i];
        var regExp = /^todo_([0-9]+)$/;
        var match = li.id.match(regExp);
        if (match && match.length > 0) {
            var id = match[1];
            var todo = TODO_APP.getTodo(id);
            if (todo) {
                if (todo.isVisible()) {
                    li.style.display = 'block';
                } else {
                    li.style.display = 'none';
                }
            }
        }


    }


}