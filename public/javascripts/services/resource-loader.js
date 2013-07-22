define(["ang", "lodash", "services/services"], function(angular, _, services) {
  console.log("Registering ResourceLoader");
  return services.service("resourceLoader", [
    "$q", "$http", "$rootScope", function($q, $http, $rootScope) {
      return {
        getAll: function() {
          return $http.get("__resources", {
            cached: true
          }).then(function(res) {
            return res.data;
          });
        },
        get: function(id) {
          return $http.get("__resources", {
            cached: true
          }).then(function(res) {
            var matches;
            matches = _.filter(res.data, function(resource) {
              return resource.id === id;
            });
            return _.first(matches);
          });
        }
      };
    }
  ]);
});

/*
//@ sourceMappingURL=resource-loader.js.map
*/
