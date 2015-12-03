/* global app */

app.people = (function() {
	'use strict';
	
	var configMap = {
			mainHtml: String() +
						'<div class="people-bar">PEOPLE</div>' +
						'<div class="people-content"></div>',
			peopleModel: null
		},
		jQueryMap = {
			$container: null
		},
		initModule, configModule;
		
		initModule = function($container) { 
			jQueryMap.$container = $container;
			$container.append(configMap.mainHtml);			
		}
		
		configModule = function(inputMap) {
			app.utils.configureModule({
				'input': inputMap,
				'output':configMap
			})
		}
		
		return {
			'initModule': initModule,
			'configModule': configModule
		}
})();