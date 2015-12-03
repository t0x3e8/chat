/* global app */

app.shell = (function() {
	'use strict';
	
	var configMap = {
		mainHtml : 	String() + 
					'<div class="logging">Log in</div>' +
					'<div class="people"></div>' +
					'<div class="chat"></div>'
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
			'usersModel' : app.model.users
		});
		app.people.initModule(jQueryMap.$people);
		
		app.chat.configModule({
			'usersModel' : app.model.users
		});
		app.chat.initModule(jQueryMap.$chat);
	};
		
	return {
		initModule: initModule
	};	
}());