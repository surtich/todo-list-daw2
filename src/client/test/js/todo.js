var that = this;

QUnit.testStart(function() {
  that.TODO_APP.reset();
  var todo1 = that.TODO_APP.addTodo("Go to the class");
  var todo2 = that.TODO_APP.addTodo("Go to the doctor");
});

test("addTodo Test", function() {
  var count = that.TODO_APP.countTodos();
  that.TODO_APP.addTodo("Do my homework");
  ok(that.TODO_APP.countTodos() === count + 1 , "Ok");
});

test("getTodo Test", function() {
  var todo1 = that.TODO_APP.addTodo("Go to the cinema");
  var todo2 = that.TODO_APP.getTodo(todo1.getId());
  var count = that.TODO_APP.countTodos();
  ok(todo1 === todo2, "Ok");
  ok(that.TODO_APP.getTodo(todo1.getId()), "Ok");
  ok(that.TODO_APP.getTodo(count - 1), "Ok");
});     

test("delTodo Test", function() {
  var todo1 = that.TODO_APP.addTodo("Go to the class");
  var todo2 = that.TODO_APP.getTodo(todo1.getId());
  ok(todo1 === todo2, "Ok");
  that.TODO_APP.delTodo(todo1.getId());
  var todo3 = that.TODO_APP.getTodo(todo1.getId());
  ok(!todo3, "Ok");
});

test("updateTodo Test", function() {
  var todo1 = that.TODO_APP.addTodo("Go to the class");
  ok(todo1.getText() === "Go to the class", "Ok");
  that.TODO_APP.modTodo(todo1.getId(), "Snap");
  ok(todo1.getText() === "Snap", "Ok");
});

test("checkTodo Test", function() {
  var todo1 = that.TODO_APP.addTodo("Go to the class");
  ok(todo1.getChecked() === false, "Ok");
  that.TODO_APP.checkTodo(todo1.getId(), true);
  ok(todo1.getChecked() === true, "Ok");
  try {
    that.TODO_APP.checkTodo(todo1.getId(), "gato");
    ok(false, "Ok");
  } catch(e) {
    ok(true, "Ok");
  }
  throws(function() {
    that.TODO_APP.checkTodo(todo1.getId(), "gato");
  }, "Ok");
});

test("checkAll Test", function() {
  var todo1 = that.TODO_APP.addTodo("Go to the class");
  var todo2 = that.TODO_APP.addTodo("Go to the doctor");
  ok(todo1.getChecked() === false, "Ok");
  ok(todo2.getChecked() === false, "Ok");
  that.TODO_APP.checkAll(true);
  ok(todo1.getChecked() === true, "Ok");
  ok(todo2.getChecked() === true, "Ok");
  that.TODO_APP.checkAll(false);
  ok(todo1.getChecked() === false, "Ok");
  ok(todo2.getChecked() === false, "Ok");
});

test("delChecked Test", function() {
  var todo1 = that.TODO_APP.addTodo("Go to the class");
  var todo2 = that.TODO_APP.addTodo("Go to the doctor");
  that.TODO_APP.checkTodo(todo1.getId(), true);
  that.TODO_APP.delChecked();
  equal(that.TODO_APP.getTodo(todo1.getId()), undefined, "Ok");
  equal(that.TODO_APP.getTodo(todo2.getId()), todo2, "Ok");
});

test("itemsLeft Test", function() {
  equal(that.TODO_APP.itemsLeft(), 2, "Ok");
  var todo = that.TODO_APP.getTodo(0);
  that.TODO_APP.checkTodo(todo.getId(), true);
  equal(that.TODO_APP.itemsLeft(), 1, "Ok");
});

test("filterTodos Test", function() {
  var todo = that.TODO_APP.getTodo(0);
  that.TODO_APP.filterTodos("all");
  ok(todo.isVisible(), "Ok");
  that.TODO_APP.filterTodos("completed");
  ok(!todo.isVisible(), "Ok");
  that.TODO_APP.filterTodos("active");
  ok(todo.isVisible(), "Ok");
  that.TODO_APP.checkTodo(todo.getId(), true);
  ok(!todo.isVisible(), "Ok");
  that.TODO_APP.filterTodos("completed");
  ok(todo.isVisible(), "Ok");
  that.TODO_APP.filterTodos("all");
  ok(todo.isVisible(), "Ok");
  that.TODO_APP.filterTodos("invalid filter");
  ok(todo.isVisible(), "Ok");
});