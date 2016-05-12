'use strict';

angular.module('travelApp.version', [
  'travelApp.version.interpolate-filter',
  'travelApp.version.version-directive'
])

.value('version', '0.1');
