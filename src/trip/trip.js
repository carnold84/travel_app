'use strict';

angular.module('travelApp.trip', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trips/:id', {
    templateUrl: 'templates/trip.html',
    controller: 'TripCtrl'
  });
}])

.controller('TripCtrl', ['$scope', 'appModel', '$routeParams', '$location', function($scope, appModel, $routeParams, $location) {
    
    $scope.id = $routeParams.id;
    
    $scope.trip = appModel.getTrip($scope.id);
    
    $scope.stops = $scope.trip.stops;
    
    $scope.showModal = false;
    
    $scope.delete = function () {
        
        appModel.deleteTrip($scope.id);
            
        // now redirect
        $location.path('/trips/');
    }
    
}]);