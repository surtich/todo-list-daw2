(function(root) {
	function addDecorator (fn, decorator) {
		var that = this;
		var decoratorArgs = Array.prototype.slice.call(arguments, 2); 
		return function() {
			var result = fn.apply(this, arguments);
			decorator.call(that, decoratorArgs, arguments, result);
			return result;
		};
	}
	
	function decoreFunctions(names, decorator, params) {
		names.forEach(function(name, i) {
			root.TODO_APP[name] = addDecorator.apply(root.TODO_APP, [].concat(root.TODO_APP[name], decorator, params[i]));
		});
	}
	
	if (!root.TODO_APP) {
		root.TODO_APP = {};
	}
	
	root.TODO_APP.addDecorator = addDecorator;
	root.TODO_APP.decoreFunctions = decoreFunctions;
	
})(this);

