'use strict';

angular.module('travelApp.newStop', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new-stop/:id', {
    templateUrl: 'app/new-stop/new-stop.html',
    controller: 'NewStopCtrl'
  });
}])

.controller('NewStopCtrl', ['$scope', 'appModel', '$location', '$routeParams', function($scope, appModel, $location, $routeParams) {
    
    $scope.parent_id = $routeParams.id;

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
            appModel.saveStop($scope.parent_id, stop.country, stop.place, stop.arr_date, stop.dep_date);
            
            // now redirect
            $location.path('/trips/' + $scope.parent_id);
        }
    };
    
}]);