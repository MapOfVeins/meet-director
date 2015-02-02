(function () {
    'use strict';
    var APP = angular.module('MeetDirector.controllers'),
        PARTIALS_PATH = '/static/js/partials/',
        MAX_ROUNDS = 3,
        LBS_CONVERSION = 2.2046,
        BAR_WEIGHT = 20,
        COLLAR_WEIGHT = 5;

    APP.controller('RunMeetCtrl', [
        '$scope',
        'meetService',
    function (
        $scope,
        meetService
    ) {
        $scope.meetState = meetService;
        $scope.flights = $scope.meetState.flights;
        $scope.lifters = $scope.meetState.lifters;

        $scope.init = function () {
            $scope.currentTab = 'squat';
            $scope.liftRound = 0;
            $scope.lifterRound = 0;
            $scope.flightRound = 0;

            $scope.currentFlight = $scope.flights[0];
            $scope.lifting = $scope.currentFlight.lifters[$scope.lifterRound];
            $scope.setCurrentLift();
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
                liftInLb: Math.round($scope.lifting.attempts[$scope.currentTab][$scope.liftRound] * LBS_CONVERSION),
                completed: $scope.lifting.results[$scope.currentTab][$scope.liftRound] !== null,
                plates: []
           };

           $scope.setLiftDisplay();
        }

        $scope.setLiftDisplay = function () {
            var collar,
                plate,
                workingWeight = ($scope.currentLift.liftInKg - BAR_WEIGHT - COLLAR_WEIGHT) / 2;

            plate = $scope.calculatePlateNumber(25, workingWeight);
            workingWeight = plate.remaining;
            $scope.insertPlatesIntoLiftDisplay(plate, '_25kg-plate');

            plate = $scope.calculatePlateNumber(20, workingWeight);
            workingWeight = plate.remaining;
            $scope.insertPlatesIntoLiftDisplay(plate, '_20kg-plate');

            plate = $scope.calculatePlateNumber(15, workingWeight);
            workingWeight = plate.remaining;
            $scope.insertPlatesIntoLiftDisplay(plate, '_15kg-plate');

            plate = $scope.calculatePlateNumber(10, workingWeight);
            workingWeight = plate.remaining;
            $scope.insertPlatesIntoLiftDisplay(plate, '_10kg-plate');

            plate = $scope.calculatePlateNumber(5, workingWeight);
            workingWeight = plate.remaining;
            $scope.insertPlatesIntoLiftDisplay(plate, '_5kg-plate');

            plate = $scope.calculatePlateNumber(2.5, workingWeight);
            workingWeight = plate.remaining;
            $scope.insertPlatesIntoLiftDisplay(plate, '_2-5kg-plate');

            plate = $scope.calculatePlateNumber(1, workingWeight);
            workingWeight = plate.remaining;
            $scope.insertPlatesIntoLiftDisplay(plate, '_1kg-plate');

            plate = $scope.calculatePlateNumber(0.5, workingWeight);
            workingWeight = plate.remaining;
            $scope.insertPlatesIntoLiftDisplay(plate, '_0-5kg-plate');

            collar = {
                plateClass: 'collar',
                weight: 5
            };

            $scope.currentLift.plates.push(collar);
        };

        $scope.insertPlatesIntoLiftDisplay = function (plates, plateClass) {
            var plateToInsert;

            for (var i = 0; i < plates.numPlates; i++) {
                plateToInsert = {
                    plateClass: plateClass,
                    weight: plates.weight
                };
                $scope.currentLift.plates.push(plateToInsert);
            };
        };

        $scope.calculatePlateNumber = function (plateWeight, remainingWeight) {
            var num;

            num = Math.floor(remainingWeight / plateWeight);
            remainingWeight -= (plateWeight * num);

            return {
                numPlates: num,
                remaining: remainingWeight,
                weight: plateWeight
            };
        };

        $scope.recordLift = function (result) {
            // Record the attempt
            $scope.lifting.results[$scope.currentTab][$scope.liftRound] = result;

            // Move to next lifter
            $scope.lifterRound = ($scope.lifterRound + 1) % $scope.currentFlight.lifters.length;
            if ($scope.lifterRound === 0) {
                $scope.liftRound = ($scope.liftRound + 1) % MAX_ROUNDS;
            }
            $scope.lifting = $scope.currentFlight.lifters[$scope.lifterRound];

            $scope.setCurrentLift();
        };

        $scope.gotoRound = function (round) {
            $scope.liftRound = round - 1;
            $scope.setCurrentLift();
        };

        $scope.undoLift = function () {
            $scope.lifting.results[$scope.currentTab][$scope.liftRound] = null;
            $scope.setCurrentLift();
        };

        $scope.init();
    }]);
})();

