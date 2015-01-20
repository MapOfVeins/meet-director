(function () {
    'use strict';
    var APP = angular.module('MeetDirector.controllers'),
        PARTIALS_PATH = '/static/js/partials/';

    APP.controller('RunMeetCtrl', ['$scope', function($scope) {
        $scope.currentTab = 'squat';
        $scope.liftRound = 0;
        $scope.lifterRound = 0;
        $scope.flightRound = 0;

        $scope.currentFlight = $scope.meet.flights[0];
        $scope.lifting = $scope.currentFlight.lifters[$scope.lifterRound];

        $scope.currentLift = {
            name: $scope.currentTab.charAt(0).toUpperCase() + $scope.currentTab.slice(1),
            liftInKg: $scope.lifting.attempts[$scope.currentTab][$scope.liftRound],
            liftInLb: Math.round($scope.lifting.attempts[$scope.currentTab][$scope.liftRound] * 2.2)
        };

        $scope.goToNextLifter = function () {
            $scope.lifterRound = ($scope.lifterRound + 1) % $scope.currentFlight.lifters.length;
            $scope.lifting = $scope.currentFlight.lifters[$scope.lifterRound];
            $scope.setCurrentLift();
        };

        $scope.goToPrevLifter = function () {
            if ($scope.lifterRound === 0) {
                $scope.lifterRound = $scope.currentFlight.lifters.length - 1;
            } else {
                $scope.lifterRound = ($scope.lifterRound - 1) % $scope.currentFlight.lifters.length;
            }

            $scope.lifting = $scope.currentFlight.lifters[$scope.lifterRound];
            $scope.setCurrentLift();
        };

        $scope.switchTab = function (tab) {
            $scope.currentTab = tab;
            $scope.setCurrentLift();
        };

        $scope.setCurrentLift = function () {
           $scope.currentLift = {
                name: $scope.currentTab.charAt(0).toUpperCase() + $scope.currentTab.slice(1),
                liftInKg: $scope.lifting.attempts[$scope.currentTab][$scope.liftRound],
                liftInLb: Math.round($scope.lifting.attempts[$scope.currentTab][$scope.liftRound] * 2.2)
           };
        }

        $scope.noLift = function () {

        };

        $scope.goodLift = function () {

        };

        $scope.nextRound = function () {
            $scope.liftRound = ($scope.liftRound + 1) % 3;
            $scope.setCurrentLift();
        };

        $scope.prevRound = function () {
            if ($scope.liftRound === 0) {
                $scope.liftRound = 2;
            } else {
                $scope.liftRound = ($scope.liftRound - 1) % 3;
            }
            $scope.setCurrentLift();
        };

    }]);
})();

