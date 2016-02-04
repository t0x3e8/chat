
app.model = (function() {
	'use strict';
	
	var people, chat;
	var initModule;
	
	initModule = function() {
		people = app.model.people;
		people.initModule();
	};
	
	return {
		'initModule': initModule,
		'people': people,
		'chat': chat
	};
}());