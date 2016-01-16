/* global app, TAFFY, $ */

// People object API
// app.model.people
// ===========================
// Properties and Methods
// * userPrototype -provide prototype for each user.
// * currentUser - current user for the session,
// * createUser() - method creates user based on input. 
// * login() - sends request ('spa-login') for login of current user (shell) to the server. It will raise onLogin callback.
// * logout() - semds request ('spa-logout') for logout of current user to the server. It will raise onLogout callback.
// * initModule() - initialize the module,
// 
// User object
// ==========================
// id - number, if 0 then not stored on server else server id,
// name - string, name of the user,
// isOnline - bool, status if the user is online or not,
// isAnonymous() - check if user is anonymous


app.model.people = (function () {
    'use strict';

    var createUser, login, logout, initModule,
        userPrototype, currentUser = {}, getCurrentUser;

    userPrototype = {
        isAnonymous: function () {
            return this.id === 0;
        }
    };

    createUser = function (userMap) {
        var newUser = Object.create(userPrototype);
        newUser.id = (userMap.id !== undefined) ? userMap.id : 0;
        newUser.name = (userMap.name !== undefined) ? userMap.name : '';

        return newUser;
    };
    
    getCurrentUser = function() {
        return currentUser;
    }

    login = function (userMap, callback) {
        console.log('Login: ' + userMap);
        
        app.connection.emitLogin(userMap, function(res) {
            if (res.succeded === true)
                currentUser = res.user;
            
            callback();
        });                
    };

    logout = function () {

    };

    initModule = function () {
        currentUser = createUser({ name: 'Anonymous' });
    };

    return {
        'login': login,
        'logout': logout,
        'initModule': initModule,
        'createUser': createUser,
        'getCurrentUser' : getCurrentUser
    };
})();