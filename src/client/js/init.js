$(window.document).ready(
		function() {

			$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
				$("#loading").loadingOverlay();
				jqXHR.always(function() {
					$("#loading").loadingOverlay('remove');
				});
			});
			
			// set the iris components base uri
			iris.baseUri("../app/");

			// show the initial screen
			iris.welcome(iris.path.screen.welcome.js);

			iris.on(iris.AFTER_NAVIGATION, function() {

			});
		}
);
