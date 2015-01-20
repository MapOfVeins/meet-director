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
            lifters: {
                // TODO test data
                all: [],
                male: [],
                female: []
            },
            flights: [{
                name: 'flight1',
                lifters: [{
                    name: 'test lifter',
                    age: 28,
                    gender: 'male',
                    weightClass: '120kg',
                    weightNum: 121,
                    squat: 212.5,
                    bench: 147.5,
                    deadlift: 220,
                    attempts: {
                        squat: [100],
                        bench: [75],
                        deadlift: [120]
                    },
                    results: {
                        squat: [null, null, null],
                        bench: [null, null, null],
                        deadlift: [null, null, null]
                    }
                },
                {
                    name: 'test lifter2',
                    age: 28,
                    gender: 'male',
                    weightClass: '90kg',
                    weightNum: 90,
                    squat: 212.5,
                    bench: 147.5,
                    deadlift: 220,
                    attempts: {
                        squat: [120],
                        bench: [50],
                        deadlift: [175]
                    },
                    results: {
                        squat: [1, 1, 1],
                        bench: [1, 1, 1],
                        deadlift: [1, 1, 1]
                    }

                }]
            }]
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

        $scope.currentStage = PARTIALS_PATH + 'meet.html';

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
                weightNum = parseInt($scope.currentLifter.weightClass.slice(0, -2), 10);
            }

            // convert openers to ints as well, for sorting purposes
            $scope.currentLifter.squat = parseInt($scope.currentLifter.squat, 10);
            $scope.currentLifter.bench = parseInt($scope.currentLifter.bench, 10);
            $scope.currentLifter.deadlift = parseInt($scope.currentLifter.deadlift, 10);

            $scope.currentLifter.weight = weightNum;
            $scope.meet.lifters.all.push($scope.currentLifter);

            // Also add the lifter to the gender specific list
            if ($scope.currentLifter.gender === 'male') {
                $scope.meet.lifters.male.push($scope.currentLifter);
            } else {
                $scope.meet.lifters.female.push($scope.currentLifter);
            }

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
            $scope.meet.lifters.all.splice($scope.meet.lifters.indexOf(lifter), 1);

            if (lifter.gender === 'male') {
                $scope.meet.lifters.male.splice($scope.meet.lifters.male.indexOf(lifter), 1);
            } else {
                $scope.meet.lifters.female.splice($scope.meet.lifters.female.indexOf(lifter), 1);
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
            if ($scope.meet.lifters.all.length > 0) {
                $scope.meet.flights.male = $scope.createFlights($scope.meet.lifters.male);
                $scope.meet.flights.female = $scope.createFlights($scope.meet.lifters.female);

                $scope.currentStage = PARTIALS_PATH + 'meet.html';
            } else {
                // TODO: better notification
                window.alert('You cant create a meet with no lifters!');
            }
        };
    }]);
})();
