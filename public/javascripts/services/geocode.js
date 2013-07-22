define(["ang", "lodash", "services/services"], function(angular, _, services) {
  var geocodes;
  console.log("Registering GeoCodeService");
  geocodes = [];
  return services.factory("geoCodeService", [
    "$http", function($http) {
      var _this = this;
      $http.get("/javascripts/data/geocodes.json").success(function(data) {
        console.log("geoCodeService: got response");
        if (data != null) {
          console.log("geoCodeService: and I have data");
          return geocodes = data;
        }
      });
      return {
        lookup: function(code) {
          return _.first(_.filter(geocodes, function(c) {
            return c.code === code;
          }));
        }
      };
    }
  ]);
});

/*
//@ sourceMappingURL=geocode.js.map
*/
