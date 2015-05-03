(function () {
    'use strict';
    var APP = angular.module('MeetDirector.controllers'),
      PARTIALS_PATH = '/static/js/angular/partials/',
      BUTTON_DEFAULT = "Create a new meet",
      BUTTON_OPEN = "Some Info...";

    APP.controller('MeetDirectorCtrl', ['$scope', 'meetService', function($scope, meetService) {
      $scope.showMeetForm = false;
      $scope.inMeetCreation = false;
      $scope.buttonText = BUTTON_DEFAULT;
      $scope.currentStage = PARTIALS_PATH + 'home.html';
      $scope.meetService = meetService;

      $scope.clickCreate = function() {
        $scope.showMeetForm = !$scope.showMeetForm;
        if ($scope.showMeetForm) {
          $scope.buttonText = BUTTON_OPEN;
        } else {
          $scope.buttonText = BUTTON_DEFAULT;
        }
      };

      $scope.setCurrentStage = function(stage) {
        $scope.currentStage = stage;
        $scope.inMeetCreation = !($scope.currentStage === PARTIALS_PATH + '/home.html');
      };

      // $scope.inMeetCreation = function() {
      //   return !($scope.currentStage === PARTIALS_PATH + '/home.html');
      // }
    }]);
})();
