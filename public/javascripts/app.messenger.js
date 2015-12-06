/* global app */

app.messenger = (function() {
	'use strict';
	
	var observers = [],
		subscribe, notify;
		
		subscribe = function(data) {
			console.log('subscribe: ' + data['eventName']);
			observers.push(data['eventName'], data['action']);	
		};
		
		notify = function(eventName) {
			console.log('notify: ' + eventName);
			observers.forEach(function(subscriber) {
				if(subscriber.eventName === eventName) {
					subscriber.action();
				}
			})
		}
		
		return {
			'subscribe' :subscribe,
			'notify': notify
		}
	
})();
