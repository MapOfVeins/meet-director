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
                title.val(scope.meet.title);

                fed = angular.element(fedEl);
                fed.val(scope.meet.fed);

                director = angular.element(dirEl);
                director.val(scope.meet.director);

                scope.initMeet = function () {
                    scope.meet.title = title.val();
                    scope.meet.fed = fed.val();
                    scope.meet.director = director.val();
                    scope.setCurrentStage('/static/js/partials/initLifters.html');
                };
            }
        }
    });
})();
