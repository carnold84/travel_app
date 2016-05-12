'use strict';

angular.module('travelApp.editTrip', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/edit-trip/:id', {
    templateUrl: 'templates/edit-trip.html',
    controller: 'EditTripCtrl'
  });
}])

.controller('EditTripCtrl', ['$scope', 'appModel', '$location', '$routeParams', function($scope, appModel, $location, $routeParams) {
    
    $scope.id = $routeParams.id;
    
    $scope.trip = appModel.getTrip($scope.id);

    $scope.update = function (trip) {
        
        $scope.error = false;
        
        // check if name has been entered
        if (trip === undefined || (trip.name === undefined || trip.name === "")) {
            
            // no name so set as error
            $scope.error = true;
            
        } else {
            
            // set saving to true to show loading 
            $scope.saving = true;
            
            // save the data
            appModel.updateTrip($scope.id, trip.name, trip.description);
            
            // now redirect
            $location.path('/trips');
        }
    };
    
}]);