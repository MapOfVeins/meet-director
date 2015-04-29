(function () {
    'use strict';
    var APP = 'MeetDirector';
    angular.module(APP + '.directives').directive('createMeet', function () {
        return {
            restrict: 'E',
            link: function (scope, element) {
                var titleEl = document.querySelector('#meet-title'),
                    fedEl = document.querySelector('#meet-fed'),
                    dirEl = document.querySelector('#meet-dir'),
                    title,
                    fed,
                    director;

                title = angular.element(titleEl);
                title.val(scope.meetService.meetInfo.title);

                fed = angular.element(fedEl);
                fed.val(scope.meetService.meetInfo.fed);

                director = angular.element(dirEl);
                director.val(scope.meetService.meetInfo.director);

                scope.initMeet = function () {
                    scope.meetState.meetInfo.title = title.val();
                    scope.meetState.meetInfo.fed = fed.val();
                    scope.meetState.meetInfo.director = director.val();
                    scope.setCurrentStage('/static/js/partials/initLifters.html');
                };
            }
        }
    });
})();
