iris.ui(function(self) {

  self.settings({
    tag: null,
	max: 1,
	min: 1
  });

  self.create = function() {
    self.tmplMode(self.APPEND);
    self.tmpl(iris.path.ui.tag.html);
    self.get('link').attr('href', '#;filter=tag:' + self.setting('tag').tag);
    self.render();
  };

  self.render = function() {
    self.inflate(self.setting('tag'));
	var em = 0.75 + (2 - 0.75) * ( self.setting('tag').count - self.setting('min') ) / ( self.setting('max') - self.setting('min') );
	var hue = 360 - 320 * ( self.setting('tag').count - self.setting('min') ) / ( self.setting('max') - self.setting('min') );
	self.get('tag').css({'font-size': em + 'em', color: 'hsl(' + hue + ', 50%, 50%)'});
  };


}, iris.path.ui.tag.js);
