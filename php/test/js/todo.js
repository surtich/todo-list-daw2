var that = this;

QUnit.testStart(function() {
	that.TODO_APP.reset();
	that.TODO_APP.addTodo("Go to the class");
	that.TODO_APP.addTodo("Go to the doctor");
});

test("addTodo Test", function() {
	var count = that.TODO_APP.countTodos();
	that.TODO_APP.addTodo("Do my homework");
	ok(that.TODO_APP.countTodos() === count + 1, "Ok");
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
	} catch (e) {
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

test("toJSON and load Test", function() {
	var todo2 = that.TODO_APP.addTodo("Study");
	var jsonTodos = that.TODO_APP.toJSON();
	ok(jsonTodos[0] !== undefined, "Ok");
	ok(jsonTodos[1] !== undefined, "Ok");
	ok(jsonTodos[1].text === "Go to the doctor", "Ok");
	ok(jsonTodos[2].text === "Study", "Ok");
	delete jsonTodos[1];
	that.TODO_APP.load(jsonTodos);
	ok(that.TODO_APP.getTodo(0) !== undefined, "Ok");
	ok(that.TODO_APP.getTodo(1) === undefined, "Ok");
	ok(that.TODO_APP.getTodo(2) !== undefined, "Ok");
	ok(that.TODO_APP.getTodo(2).getText() === "Study", "Ok");
	var todo3 = that.TODO_APP.addTodo("Make the exam");
	ok(todo3.getId() === 3, "Ok");
	that.TODO_APP.reset();
	var todo0 = that.TODO_APP.addTodo("Call my friend");
	ok(todo0.getId() === 0, "Ok");
});

asyncTest("Creation date test", function() {
	expect(1);
	var todo1 = that.TODO_APP.addTodo("Go to the class");

	setTimeout(function() {
		var todo2 = that.TODO_APP.addTodo("Go to the doctor");
		ok(todo2.getCreationDate().getTime() > todo1.getCreationDate().getTime(), "The creation date of the todo1 is previous to the creaation date of the todo2");
		start();
	}, 1);
});

asyncTest("Checked date test", function() {
	expect(2);
	var todo = that.TODO_APP.addTodo("Go to the class");

	setTimeout(function() {
		todo.setChecked(true);
		ok(todo.checkedDate().getTime() > todo.getCreationDate().getTime(), "ok");
		todo.setChecked(false);
		try {
			todo.checkedDate();
		} catch (e) {
			ok(true, "The checked date is older then de creation date");
			start();
		}
	}, 10);
});

asyncTest("Checked compareTo", function() {
	expect(8);
	var todo1 = that.TODO_APP.addTodo("Go to the class"); //old
	ok(that.TODO_APP.compareTo(todo1, todo1) === 0, "A todo is equal to itself");

	setTimeout(function() {
		var todo2 = that.TODO_APP.addTodo("Go to the doctor"); //new
		ok(that.TODO_APP.compareTo(todo1, todo2) > 0, "new todos are smaller than old ones");
		ok(that.TODO_APP.compareTo(todo2, todo1) < 0, "new todos are smaller than old ones");
		setTimeout(function() {
			todo2.setChecked(true);
			ok(that.TODO_APP.compareTo(todo1, todo2) < 0, "checked todos are greater than non checked todos");
			ok(that.TODO_APP.compareTo(todo2, todo1) > 0, "checked todos are greater than non checked todos");
			setTimeout(function() {
				todo1.setChecked(true);
				ok(that.TODO_APP.compareTo(todo1, todo2) > 0, "new checked todos are smaller than old todos");
				ok(that.TODO_APP.compareTo(todo2, todo1) < 0, "new checked todos are smaller than old todos");
				ok(that.TODO_APP.compareTo(todo1, todo1) === 0, "A checked todo is equal to itself");
				start();
			}, 10);
		}, 10);
	}, 10);
});


asyncTest("getSortedTodos test", function() {

	var numTodos = 100,
			numRandom = 20;

	that.TODO_APP.reset();

	expect(numTodos * 4);


	function addTodos(i, callback) {
		setTimeout(function() {
			if (i < numTodos) {
				that.TODO_APP.addTodo("Task " + i);
				addTodos(i + 1, callback);
			} else {
				callback();
			}
		}, 0);
	}

	function checkOrder(callback) {
		var todos = that.TODO_APP.getSortedTodos();
		ok(todos.length === that.TODO_APP.countTodos());
		for (var i = 0; i < todos.length - 1; i++) {
			ok(that.TODO_APP.compareTo(todos[i], todos[i + 1]) <= 0, 'For every true, it is true that todos[i] < todos[i+1]');
		}
		callback();
	}

	function checkAll(i, state, callback) {
		var todos = that.TODO_APP.getSortedTodos();
		setTimeout(function() {
			if (i < numTodos) {
				todos[i].setChecked(state);
				checkAll(i + 1, state, callback);
			} else {
				callback();
			}
		}, 0);
	}

	function checkAFew(i, state, callback) {
		var todos = that.TODO_APP.getSortedTodos();
		setTimeout(function() {
			if (i < numRandom) {
				var random = Math.floor(Math.random() * numTodos);
				todos[random].setChecked(state);
				checkAll(i + 1, state, callback);
			} else {
				callback();
			}
		}, 0);
	}

	function run() {
		addTodos(0, function() {
			checkOrder(function() {
				checkAll(0, true, function() {
					checkOrder(function() {
						checkAll(0, false, function() {
							checkOrder(function() {
								checkAFew(0, false, function() {
									checkOrder(function() {
										start();
									});
								});
							});
						});
					});
				});
			});
		});
	}

	run();


});
