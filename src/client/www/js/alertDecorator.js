(function(root) {

	if (!root.TODO_APP) {
		root.TODO_APP = {};
	}

	function alertDecorator(config, params, result) {
		var alerts = config[0];
		var alert = document.createElement("div");
		alert.innerHTML = config[1];
		alert.className = 'alert alert-visible ' + config[2];
		alerts.insertBefore(alert, alerts.children[0]);
		setTimeout (function () {
			alert.style.opacity = 0;
		}, 2000);
		setTimeout (function () {
			alerts.removeChild(alert);
		}, 4000);
	}

	window.addEventListener('load', function() {
		var alerts = document.getElementById('alerts');

		//root.TODO_APP.addTodo = root.TODO_APP.addDecorator(root.TODO_APP.addTodo, alertDecorator, alerts, "Todo Added");

		root.TODO_APP.decoreFunctions(
				[
					'addTodo', 'delTodo', 'modTodo', 'checkTodo', 'checkAll', 'delChecked'
				], alertDecorator,
				[
					[alerts, 'Todo added', 'alert-info'],
					[alerts, 'Todo deleted', 'alert-warning'],
					[alerts, 'Todo added', 'alert-info'],
					[alerts, 'Todo checked/unchecked', 'alert-success'],
					[alerts, 'All todos have changed their state', 'alert-success'],
					[alerts, 'All todos have been deleted', 'alert-danger'],
				]);
	});

})(this);

