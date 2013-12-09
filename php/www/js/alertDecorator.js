(function(root) {

	if (!root.TODO_APP) {
		root.TODO_APP = {};
	}

	function alertDecorator(config, params, result) {
		var alerts = config[0];
		var alert = $('<div>').html(config[1]).addClass('alert ' + config[2]).fadeOut(4000, function() {
      debugger
      $(this).remove();
    });
		alerts.insertBefore(alert[0], alerts.children[0]);
	}

	window.addEventListener('load', function() {
		var alerts = document.getElementById('alerts');

		//root.TODO_APP.addTodo = root.TODO_APP.addDecorator(root.TODO_APP.addTodo, alertDecorator, alerts, "Todo Added");

		root.TODO_APP.decoreFunctions(
				[
					'addTodo', 'delTodo', 'modTodo', 'checkTodo', 'checkAll', 'delChecked'
				], {post: alertDecorator},
				[
					[alerts, 'Todo added', 'alert-info'],
					[alerts, 'Todo deleted', 'alert-warning'],
					[alerts, 'Todo updated', 'alert-info'],
					[alerts, 'Todo checked/unchecked', 'alert-success'],
					[alerts, 'All todos have changed their state', 'alert-success'],
					[alerts, 'All todos have been deleted', 'alert-danger']
				]);
	});

})(this);
