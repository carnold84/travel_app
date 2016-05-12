'use strict';

angular.module('travelApp.stop', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trips/:parent_id/:id', {
    templateUrl: 'templates/stop.html',
    controller: 'StopCtrl'
  });
}])

.controller('StopCtrl', ['$scope', 'appModel', '$routeParams', '$location', function($scope, appModel, $routeParams, $location) {
    
    $scope.showOptions = false;
    
    $scope.parent_id = $routeParams.parent_id;
    
    $scope.id = $routeParams.id;
    
    $scope.showModal = false;
    
    $scope.stop = appModel.getStop($scope.parent_id, $scope.id);
    
    $scope.delete = function () {
        
        appModel.deleteStop($scope.parent_id, $scope.id);
            
        // now redirect
        $location.path('/trips/' + $scope.parent_id);
    }
    
}]);