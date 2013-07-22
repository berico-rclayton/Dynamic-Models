define(["controllers/controllers"], function(controllers) {
  var SelectedLocationController;
  SelectedLocationController = function($scope, $rootScope, geoCode, geoparserChannel) {
    var isCountry, isValidAdminCode, latString, lonString;
    console.log("Starting up SelectedLocationController");
    $scope.matchLimit = 10;
    $scope.alternateLimit = 10;
    $scope.selectedLocation = null;
    geoparserChannel.onResolvedLocationSelected(function(location) {
      return $scope.selectedLocation = location;
    });
    $scope.locationType = function(code) {
      return geoCode.lookup(code);
    };
    isValidAdminCode = function(adminCode) {
      if (_.isEmpty(adminCode)) {
        return false;
      }
      if (_.isNaN(_.parseInt(adminCode))) {
        return true;
      }
    };
    isCountry = function(loc) {
      return loc.geoname.primaryCountryCode === "NULL" || loc.geoname.admin1Code === "00";
    };
    $scope.title = function(loc) {
      var title;
      if (loc != null) {
        title = "" + loc.geoname.name;
        if (loc.geoname.featureClass === "P" || loc.geoname.featureClass === "A") {
          if (isValidAdminCode(loc.geoname.admin2Code)) {
            title += ", " + loc.geoname.admin2Code;
          }
          if (isValidAdminCode(loc.geoname.admin1Code)) {
            title += ", " + loc.geoname.admin1Code;
          }
          if (!isCountry(loc)) {
            title += ", " + loc.geoname.primaryCountryCode;
          }
        }
        return title;
      }
    };
    latString = function(latitude) {
      if (latitude >= 0) {
        return latitude + "N";
      } else {
        return (latitude * -1.0) + "S";
      }
    };
    lonString = function(longitude) {
      if (longitude >= 0) {
        return longitude + "E";
      } else {
        return (longitude * -1.0) + "W";
      }
    };
    return $scope.locationInfo = function(loc) {
      var elv, elvFt, info, lat, lon;
      if (loc != null) {
        lat = latString(loc.geoname.latitude);
        lon = lonString(loc.geoname.longitude);
        info = "" + lat + " " + lon;
        if (loc.geoname.elevation !== -9999999) {
          elv = loc.geoname.elevation;
          elvFt = Math.round(loc.geoname.elevation * 3.3);
          info += ", elev. " + elv + "m (" + elvFt + "ft)";
        }
        return info;
      }
    };
  };
  return controllers.controller("SelectedLocationController", ["$scope", "$rootScope", "geoCodeService", "geoparserChannel", SelectedLocationController]);
});

/*
//@ sourceMappingURL=selectedlocation.js.map
*/
