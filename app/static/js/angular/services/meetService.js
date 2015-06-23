(function () {
    'use strict';
    var APP = angular.module('MeetDirector.services');

    APP.service('meetService', [ function() {
        var _meetInfo = {
            title: '',
            fed: '',
            director: '',
            startDate: ''
        },
        _lifters = {
            all: [],
            male: [],
            female: []
        },
        _weightClasses = {
            male: {
                classic: [
                '52kg',
                '56kg',
                '60kg',
                '67.5kg',
                '75kg',
                '82.5kg',
                '90kg',
                '100kg',
                '110kg',
                '125kg',
                '125kg+'
                ],
                modern: [
                '53kg',
                '59kg',
                '66kg',
                '74kg',
                '83kg',
                '93kg',
                '105kg',
                '120kg',
                '120kg+'
                ]
            },
            female: {
                classic: [
                '44kg',
                '48kg',
                '52kg',
                '56kg',
                '60kg',
                '67.5kg',
                '75kg',
                '82.5kg',
                '90kg',
                '90kg+'
                ],
                modern: [
                '43kg',
                '47kg',
                '52kg',
                '57kg',
                '63kg',
                '72kg',
                '84kg',
                '84kg+'
                ]
            }
        },
        _flights = [{
            name: '',
            // lifters: [{
            //     name: 'test lifter',
            //     age: 28,
            //     gender: 'male',
            //     weightClass: '120kg',
            //     weightNum: 121,
            //     attempts: {
            //         squat: [160],
            //         bench: [75],
            //         deadlift: [120]
            //     },
            //     results: {
            //         squat: [null, null, null],
            //         bench: [null, null, null],
            //         deadlift: [null, null, null]
            //     }
            // },
            // {
            //     name: 'test lifter2',
            //     age: 28,
            //     gender: 'male',
            //     weightClass: '90kg',
            //     weightNum: 90,
            //     attempts: {
            //         squat: [120],
            //         bench: [50],
            //         deadlift: [175]
            //     },
            //     results: {
            //         squat: [null, null, null],
            //         bench: [null, null, null],
            //         deadlift: [null, null, null]
            //     }
            // }]
            lifters: []
        }];

        return {
            meetInfo: _meetInfo,
            weightClasses: _weightClasses,
            lifters: _lifters,
            flights: _flights
        };
    }]);
})();
