'use strict';

angular.module('travelApp.newTrip', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new-trip', {
    templateUrl: 'templates/new-trip.html',
    controller: 'NewTripCtrl'
  });
}])

.controller('NewTripCtrl', ['$scope', 'appModel', '$location', function($scope, appModel, $location) {

    $scope.save = function (trip) {
        console.log(trip);
        
        $scope.error = false;
        
        // check if name has been entered
        if (trip === undefined || (trip.name === undefined || trip.name === "")) {
            
            // no name so set as error
            $scope.error = true;
            
        } else {
            
            // set saving to true to show loading 
            $scope.saving = true;
            
            // save the data
            appModel.saveTrip(trip.name, trip.description);
            
            // now redirect
            $location.path('/trips');
        }
    };
    
}]);