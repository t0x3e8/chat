/* global app */

app.shell = (function() {
	'use strict';
	
	var configMap = {
		mainHtml : 	String() + 
					'<div class="logging"><span class="center">Log in</span></div>' +
					'<div class="people box"></div>' +
					'<div class="chat box"></div>'
		},
		jQueryMap ={
			$container : null,
			$logging : null,
			$chat : null,
			$people: null
		},
		initModule;
	
	initModule = function($container) {
		jQueryMap.$container = $container;		
		jQueryMap.$container.html(configMap.mainHtml);
				
		jQueryMap.$logging = $container.children('.logging');
		jQueryMap.$chat = $container.find('.chat');
		jQueryMap.$people = $container.find('.people');
		
		app.people.configModule({
			'peopleModel' : app.model.people
		});
		app.people.initModule(jQueryMap.$people);
		
		app.chat.configModule({
			'peopleModel' : app.model.people
		});
		app.chat.initModule(jQueryMap.$chat);
	};
		
	return {
		initModule: initModule
	};	
}());