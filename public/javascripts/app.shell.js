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

    var mainHtml = String() +
            '<div class="logging"><span>LOG IN</span></div>' +
            '<div class="people box"></div>' +
            '<div class="chat box box1 hidden"></div>' +
            '<div class="chat box box2 hidden"></div>' +
            '<div class="chat box box3 hidden"></div>',
        peopleModel = null,
        connection = null,
        jQueryMap = {
            $container: null,
            $logging: null,
            $chat1: null,
            $chat2: null,
            $chat3: null,
            $people: null
        },
        raiseLoginEvent, startNewChatEvent, newMsgEvent,
        setjQueryMap, setEvents, initModule, initChat;

    setjQueryMap = function ($container) {
        jQueryMap.$logging = $container.children('.logging');
        jQueryMap.$chat1 = $container.find('.box1');
        jQueryMap.$chat2 = $container.find('.box2');
        jQueryMap.$chat3 = $container.find('.box3');
        jQueryMap.$people = $container.find('.people');
    };

    setEvents = function () {
        jQueryMap.$logging.on('click', raiseLoginEvent);
        
        app.messenger.subscribe({ eventName: 'chat-startchat', action: startNewChatEvent })
        app.messenger.subscribe({ eventName: 'newMsg', action: newMsgEvent});
    };

    raiseLoginEvent = function (event) {
        /// TODO: disable clicking to avoid double logging
        
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

    startNewChatEvent = function (person) {
        jQueryMap.$chat1.show(300);
        initChat(jQueryMap.$chat1, person);
    }
    
    newMsgEvent = function(data) {
        if (app.chat)
            app.chat.newMsg(data.msg);
    }

    initChat = function ($chat, person) {
        app.chat.configModule({
            'connection': connection,
            'me' : peopleModel.getCurrentUser(),
            'chattee': person
        });
        app.chat.initModule($chat);
    }

    initModule = function ($container) {
        jQueryMap.$container = $container;
        jQueryMap.$container.html(mainHtml);
        setjQueryMap($container);

        app.model.initModule();
        peopleModel = app.model.people;
        connection = app.connection;
        
        app.people.configModule({
            'peopleModel': peopleModel
        });
        app.people.initModule(jQueryMap.$people);

        setEvents();
    };

    return {
        initModule: initModule
    };
} ());