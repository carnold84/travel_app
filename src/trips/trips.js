'use strict';

angular.module('travelApp.trips', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trips', {
    templateUrl: 'templates/trips.html',
    controller: 'TripsCtrl'
  });
}])

.controller('TripsCtrl', ['$rootScope', '$scope', 'appModel', '$location', function($rootScope, $scope, appModel, $location) {
    
    var params = $location.search();
    
    $scope.trips = appModel.getTrips();
    
    // check for message in params
    if (params.tripAdded) {
            
        $scope.message = {
            text : params.tripAdded ? params.tripAdded + ' was created' : undefined,
            type : 'success'
        }
    }
    
    // check for message in params
    if (params.tripDeleted) {
            
        $scope.message = {
            text : params.tripDeleted ? params.tripDeleted + ' was removed' : undefined,
            type : 'success'
        }
    }
    
    console.log('message: ' + $scope.message);
    
}]);