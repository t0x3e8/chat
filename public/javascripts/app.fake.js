/// <reference path="../javascripts/app.js" />

/* global app */

app.fake = (function () {
	'use strict';
	
	var getPeople;

	getPeople = function () {
		var data;
		
		data = [
			{
				'id': '1',
				'name': 'Antoś'
			},
			{
				'id': '2',
				'name': 'Filip'
			},
			{
				'id': '3',
				'name': 'Aga'
			},
			{
				'id': '4',
				'name': 'Jarosław'
			}
		];
		
		return data;
	}
	
	return {
		'getPeople' : getPeople
	}
})();