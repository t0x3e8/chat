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
        initModule, configModule, populatePeople, setjQueryMap;

    setjQueryMap = function ($container) {
        jQueryMap.$peopleList = $container.find('.people-content');
    };

    populatePeople = function (data) {
        var i, currentUserId, $newElement, personSelectedCallback;
        console.log('people list: ' + data);

        // clean list
        jQueryMap.$peopleList.empty();
        
        // populate list
        if (data) {
            currentUserId = configMap.peopleModel.getCurrentUser()._id;
                    
            personSelectedCallback = function (person) {
                return function () {
                    app.messenger.notify('chat-startchat', person);
                }
            }

            for (i = 0; i < data.length; i++) {
                $newElement = $('<p>').html(data[i].name);

                if (data[i]._id === currentUserId)
                    $newElement.addClass('me');
                else {
                    $newElement.on('dblclick', personSelectedCallback(data[i]));
                }
                jQueryMap.$peopleList.append($newElement);
            }
        }
    };

    initModule = function ($container) {
        jQueryMap.$container = $container;
        $container.append(mainHtml);

        setjQueryMap($container);

        populatePeople();

        app.messenger.subscribe({
            'eventName': 'peopleUpdated',
            'action': populatePeople
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
        'configModule': configModule
    };
})();