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
            $people: null
        },
        chatSlots = [
            { chatInstance: null, $chat: null, chateeId: undefined },
            { chatInstance: null, $chat: null, chateeId: undefined },
            { chatInstance: null, $chat: null, chateeId: undefined }
        ],
        raiseLoginEvent, startNewChatEvent, newMsgEvent, peopleUpdateEvent,
        setjQueryMap, setEvents, initModule, openChat, closeChat, findChatWithChatee, findFreeChatSlot;

    setjQueryMap = function ($container) {
        jQueryMap.$logging = $container.children('.logging');
        chatSlots[0].$chat = $container.find('.box1');
        chatSlots[1].$chat = $container.find('.box2');
        chatSlots[2].$chat = $container.find('.box3');
        jQueryMap.$people = $container.find('.people');
    };

    setEvents = function () {
        jQueryMap.$logging.on('click', raiseLoginEvent);

        app.messenger.subscribe({ eventName: 'chat-startchat', action: startNewChatEvent });
        app.messenger.subscribe({ eventName: 'newMsg', action: newMsgEvent });
                app.messenger.subscribe({'eventName': 'peopleUpdated', 'action': peopleUpdateEvent});
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

    newMsgEvent = function (data) {
        var chateeId = data.fromId,
            msg = data.msg,
            chatSlot = null;

        chatSlot = findChatWithChatee(chateeId);
        console.log(chatSlot);
        if (chatSlot != undefined && chatSlot.chateeId !== undefined)
            chatSlot.chatInstance.newMsg(msg);
        else
            app.messenger.notify('setNotificationForPerson', chateeId);
    };
    
    peopleUpdateEvent = function (people) {
        // Go through all open chats and check if chatee is available
        chatSlots.forEach(function (chat) {
           var chatNotAvailable;
           chatNotAvailable = people.find(function (person) {
               return person._id === chat.chateeId;
           });
           
           if (chatNotAvailable!== null){
               chat.chatInstance.disconnect();
           }
        });
    };

    startNewChatEvent = function (person) {
        if (openChat(person) === true)
            app.messenger.notify('resetNotificationForPerson', person._id);
    };   

    openChat = function (person) {
        var chatSlot = findChatWithChatee(person._id);

        if (chatSlot === undefined) {
            chatSlot = findFreeChatSlot();

            if (chatSlot === undefined) {
                alert('Maximum 3 chats are available.');
                return false;
            }

            chatSlot.chateeId = person._id;
            chatSlot.$chat.show(300);
            chatSlot.chatInstance = app.chat();
            chatSlot.chatInstance.configModule({
                'connection': connection,
                'me': peopleModel.getCurrentUser(),
                'chattee': person,
                'closeChatCallback': closeChat
            });
            chatSlot.chatInstance.initModule(chatSlot.$chat);
           
            return true;
        }
        else {
            chatSlot.chatInstance.blinks();
            return false;
        }
    };

    closeChat = function (chatteeId) {
        var chatSlot;

        chatSlot = findChatWithChatee(chatteeId);
        if (chatSlot) {
            chatSlot.$chat.empty();
            chatSlot.$chat.hide(300);
            chatSlot.chatInstance = undefined;
            chatSlot.chateeId = undefined;
        }
    };

    findChatWithChatee = function (chateeId) {
        return chatSlots.find(function (entry, index, array) {
            if (chateeId === entry.chateeId)
                return true;
        });
    };

    findFreeChatSlot = function () {
        return chatSlots.find(function (entry, index, array) {
            if (entry.chateeId === undefined)
                return true;
        });
    };

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