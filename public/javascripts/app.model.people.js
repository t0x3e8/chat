/* global app, TAFFY, $ */

app.model.people = (function() {
	'use strict';
	
	var configMap = {
			db : TAFFY([])
		},
		initModule, login, logout,
		setDB;
	
	setDB = function() {
		// this is fake data
		var i, people;
		
		people = app.fake.getPeople();
		for (i=0; i < people.length; i++) {
			configMap.db.insert(people[i]);
		}
		
		app.messenger.notify('app:peopleUpdated');
	}
	
	initModule = function() {
		setDB();
	}
	
	login = function() {
		
	}
	
	logout = function() {
		
	}
	
	return {
		'initModule': initModule,
		'login': login,
		'logout': logout,
		'db' : configMap.db
	};
}());