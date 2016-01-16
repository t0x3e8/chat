
var app = (function() {
	'use strict';
	
	var initModule = function($container) {
		app.shell.initModule($container);
	};
	
	return {
		'initModule' : initModule
	};
}());