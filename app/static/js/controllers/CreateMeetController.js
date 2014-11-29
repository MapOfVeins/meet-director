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
            $scope.meet.lifters.push($scope.currentLifter);
            $scope.currentLifter = {};
        };

        $scope.switchWeightClasses = function () {
            console.log($scope.currentLifter);
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

    }]);
})();
