iris.ui(function(self) {

  self.settings({
    tag: null
  });

  self.create = function() {
    self.tmplMode(self.APPEND);
    self.tmpl(iris.path.ui.tag.html);
    self.get('link').attr('href', '#;filter=tag:' + self.setting('tag').tag);
    self.render();
  };

  self.render = function() {
    self.inflate(self.setting('tag'));
  };


}, iris.path.ui.tag.js);
