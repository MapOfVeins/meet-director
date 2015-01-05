(function () {
    'use strict';
    var APP = angular.module('MeetDirector.controllers'),
        PARTIALS_PATH = '/static/js/partials/';

    APP.controller('CreateMeetCtrl', ['$scope', function($scope) {

        $scope.meet = {
            title: '',
            fed: '',
            director: '',
            startDate: '',
            lifters: []
        };

        $scope.currentLifter = {};
        $scope.weightClasses = [];
        $scope.femaleWeightClasses = [
            '43kg',
            '47kg',
            '52kg',
            '57kg',
            '63kg',
            '72kg',
            '84kg',
            '84kg+'
        ];
        $scope.maleWeightClasses = [
            '53kg',
            '59kg',
            '66kg',
            '74kg',
            '83kg',
            '93kg',
            '105kg',
            '120kg',
            '120kg+'
        ];

        $scope.currentStage = PARTIALS_PATH + 'initMeet.html';

        $scope.setCurrentStage = function(stage) {
            $scope.currentStage = stage;
        };

        $scope.addNewLifter = function() {
            var weightNum,
                weightSubString;

            if ($scope.currentLifter.weightClass.indexOf('+') > -1) {
                // Set weightNum to a dummy value greater than all
                // weight classes. This number is just for sorting.
                weightNum = 121;
            } else {
                // convert weight class to int and add a seperate obj key
                weightNum = parseInt($scope.currentLifter.weightClass.slice(0, -2));
            }

            $scope.currentLifter.weight = weightNum;
            $scope.meet.lifters.push($scope.currentLifter);
            $scope.currentLifter = {};
        };

        $scope.switchWeightClasses = function () {
            if ($scope.currentLifter.gender === 'male') {
                $scope.weightClasses = $scope.maleWeightClasses;
            } else {
                $scope.weightClasses = $scope.femaleWeightClasses;
            }
        };

        $scope.returnToInit = function() {
            $scope.currentStage = PARTIALS_PATH + 'initMeet.html';
        };

        $scope.removeLifter = function(lifter) {
            $scope.meet.lifters.splice($scope.meet.lifters.indexOf(lifter), 1);
        };

        $scope.createFlights = function() {
            var numFlights,
                flightSize = 12,
                numLifters = $scope.meet.lifters.length;

            // sort our lifter array by weight class
            $scope.meet.lifters.sort($scope.compareLiftersByWeight);

            // split the array into flights (max 12 per flight)

            // order the flights by opening squats

        };

        $scope.compareLiftersByWeight = function(lifterOne, lifterTwo) {
            if (lifterOne.weight < lifterTwo.weight) {
                return -1;
            }
            if (lifterOne.weight > lifterTwo.weight) {
                return 1;
            }
            return 0;
        };

        $scope.compareFlightsByOpener = function(lifterOne, lifterTwo) {
            if (lifterOne.squat < lifterTwo.squat) {
                return -1;
            }
            if (lifterOne.squat > lifterTwo.squat) {
                return 1;
            }
            return 0;
        };

        $scope.createMeet = function() {
            if ($scope.meet.lifters.length > 0) {
                $scope.createFlights();
                $scope.currentStage = PARTIALS_PATH + 'meet.html';
            } else {
                // TODO: better notification
                window.alert('You cant create a meet with no lifters!');
            }
        };

    }]);
})();
