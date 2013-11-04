window.onload = function() {
    render();
    
    document.getElementById('new-todo').onkeypress = function(event) {
        if (event.keyCode === 13) {
            addTodo(event.target.value);
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
        console.log(window.location.hash)
    }
    
    
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
    li.appendChild(text);

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
}