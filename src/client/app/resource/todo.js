iris.resource(function(self) {

  var todos = {},
          currentFilter = "all";

  self.getTodos = function() {
    return todos;
  };

  self.reset = function() {
    todos = {};
  };

  self.init = function(callback) {
    console.log("Reading todos from server... ");
    self.reset();
    return self.get("todos").done(function(data) {
      console.log("Todos retrieved");
      for (f = 0, F = data.todos.length; f < F; f++) {
        todo = data.todos[f];
        todos[todo._id] = todo;
      }
      callback(todos);
    });
  };


  self.add = function(text, callback) {
    console.log("Adding a todo");
    return self.post("todo", {text: text}).done(function(data) {
      console.log("Todo retrieved");
      var todo = data.todo;
      todos[todo._id] = todo;
      callback(todo._id);
    });
  };

  self.getTodo = function(id) {
    var todo = todos[id];
    var tagFilter = currentFilter.match(/^tag:(.+)/);
    if (!tagFilter) {
      todo.visible = currentFilter === "all" ||
              (todo.completed && currentFilter === "completed") ||
              (!todo.completed && currentFilter === "active");
    } else {
      
      if (todo.tags && todo.tags.split(',').indexOf(tagFilter[1]) !== -1) {
        todo.visible = true;
      } else {
        todo.visible = false;
      };
    }


    return $.extend({}, todo);
  };

  self.remove = function(id, callback) {
    console.log("Deleting a todo");
    return self.del("todo/" + id).done(function(data) {
      console.log("Todo deleted");
      delete todos[id];
      callback(data);
      self.notify('update');
    });
  };

  self.toggle = function(id, callback) {
    var todo = todos[id];
    todo.completed = !todo.completed;
    console.log("(un)checking a todo");
    return self.put("todo/" + id + "/check/" + todo.completed).done(function(data) {
      console.log("Todo (un)checked");
      todos[id] = data.todo;
      callback(todo);
    });
  };

  self.removeCompleted = function(callback) {
    console.log("Removing completed");
    return self.del("todos/checked").done(function(data) {
      console.log("Completed Todos deleted");
      self.init(callback);
      self.notify('update');
    });
  };

  self.checkAll = function(completed, callback) {
    console.log("(un)checking all todos");
    return self.put("todos/check/" + completed).done(function(data) {
      console.log("All todos (un)checked");
      self.init(callback);
      self.notify('update');
    });
  };

  self.edit = function(id, text, tags, callback) {
    var todo = todos[id];
    console.log("Modifing a todo");
    return self.put("todo/" + id, {text: text, tags: tags}).done(function(data) {
      console.log("Todo modified");
      todos[id] = data.todo;
      callback(todo);
      self.notify('update');
    });
  };

  self.setFilter = function(filter) {
    console.log("Set filter = " + filter);
    currentFilter = filter;
  };

  self.count = function() {
    var remaining = 0;

    var total = 0;

    for (var id in todos) {
      total++;
      if (!todos[id].completed) {
        remaining++;
      }
    }
    return {remaining: remaining, total: total, completed: total - remaining};
  };


}, iris.path.resource.todo);
