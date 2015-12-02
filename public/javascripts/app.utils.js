
app.utils = (function() {
	'use strict';
	
	var configureModule = function(moduleConfig) {
		var input = moduleConfig.input,
			output = moduleConfig.output,
			keyName;
	
		for(keyName in input) {
			if(output.hasOwnProperty(keyName)) {
				output[keyName] = input[keyName];
			}	
		}		
	};
	
	return { 
		'configureModule' : configureModule
	}
	
})();