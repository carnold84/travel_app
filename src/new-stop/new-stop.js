'use strict';

angular.module('travelApp.newStop', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new-stop/:id', {
    templateUrl: 'templates/new-stop.html',
    controller: 'NewStopCtrl'
  });
}])

.controller('NewStopCtrl', ['$scope', 'appModel', '$location', '$routeParams', '$http', function($scope, appModel, $location, $routeParams, $http) {
    
    var autocompleteList = document.querySelector('.form-autocomplete-list'),
        place_input = document.querySelector('#stop-place'),
        country_input = document.querySelector('#stop-country');
    
    $scope.parent_id = $routeParams.id;
    
    place_input.addEventListener('input', onPlaceInput);
    
    function onPlaceInput (event) {
        
        var val = event.target.value;
        
        if (val.length > 2) {
            
            $http({
                method: 'GET',
                url: 'http://api.geonames.org/searchJSON?username=carnold84&maxRows=10&name_startsWith=' + val
            }).then(function successCallback(response) {
                
                console.log(response);
                
                var data = response.data.geonames;
                
                if (data.length <= 0) {
                    data = [{
                        message : 'No matching cities were found'
                    }];
                }
                
                updateAutoComplete(data);
            
            }, function errorCallback(response) {
                
                console.log(response);
                updateAutoComplete(response.data.message);
            });
            
        } else {
            
            $scope.autoCompleteData = undefined;
        }
    }
    
    function updateAutoComplete (data) {
        
        $scope.autoCompleteData = data;
        
        console.log($scope.autoCompleteData);
    }
    
    $scope.onAutoCompleteItemSelect = function ($event) {
        
        console.log($event);
        
        var id = parseInt($event.target.getAttribute('data-id')),
            data = getAutoCompletePlaceByID(id),
            place,
            country;
        
        if (data !== undefined) {
            
            place = data.name ? data.name.trim() : '';
            country = data.countryName ? data.countryName.trim() : '';

            if (place !== '') {

                $scope.stop.place = place;
                $scope.stop.country = country;
            }

            $scope.autoCompleteData = undefined;
        }
    };
    
    function getAutoCompletePlaceByID (id) {
        
        var i = 0,
            len = $scope.autoCompleteData.length,
            item;
        
        console.log(id);
        
        for (i; i < len; i++) {
            
            item = $scope.autoCompleteData[i];
        
        console.log(item);
        
        console.log(item.geonameId);
            
            if (item.geonameId === id) {
                break;
            }
        }
        
        return item;
    }

    $scope.save = function (stop) {
        
        console.log(stop);
        
        $scope.noPlace = false;
        $scope.noCountry = false;
        
        // check if stop is defined
        if (stop === undefined) {

            // no place so set as error
            $scope.noPlace = true;
                
            // no country so set as error
            $scope.noCountry = true;
            
        } else {
            
            if (stop.place === undefined || stop.place === "") {
                
                // no place so set as error
                $scope.noPlace = true;
                
                return;
            }
            
            if (stop.country === undefined || stop.country === "") {
                
                // no country so set as error
                $scope.noCountry = true;
                
                return;
            }
            
            // set saving to true to show loading 
            $scope.saving = true;
            
            // save the data
            appModel.saveStop($scope.parent_id, stop);
            
            // now redirect
            $location.path('/trips/' + $scope.parent_id).search({stopAdded : stop.place + ', ' + stop.country});
        }
    };
    
}]);