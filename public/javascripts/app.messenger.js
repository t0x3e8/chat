/* global app */

app.messenger = (function () {
    'use strict';

    var observers = [],
        subscribe, notify;

    subscribe = function (data) {
        console.log('subscribe: ' + data['eventName']);
        observers.push({ 'eventName': data['eventName'], 'action': data['action'] });
    };

    notify = function (eventName, data) {
        console.log('notify: ' + eventName);
        observers.forEach(function (subscriber) {
            if (subscriber.eventName === eventName) {
                subscriber.action(data);
            }
        })
    }

    return {
        'subscribe': subscribe,
        'notify': notify
    }

})();
