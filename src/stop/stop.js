'use strict';

angular.module('travelApp.stop', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trips/:parent_id/:id', {
    templateUrl: 'templates/stop.html',
    controller: 'StopCtrl'
  });
}])

.controller('StopCtrl', ['$scope', 'appModel', '$routeParams', '$location', function($scope, appModel, $routeParams, $location) {
    
    var params = $location.search();
    
    $scope.showOptions = false;
    
    $scope.parent_id = $routeParams.parent_id;
    
    $scope.id = $routeParams.id;
    
    $scope.showModal = false;
    
    $scope.stop = appModel.getStop($scope.parent_id, $scope.id);
    
    console.log(params);
    
    // check for message in params
    if (params.stopUpdated) {
            
        $scope.message = {
            text : params.stopUpdated ? params.stopUpdated + ' was updated' : undefined,
            type : 'success'
        }
    }
    
    $scope.delete = function () {
        
        var stop = appModel.getStop($scope.parent_id, $scope.id);
        
        appModel.deleteStop($scope.parent_id, $scope.id);
            
        // now redirect
        $location.path('/trips/' + $scope.parent_id).search({stopDeleted : stop.place + ', ' + stop.country});
    }
    
}]);