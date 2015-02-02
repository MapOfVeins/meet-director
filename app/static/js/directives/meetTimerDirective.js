(function () {
    'use strict';
    var APP = 'MeetDirector';
    angular.module(APP + '.directives').directive('meetTimer', ['$interval',
        function ($interval) {
        return {
            restrict: 'E',
            link: function (scope, element) {
                var timerEl = angular.element(document.querySelector('.lift-timer-value')),
                    timeLeft = new Date(),
                    timerInterval;

                function setTime() {
                    timeLeft.setMinutes(1);
                    timeLeft.setSeconds(0);
                    timerEl.text(timeLeft.getMinutes() + ':' + timeLeft.getSeconds() + '0');
                };

                function changeTime() {
                    if (timeLeft.getMinutes() == 0 && timeLeft.getSeconds() == 0) {
                        endTimer();
                        return;
                    }

                    timeLeft.setSeconds(timeLeft.getSeconds() - 1);
                    if (timeLeft.getSeconds() <= 9) {
                        timerEl.text(timeLeft.getMinutes() + ':0' + timeLeft.getSeconds());
                    } else {
                        timerEl.text(timeLeft.getMinutes() + ':' + timeLeft.getSeconds());
                    }
                };

                function endTimer() {
                    scope.pauseTime();
                    // Display change here
                };

                scope.pauseTime = function() {
                    if (angular.isDefined(timerInterval)) {
                        $interval.cancel(timerInterval);
                        timerInterval = undefined;
                    }
                };

                scope.resetTime = function() {
                    setTime();
                };

                scope.resumeTime = function() {
                    if (!angular.isDefined(timerInterval)) {
                        timerInterval = $interval(changeTime, 1000);
                    }
                };

                scope.$watch('lifting', function() {
                    scope.resetTime();
                });

                setTime();
            }
        }
    }]);
})();
