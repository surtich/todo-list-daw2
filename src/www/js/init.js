$(window.document).ready(

    function () {
		// set the iris components base uri
		iris.baseUri("../app/");

		// show the initial screen
        iris.welcome(iris.path.screen.welcome.js);
    }
);
