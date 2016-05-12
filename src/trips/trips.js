'use strict';

angular.module('travelApp.trips', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trips', {
    templateUrl: 'templates/trips.html',
    controller: 'TripsCtrl'
  });
}])

.controller('TripsCtrl', ['$scope', 'appModel', function($scope, appModel) {
    
    $scope.trips = appModel.getTrips();
    
}]);