'use strict';

angular.module('travelApp.model', [])

.service('appModel', [function () {
    
    // check if there are trips already stored
    var data = localStorage.getItem('travelAppData');
    
    // make sure data object exists
    data = data ? JSON.parse(data) : {};
    
    // parse trips string if it exists or create blank array
    this.trips = data.trips !== undefined ? data.trips : [];
    
    console.log(this.trips);
    
    this.getTrips = function () {
        return this.trips;  
    };
    
    this.getTrip = function (id) {
        
        var i = 0,
            trips = this.trips,
            num_trips = trips.length,
            temp_trip,
            trip;
        
        // loop through trips and get the right one
        for (i; i < num_trips; i++) {
            
            temp_trip = trips[i];
            
            if (temp_trip.id === id) {
                trip = temp_trip;
                break;
            }
        }
        
        return trip;
    };
    
    this.saveTrip = function (name, desc) {
        
        // add the trip to array of trips
        this.trips.unshift({
            id : 'uuid-' + Date.now(),
            name : name,
            dateCreated : Date.now(),
            description : desc
        });
        
        this.updateStorage();
    };
    
    this.updateTrip = function (id, name, desc) {
        
        // add the trip to array of trips
        var trip = this.getTrip(id);
        
        trip.name = name;
        
        trip.description = desc;
        
        this.updateStorage();
    };
    
    this.deleteTrip = function (id) {
        
        var i = 0,
            trips = this.trips,
            num_trips = trips.length,
            temp_trip,
            trip;
        
        // loop through trips and get the right one
        for (i; i < num_trips; i++) {
            
            temp_trip = trips[i];
            
            if (temp_trip.id === id) {
                trips.splice(i, 1);
                break;
            }
        }
        
        this.updateStorage();
    };
    
    this.getStop = function (parent_id, id) {
        
        var i = 0,
            trip = this.getTrip(parent_id),
            stops = trip.stops,
            num_stops = stops !== undefined ? stops.length : 0,
            temp_stop,
            stop;
        
        // loop through trips and get the right one
        for (i; i < num_stops; i++) {
            
            temp_stop = stops[i];
            
            if (temp_stop.id === id) {
                stop = temp_stop;
                break;
            }
        }
        
        return stop;
    };
    
    this.saveStop = function (parent_id, country, place, arr_date, dep_date) {
        
        // store the trip
        var trip = this.getTrip(parent_id);
        
        // make sure trip exists
        if (trip !== undefined) {
            
            // if stops array doesn't exist then create it
            if (trip.stops === undefined) {

                trip.stops = [];
            }
            
            // now add the stop
            trip.stops.push({
                id : 'uuid-' + Date.now(),
                country : country,
                place : place,
                arr_date : new Date(arr_date).getTime(),
                dep_date : new Date(dep_date).getTime()
            });
        }
        
        this.updateStorage();
    };
    
    this.updateStop = function (parent_id, id, country, place, arr_date, dep_date) {
        
        // store the stop
        var stop = this.getStop(parent_id, id);
        
        // make sure trip exists
        if (stop !== undefined) {
            
            stop.country = country;
            stop.place = place;
            stop.arr_date = new Date(arr_date).getTime();
            stop.dep_date = new Date(dep_date).getTime();
        }
        
        this.updateStorage();
    };
    
    this.deleteStop = function (parent_id, id) {
        
        // store the trip
        var trip = this.getTrip(parent_id),
            i = 0,
            stops = trip.stops,
            num_stops = stops.length,
            temp_stop,
            stop;
        
        // loop through trips and get the right one
        for (i; i < num_stops; i++) {
            
            temp_stop = stops[i];
            
            if (temp_stop.id === id) {
                stops.splice(i, 1);
                break;
            }
        }
        
        this.updateStorage();
    };
    
    this.updateStorage = function () {
        
        data.trips = this.trips;
        
        localStorage.setItem('travelAppData', JSON.stringify(data));
    };
    
}]);