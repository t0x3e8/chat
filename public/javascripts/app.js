/* global app*/

var app = (function() {
	'use strict';
	
	var initModule = function($container) {
		app.model.initModule();
		app.shell.initModule($container);
	};
	
	return {
		'initModule' : initModule
	};
}());