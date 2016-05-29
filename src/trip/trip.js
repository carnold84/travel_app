'use strict';

angular.module('travelApp.trip', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trips/:id', {
    templateUrl: 'templates/trip.html',
    controller: 'TripCtrl'
  });
}])

.controller('TripCtrl', ['$scope', 'appModel', '$routeParams', '$location', function($scope, appModel, $routeParams, $location) {
    
    var params = $location.search();
    
    $scope.id = $routeParams.id;
    
    $scope.trip = appModel.getTrip($scope.id);
    
    $scope.stops = $scope.trip.stops;
    
    $scope.showModal = false;
    
    console.log($scope.stops);
    
    // check for message in params
    if (params.tripUpdated) {
            
        $scope.message = {
            text : params.tripUpdated ? params.tripUpdated + ' was updated' : undefined,
            type : 'success'
        }
    }
    
    // check for message in params
    if (params.stopAdded) {
            
        $scope.message = {
            text : params.stopAdded ? params.stopAdded + ' was created' : undefined,
            type : 'success'
        }
    }
    
    // check for message in params
    if (params.stopDeleted) {
            
        $scope.message = {
            text : params.stopDeleted ? params.stopDeleted + ' was removed' : undefined,
            type : 'success'
        }
    }
    
    $scope.delete = function () {
        
        appModel.deleteTrip($scope.id);
            
        // now redirect
        $location.path('/trips/').search({tripDeleted : $scope.trip.name});
    }
    
}]);