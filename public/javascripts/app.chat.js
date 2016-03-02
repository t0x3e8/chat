/* global app */

app.chat = function () {
    'use strict';

    var configMap = {
        mainHtml: String() +
        '<div class="bar"><span class="bar-header"></span>' +
        '<span class="chat-close"><button class="chat-close-button">X</button></span>' +
        '</div>' +
        '<ul class="chat-content"></ul>' +
        '<div class="chat-interaction">' +
        '<div class="chat-input"><input type="text"></input></div>' +
        '<div class="chat-send"><input type="submit" value="Send"></input></div>' +
        '</div>',
        connection: null,
        chattee: null,
        me: null,
        closeChatCallback: null
    },
        jQueryMap = {
            $header: null,
            $container: null,
            $sendBtn: null,
            $chatInput: null,
            $msgs: null,
            $chatCloseBtn: null
        },
        initModule, configModule, setjQueryMap, setEvents, sendMessageEvent, sendMessageKeyEvent, closeChatEvent, newMsg,
        getChateeId, displayMsg, blinks, addZero, disconnect;

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

    sendMessageKeyEvent = function (event) {
        console.log('key pressed: ' + event);
        if (event.which === 13)
            sendMessageEvent();
    }

    closeChatEvent = function () {
        if (configMap.closeChatCallback) {
            configMap.closeChatCallback(configMap.chattee._id);
        }
    };

    getChateeId = function () {
        if (configMap.chattee)
            return configMap.chattee._id;
        else
            null;
    };

    newMsg = function (msg) {
        displayMsg(msg, false);
    };

    addZero = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

    displayMsg = function (msg, isMe) {
        var cssMsgClass = 'chat-msg' + ((isMe) ? '' : ' chat-msg-right'),
            cssMsgTextClass = 'chat-msg-text' + ((isMe) ? '' : ' chat-msg-text-rigth'),
            cssMsgTimeClass = 'chat-msg-time',
            dateNow = new Date(),
            timeString,
            msgTimeSpan, msgSpan, msgListItem;

        timeString = addZero(dateNow.getHours()) + ':' + addZero(dateNow.getMinutes());
        msgSpan = $('<span />').text(msg).addClass(cssMsgTextClass);
        msgTimeSpan = $('<span />').text(timeString).addClass(cssMsgTimeClass);
        msgListItem = $('<li />').addClass(cssMsgClass);

        // should it be time+msg or msg+time?
        if (isMe)
            $(msgListItem).append(msgTimeSpan).append(msgSpan);
        else
            $(msgListItem).append(msgSpan).append(msgTimeSpan);
        
        // add msg list item to html list
        $(msgListItem).appendTo(jQueryMap.$msgs);
        
        // animate to last item
        console.log($(jQueryMap.$msgs).height());
        $(jQueryMap.$msgs).animate({ scrollTop: $(jQueryMap.$msgs)[0].scrollHeight }, { queue: false });
    };

    blinks = function () {
        $(jQueryMap.$header).animate({ opacity: 0 }, 200, "linear", function () {
            $(this).animate({ opacity: 1 }, 200);
        });
    };

    disconnect = function () {
        $(jQueryMap.$chatInput).val('User not available');

        $(jQueryMap.$sendBtn).prop('disabled', true);
        $(jQueryMap.$chatInput).prop('disabled', true);
    };

    setjQueryMap = function ($container) {
        jQueryMap.$container = $container;
        jQueryMap.$header = $container.find('.bar-header');
        jQueryMap.$sendBtn = $container.find('.chat-send input');
        jQueryMap.$chatInput = $container.find('.chat-input input');
        jQueryMap.$msgs = $container.find('.chat-content');
        jQueryMap.$chatCloseBtn = $container.find('.chat-close-button');
    };

    setEvents = function () {
        jQueryMap.$sendBtn.on('click', sendMessageEvent);
        jQueryMap.$chatCloseBtn.on('click', closeChatEvent);
        $(jQueryMap.$chatInput).keypress(sendMessageKeyEvent);
    };

    initModule = function ($container) {
        $container.html(configMap.mainHtml);
        setjQueryMap($container);

        jQueryMap.$header.text('CHAT with ' + configMap.chattee.name);
        console.log(jQueryMap.$header);

        setEvents();

        // activate the chat
        $(jQueryMap.$chatInput).focus();
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
        'newMsg': newMsg,
        'getChateeId': getChateeId,
        'blinks': blinks,
        'disconnect': disconnect
    };
}