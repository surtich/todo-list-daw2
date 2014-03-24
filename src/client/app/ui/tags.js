iris.ui(function(self) {

	var todosResource = iris.resource(iris.path.resource.todo);

	self.create = function() {
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.tags.html);
		self.render();
		self.on('update', self.render);
	};


	self.render = function() {
		var tags = {};
		var todos = todosResource.getTodos();
		var total = 0;
		for (var id in todos) {
			var todo = todos[id];
			if (todo.tags) {
				todo.tags.split(',').forEach(function(tag) {
					total++;
					if (tags[tag]) {
						tags[tag].count++;
					} else {
						tags[tag] = {
							count: 1,
							tag: tag
						};
					}
				});
			}
		}
		
		var max = 1;
		var min = total;
		var arrayTags = [];
		for (var tag in tags) {
			if (tags[tag].count > max) {
				max = tags[tag].count;
			}
			if (tags[tag].count < min) {
				min = tags[tag].count;
			}
			arrayTags.push(tags[tag]);
		}
		


		self.destroyUIs('tags');
		arrayTags.sort(function(tagA, tagB) {
			return tagB.count - tagA.count;
		}).forEach(function(tag) {
			self.ui('tags', iris.path.ui.tag.js, {tag: tag, max: max, min: min});
		});

		var filter = todosResource.getFilter();
		var $tags = self.get("tags");

		if (filter.indexOf('tag:') === 0) {
			var tag =$("a[href='#;filter=" + filter + "']", $tags);
			tag.addClass("selected")
		}
	};


}, iris.path.ui.tags.js);
