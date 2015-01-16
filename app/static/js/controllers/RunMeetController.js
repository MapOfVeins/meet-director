(function () {
    'use strict';
    var APP = angular.module('MeetDirector.controllers'),
        PARTIALS_PATH = '/static/js/partials/';

    APP.controller('RunMeetCtrl', ['$scope', function($scope) {

        $scope.currentFlight = 0;
        $scope.lifting = $scope.meet.flights.male[0];

        $scope.goToPrevFlight = function () {

        };

        $scope.goToNextFlight = function () {

        };

        $scope.goToNextLift = function () {

        };

        $scope.goToPrevLift = function () {

        };

        $scope.switchTab = function (tab) {

        };

        $scope.noLift = function () {

        };

        $scope.goodLift = function () {

        };

    }]);
})();

