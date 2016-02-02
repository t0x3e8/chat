/* global app */

app.chat = (function() {
	'use strict';
	
	var configMap = {
			mainHtml : String() + 
				'<div class="bar"><span class="bar-header"></span></div>' +
				'<div class="chat-content"></div>' + 
				'<div class="chat-interaction">' +
					'<div class="chat-input">' + 
						'<input type="text"></input>' +
					'</div>' +
					'<div class="chat-send">' + 
						'<input type="submit"></input>' + 
					'</div>' + 
				'</div>',
			peopleModel : null,
            chattee: null
		},
		jQueryMap = {
            $header : null,
			$container: null, 
			$sendBtn: null,
			$chatInput : null
		},
		initModule, configModule, setjQueryMap;
		
    setjQueryMap = function($container) {
        jQueryMap.$container = $container;
		jQueryMap.$header = $container.find('.bar-header');
		jQueryMap.$sendBtn = $container.find('.chat-send input');
		jQueryMap.$chatInput = $container.find('.chat-input input');
    }    
        
	initModule = function($container) {
		setjQueryMap($container);
		
		jQueryMap.$container.html(configMap.mainHtml);
        jQueryMap.$header.html('CHAT with ' + configMap.chattee.name);
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