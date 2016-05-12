'use strict';

angular.module('travelApp.editStop', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/edit-stop/:parent_id/:id', {
    templateUrl: 'templates/edit-stop.html',
    controller: 'EditStopCtrl'
  });
}])

.controller('EditStopCtrl', ['$scope', 'appModel', '$location', '$routeParams', '$filter', function($scope, appModel, $location, $routeParams, $filter) {
    
    var stop;
        
    $scope.parent_id = $routeParams.parent_id;
    
    $scope.id = $routeParams.id;
    
    stop = appModel.getStop($scope.parent_id, $scope.id);
    
    stop.arr_date = new Date(stop.arr_date);
    
    stop.dep_date = new Date(stop.dep_date);
    
    $scope.stop = stop;

    $scope.save = function (stop) {
        
        $scope.noCountry = false;
        $scope.noPlace = false;
        
        // check if stop is defined
        if (stop === undefined) {
                
            // no country so set as error
            $scope.noCountry = true;

            // no place so set as error
            $scope.noPlace = true;
            
        } else {
            
            if (stop.country === undefined || stop.country === "") {
                
                // no country so set as error
                $scope.noCountry = true;
                
                return;
            }
            
            if (stop.place === undefined || stop.place === "") {
                
                // no place so set as error
                $scope.noPlace = true;
                
                return;
            }
            
            // set saving to true to show loading 
            $scope.saving = true;
            
            // save the data
            appModel.updateStop($scope.parent_id, stop.id, stop.country, stop.place, stop.arr_date, stop.dep_date);
            
            // now redirect
            $location.path('/trips/' + $scope.parent_id);
        }
    };
    
}]);