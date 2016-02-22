/* global app */

// People object represents the view and logic behind people list. 
// ===========================
// Properties and Methods
// * mainHtml - representes HTML for the people list
// * configMap - consists of peopleModel is which is being configured while initialization
// * jQueryMap - a map of jQuery elements representing UI areas,
// * setjQueryMap() - helper method to initialize jQueryMap,
// * initModule() - initialize the module,
// * configModule() - configure the module,
// * populatePeople() - populate People list with the data received from server

app.people = (function () {
    'use strict';

    var mainHtml = String() +
        '<div class="bar"><span class="bar-header">PEOPLE</span></div>' +
        '<div class="people-content"></div>',
        configMap = {
            peopleModel: null
        },
        jQueryMap = {
            $container: null,
            $peopleList: null
        },
        peopleCollection = [],
        initModule, configModule, setPeopleCollection, visualizePeopleList, setjQueryMap, setNotification, resetNotifications;

    setjQueryMap = function ($container) {
        jQueryMap.$peopleList = $container.find('.people-content');
    };

    setPeopleCollection = function (data) {
        peopleCollection = [];

        data.forEach(function (personData) {
            peopleCollection.push({ name: personData.name, msgCount: 0, data: personData });
        });
    }

    visualizePeopleList = function () {
        var currentUserId, $personElement, $msgNotificationElement, $personName, personSelectedCallback;

        jQueryMap.$peopleList.empty();

        if (peopleCollection) {
            currentUserId = configMap.peopleModel.getCurrentUser()._id;

            personSelectedCallback = function (person) {
                return function () {
                    app.messenger.notify('chat-startchat', person);
                }
            }

            peopleCollection.forEach(function (person) {
                $personElement = $('<div>');
                $personName = $('<span>').addClass('name').html(person.name);
                $msgNotificationElement = $('<span>').addClass('msg-number');
                $personElement.append($personName);

                if (person.data._id === currentUserId)
                    $personName.addClass('me');
                else {
                    $personElement.on('dblclick', personSelectedCallback(person.data));
                    if (person.msgCount > 0) {
                        $msgNotificationElement.html(person.msgCount);
                        $personElement.append($msgNotificationElement);
                    }
                }
                jQueryMap.$peopleList.append($personElement);
            });
        }
    };

    setNotification = function (personId) {
        peopleCollection.forEach(function (person) {
            if (person.data._id === personId)
                person.msgCount += 1;
        });

        visualizePeopleList();
    };

    resetNotifications = function (personId) {
        peopleCollection.forEach(function (person) {
            if (person.data._id === personId)
                person.msgCount = 0;;
        });

        visualizePeopleList();
    };

    initModule = function ($container) {
        jQueryMap.$container = $container;
        $container.append(mainHtml);

        setjQueryMap($container);

        app.messenger.subscribe({
            'eventName': 'peopleUpdated',
            'action': function (data) {
                setPeopleCollection(data);
                visualizePeopleList();
            }
        });
        app.messenger.subscribe({
            'eventName': 'setNotificationForPerson',
            'action': setNotification
        });
        app.messenger.subscribe({
            'eventName': 'resetNotificationForPerson',
            'action': resetNotifications
        });
    };

    configModule = function (inputMap) {
        app.utils.configureModule({
            'input': inputMap,
            'output': configMap
        })
    };

    return {
        'initModule': initModule,
        'configModule': configModule,
        'setNotification': setNotification,
        'resetNotifications': resetNotifications
    };
})();