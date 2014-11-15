(function () {
    'use strict';
    var APP = angular.module('MeetDirector.controllers'),
        PARTIALS_PATH = '/static/js/partials/';

    APP.controller('CreateMeetCtrl', ['$scope', function($scope) {

        $scope.meet = {
            title: '',
            fed: '',
            director: '',
            startDate: ''
        };

        $scope.currentStage = PARTIALS_PATH + 'initMeet.html';

        $scope.setCurrentStage = function(stage) {
            $scope.currentStage = stage;
        };

    }]);
})();
