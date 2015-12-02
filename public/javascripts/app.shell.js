/* global app */

app.shell = (function() {
	'use strict';
	
	var configMap = {
		mainHtml : 	String() + 
					'<div class="logging">Log in</div>' +
					'<div class="chat"></div>'
		},
		jQueryMap ={
			$container : null,
			$logging : null,
			$chat : null
		},
		initModule;
	
	initModule = function($container) {
		jQueryMap.$container = $container;		
		jQueryMap.$container.html(configMap.mainHtml);
				
		jQueryMap.$logging = $container.children('.logging');
		jQueryMap.$chat = $container.find('.chat');
		
		app.chat.configModule({
			'usersModel' : app.model.users
		});
		app.chat.initModule(jQueryMap.$chat);
	};
		
	return {
		initModule: initModule
	};	
}());