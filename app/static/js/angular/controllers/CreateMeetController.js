(function () {
    'use strict';
    var APP = angular.module('MeetDirector.controllers'),
        PARTIALS_PATH = '/static/js/angular/partials/',
        MAX_ROUNDS = 3;

    APP.controller('CreateMeetCtrl', [
        '$scope',
        'meetService',
    function (
        $scope,
        meetService
    ) {

        $scope.meetState = meetService;
        $scope.lifters = $scope.meetState.lifters;
        $scope.flights = $scope.meetState.flights;
        $scope.weightClassObj = $scope.meetState.weightClasses;

        $scope.weightClasses = [];

        $scope.currentLifter = {
            attempts: {
                squat: [],
                bench: [],
                deadlift: []
            },
            rackHeights: {
                squat: 0,
                bench: 0
            },
            results: {
                squat: [],
                bench: [],
                deadlift: []
            }
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
                weightNum = parseInt($scope.currentLifter.weightClass.slice(0, -2), 10);
            }

            // convert openers to ints as well, for sorting purposes
            $scope.currentLifter.attempts.squat[0] = parseInt($scope.currentLifter.attempts.squat[0], 10);
            $scope.currentLifter.attempts.bench[0] = parseInt($scope.currentLifter.attempts.bench[0], 10);
            $scope.currentLifter.attempts.deadlift[0] = parseInt($scope.currentLifter.attempts.deadlift[0], 10);

            for (var i = 0; i < MAX_ROUNDS; i++) {
                $scope.currentLifter.results.squat[i] = null;
                $scope.currentLifter.results.bench[i] = null;
                $scope.currentLifter.results.deadlift[i] = null;
            };

            $scope.currentLifter.weight = weightNum;
            $scope.lifters.all.push($scope.currentLifter);

            // Also add the lifter to the gender specific list
            if ($scope.currentLifter.gender === 'male') {
                $scope.lifters.male.push($scope.currentLifter);
            } else {
                $scope.lifters.female.push($scope.currentLifter);
            }

            $scope.currentLifter = {
                attempts: {
                    squat: [],
                    bench: [],
                    deadlift: []
                },
                rackHeights: {
                    squat: 0,
                    bench: 0
                },
                results: {
                    squat: [],
                    bench: [],
                    deadlift: []
                }
            };
        };

        $scope.switchWeightClasses = function () {
            if ($scope.currentLifter.gender === 'male') {
                $scope.weightClasses = $scope.weightClassObj.male.classic;
            } else {
                $scope.weightClasses = $scope.weightClassObj.female.classic;
            }
        };

        $scope.removeLifter = function(lifter) {
            $scope.lifters.all.splice($scope.lifters.all.indexOf(lifter), 1);

            if (lifter.gender === 'male') {
                $scope.lifters.male.splice($scope.lifters.male.indexOf(lifter), 1);
            } else {
                $scope.lifters.female.splice($scope.lifters.female.indexOf(lifter), 1);
            }
        };

        $scope.createFlights = function(lifters) {
            var numFlights,
                flightSize = 12,
                numLifters = lifters.length,
                flights = [],
                i = 0;

            // sort our lifter array by weight class
            lifters.sort($scope.compareLiftersByWeight);

            // calculate number of flights
            numFlights = Math.ceil(numLifters / flightSize);

            // split the array into flights (max 12 per flight)
            while (i < numLifters) {
                var size = Math.ceil((numLifters - i) / numFlights--);
                flights.push(lifters.slice(i, i + size));
                i += size;
            }

            // order the flights by opening squats
            flights.forEach(function(flight) {
                flight.sort($scope.compareLiftersByOpener);
            });

            return flights;
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

        $scope.compareLiftersByOpener = function(lifterOne, lifterTwo) {
            if (lifterOne.squat < lifterTwo.squat) {
                return -1;
            }
            if (lifterOne.squat > lifterTwo.squat) {
                return 1;
            }
            return 0;
        };

        $scope.createMeet = function() {
            if ($scope.lifters.all.length > 0) {
                $scope.flights.male = $scope.createFlights($scope.lifters.male);
                $scope.flights.female = $scope.createFlights($scope.lifters.female);

                $scope.currentStage = PARTIALS_PATH + 'meet.html';
            } else {
                // TODO: better notification
                window.alert('You cant create a meet with no lifters!');
            }
        };
    }]);
})();
