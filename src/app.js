'use strict';

// Declare app level module which depends on views, and components
angular.module('travelApp', [
    'ngRoute',
    'travelApp.trips',
    'travelApp.newTrip',
    'travelApp.trip',
    'travelApp.newStop',
    'travelApp.stop',
    'travelApp.editTrip',
    'travelApp.editStop',
    'travelApp.model',
    'travelApp.version'
]).
config(['$routeProvider', function($routeProvider) {

    $routeProvider.otherwise({redirectTo: '/trips'});
}]);
