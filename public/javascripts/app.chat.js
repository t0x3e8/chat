

app.chat = (function() {
	'use strict';
	
	var configMap = {
			mainHtml : String() + 
				'<div class="bar"><span class="bar-header">CHAT</span></div>' +
				'<div class="chat-content"></div>' + 
				'<div class="chat-interaction">' +
					'<div class="chat-input">' + 
						'<input type="text"></input>' +
					'</div>' +
					'<div class="chat-send">' + 
						'<input type="submit"></input>' + 
					'</div>' + 
				'</div>',
			peopleModel : null
		},
		jQueryMap = {
			$container: null, 
			$sendBtn: null,
			$chatInput : null
		},
		initModule, configModule;
		
	initModule = function($container) {
		jQueryMap.$container = $container;
		jQueryMap.$sendBtn = $container.find('.chat-send input');
		jQueryMap.$chatInput = $container.find('.chat-input input');
		
		jQueryMap.$container.html(configMap.mainHtml);
	};

	configModule = function(inputMap) {
		app.utils.configureModule({
			input: inputMap,
			output: configMap
		});
	};
		
	return {
		'initModule' : initModule,
		'configModule' : configModule
	};	
})();