(function () {
    'use strict';
    var APP = angular.module('MeetDirector.controllers'),
      PARTIALS_PATH = '/static/js/angular/partials/',
      BUTTON_DEFAULT = "Create a new meet",
      BUTTON_OPEN = "Some Info...";

    APP.controller('MeetDirectorCtrl', ['$scope', function($scope) {
      $scope.showMeetForm = false;
      $scope.buttonText = BUTTON_DEFAULT;
      $scope.currentStage = PARTIALS_PATH + 'home.html';

      $scope.clickCreate = function() {
        $scope.showMeetForm = !$scope.showMeetForm;
        if ($scope.showMeetForm) {
          $scope.buttonText = BUTTON_OPEN;
        } else {
          $scope.buttonText = BUTTON_DEFAULT;
        }
      };

      $scope.initMeet = function() {
        console.log('init');
        $scope.currentStage = PARTIALS_PATH + 'initLifters.html';

      };
    }]);
})();
