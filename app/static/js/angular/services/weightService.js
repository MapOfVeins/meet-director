(function () {
    'use strict';
    var APP = angular.module('MeetDirector.services'),
        BAR_WEIGHT = 20,
        COLLAR_WEIGHT = 5,
        AVAILABLE_PLATES = [
            25,
            20,
            15,
            10,
            5,
            2.5,
            1,
            0.5
        ],
        AVAILABLE_CLASSES = [
            '_25kg-plate',
            '_20kg-plate',
            '_15kg-plate',
            '_10kg-plate',
            '_5kg-plate',
            '_2-5kg-plate',
            '_1kg-plate',
            '_0-5kg-plate'
        ],
        COLLAR = {
            plateClass: 'collar',
            weight: 5
        };

    APP.service('weightService', [ function() {
        var _getWorkingWeight,
            _getNumPlates,
            _updatePlateDisplay;

        _getWorkingWeight = function (liftInKg) {
            return (liftInKg - BAR_WEIGHT - COLLAR_WEIGHT) / 2;
        };

        _getNumPlates = function (plateWeight, remainingWeight) {
            var num;

            num = Math.floor(remainingWeight / plateWeight);
            remainingWeight -= (plateWeight * num);

            return {
                numPlates: num,
                remaining: remainingWeight,
                weight: plateWeight
            };
        };

        _updatePlateDisplay = function (plates, plateClass, currentLift) {
            var plateToInsert;

            for (var i = 0; i < plates.numPlates; i++) {
                plateToInsert = {
                    plateClass: plateClass,
                    weight: plates.weight
                };
                currentLift.plates.push(plateToInsert);
            }
        };

        return {
            availablePlates: AVAILABLE_PLATES,
            availableClasses: AVAILABLE_CLASSES,
            collar: COLLAR,
            getWorkingWeight: _getWorkingWeight,
            getNumPlates: _getNumPlates,
            updatePlateDisplay: _updatePlateDisplay
        };
    }]);
})();
