'use strict';

angular.module('travelApp.trips', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trips', {
    templateUrl: 'app/trips/trips.html',
    controller: 'TripsCtrl'
  });
}])

.controller('TripsCtrl', ['$scope', 'appModel', function($scope, appModel) {
    
    $scope.trips = appModel.getTrips();
    
}]);