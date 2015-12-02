

app.chat = (function() {
	'use strict';
	
	var configMap = {
			mainHtml : String() + 
				'<div class="chat-bar"></div>' +
				'<div class="chat-content"></div>' + 
				'<div class="chat-interaction">' +
					'<div class="chat-input">' + 
						'<input type="text"></input>' +
					'</div>' +
					'<div class="chat-send">' + 
						'<input type="submit"></input>' + 
					'</div>' + 
				'</div>',
			usersModel : null
		},
		jQueryMap = {
			$chat: null, 
			$sendBtn: null,
			$chatInput : null
		},
		initModule, configModule;
		
	initModule = function($chat) {
		jQueryMap.$chat = $chat;
		jQueryMap.$sendBtn = $chat.find('.chat-send input');
		jQueryMap.$chatInput = $chat.find('.chat-input input');
		console.log('chat: ' + jQueryMap.$chat);
		jQueryMap.$chat.html(configMap.mainHtml);
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