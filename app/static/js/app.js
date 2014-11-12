(function () {
    'use strict';
    var APP = 'MeetDirector';
    angular.module(APP + '.controllers', []);
    angular.module(APP + '.services', []);
    angular.module(APP + '.directives', []);

    angular.module(APP, [
        APP + '.controllers',
        APP + '.services',
        APP + '.directives'
    ]);
})();
