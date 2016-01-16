/* global app */

// Shell object API
// app.shell
// ===========================
// Properties and Methods
// * mainHtml - defines the HTML view for shell,
// * peopleModel - represents people model object,
// * jQueryMap - a map of jQuery elements representing UI areas,
// * setjQueryMap() - helper method to initialize jQueryMap,
// * setEvents() - helper method which subscribe to view events,
// * raiseLoginEvent() - function which is raised when user is trying to log-in or log-out,
// * initModule() - initialize the module,

app.shell = (function () {
    'use strict';

    var peopleModel = null,
        mainHtml = String() +
            '<div class="logging"><span>LOG IN</span></div>' +
            '<div class="people box"></div>' +
            '<div class="chat box"></div>',
        jQueryMap = {
            $container: null,
            $logging: null,
            $chat: null,
            $people: null
        },
        raiseLoginEvent, setjQueryMap, setEvents,
        initModule;

    setjQueryMap = function ($container) {
        jQueryMap.$logging = $container.children('.logging');
        jQueryMap.$chat = $container.find('.chat');
        jQueryMap.$people = $container.find('.people');
    };

    setEvents = function () {
        jQueryMap.$logging.on('click', raiseLoginEvent);
    };

    raiseLoginEvent = function (event) {
        var userMap, userName;

        while (!userName) {
            userName = prompt('What is your name?');
            if (userName === null) return;

            userName = userName.trim();
        }

        userMap = peopleModel.createUser({ name: userName });

        peopleModel.login(userMap, function () {
            jQueryMap.$logging.hide(300);                
        });
    }

    initModule = function ($container) {
        jQueryMap.$container = $container;
        jQueryMap.$container.html(mainHtml);
        setjQueryMap($container);

        app.model.initModule();
        peopleModel = app.model.people;

        app.people.configModule({
            'peopleModel': peopleModel
        });
        app.people.initModule(jQueryMap.$people);

        app.chat.configModule({
            'peopleModel': peopleModel
        });
        app.chat.initModule(jQueryMap.$chat);

        setEvents();
    };

    return {
        initModule: initModule
    };
} ());