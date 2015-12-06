
app.model = (function() {
	'use strict';
	
	var people, communication;
	var initModule;
	
	initModule = function() {
		people = app.model.people;
		people.initModule();
	};
	
	return {
		'initModule': initModule,
		'people': people,
		'communication': communication
	};
}());