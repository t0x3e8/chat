/* global app */

app.chat = (function () {
    'use strict';

    var configMap = {
        mainHtml: String() +
        '<div class="bar"><span class="bar-header"></span></div>' +
        '<ul class="chat-content"></ul>' +
        '<div class="chat-interaction">' +
        '<div class="chat-input"><input type="text"></input></div>' +
        '<div class="chat-send"><input type="submit"></input></div>' +
        '</div>',
        connection: null,
        chattee: null,
        me: null
    },
        jQueryMap = {
            $header: null,
            $container: null,
            $sendBtn: null,
            $chatInput: null,
            $msgs: null
        },
        initModule, configModule, setjQueryMap, setEvents, sendMessageEvent, newMsg,
        displayMsg;

    sendMessageEvent = function () {
        var msg = '';

        msg = jQueryMap.$chatInput.val().trim();
        console.log('message to send: ' + msg);

        if (msg) {
            if (configMap.connection) {
                configMap.connection.emitMsg(msg, configMap.me._id, configMap.chattee._id);
                displayMsg(msg, true);
                
                jQueryMap.$chatInput.val('');
            }
        }
    };

    newMsg = function (msg) {
        displayMsg(msg, false);
    };

    displayMsg = function (msg, isMe) {
        var cssClass = 'chat-msg' + ((isMe) ? '' : ' chat-msg-right');
        
        $('<li/>', {
            'text': msg,
            'class': cssClass            
        }).appendTo(jQueryMap.$msgs);
    };

    setjQueryMap = function ($container) {
        jQueryMap.$container = $container;
        jQueryMap.$header = $container.find('.bar-header');
        jQueryMap.$sendBtn = $container.find('.chat-send input');
        jQueryMap.$chatInput = $container.find('.chat-input input');
        jQueryMap.$msgs = $container.find('.chat-content');
    };

    setEvents = function () {
        jQueryMap.$sendBtn.on('click', sendMessageEvent);
    };

    initModule = function ($container) {
        $container.html(configMap.mainHtml);
        setjQueryMap($container);

        jQueryMap.$header.text('CHAT with ' + configMap.chattee.name);
        console.log(jQueryMap.$header);

        setEvents();
    };

    configModule = function (inputMap) {
        app.utils.configureModule({
            input: inputMap,
            output: configMap
        });
    };

    return {
        'initModule': initModule,
        'configModule': configModule,
        'newMsg': newMsg
    };
})();