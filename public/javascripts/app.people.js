/* global app */

app.people = (function() {
	'use strict';
	
	var configMap = {
			mainHtml: String() +
						'<div class="bar"><span class="bar-header">PEOPLE</span></div>' +
						'<div class="people-content"></div>',
			peopleModel: null
		},
		jQueryMap = {
			$container: null,
			$peopleList:null
		},
		initModule, configModule, setPeople, setjQueryMap;
		
		setjQueryMap = function($container) {
			jQueryMap.$peopleList = $container.find('.people-content');
		}
		
		setPeople = function() {
			var peopleDB = configMap.peopleModel.db();
			
			// clean list
			jQueryMap.$peopleList.empty();
			// populate list
			peopleDB.each(function(person) {
				jQueryMap.$peopleList.append('<p>' + person.name + '</p>');
			});
		}
		
		initModule = function($container) { 
			jQueryMap.$container = $container;
			$container.append(configMap.mainHtml);
			
			setjQueryMap($container);
			
			setPeople();
			app.messenger.subscribe({
				'eventName' : 'peopleUpdated',
				'action': setPeople
			});
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