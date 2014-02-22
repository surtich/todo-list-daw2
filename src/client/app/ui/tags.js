iris.ui(function (self) {

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
        for (var id in todos) {
            var todo = todos[id];
            if (todo.tags) {
                todo.tags.split(',').forEach(function(tag) {
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
        self.destroyUIs('tags');
        for (var tag in tags) {
          self.ui('tags', iris.path.ui.tag.js, {tag: tags[tag]});
        }
    };


}, iris.path.ui.tags.js);
