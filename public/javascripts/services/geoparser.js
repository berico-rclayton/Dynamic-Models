define(["ang", "lodash", "services/services"], function(angular, _, services) {
  console.log("Registering GeoParserService");
  return services.factory("geoParserService", [
    "$http", function($http) {
      var getUnresolvedLocations, processResolvedLocations,
        _this = this;
      processResolvedLocations = function(data) {
        var collapsedLocations, group, groups, item, key, loc, _i, _len;
        groups = _.groupBy(data.resolvedLocations, function(datum) {
          return datum.geoname.geonameID;
        });
        collapsedLocations = [];
        for (key in groups) {
          group = groups[key];
          loc = _.cloneDeep(group[0]);
          loc.charPositions = [];
          loc.matchedNames = [];
          loc.matches = [];
          for (_i = 0, _len = group.length; _i < _len; _i++) {
            item = group[_i];
            loc.charPositions.push(item.location.position);
            loc.matches.push(item.location);
            console.log(item);
            if (!_.contains(loc.matchedNames, item.location.text)) {
              loc.matchedNames.push(item.location.text);
            }
          }
          loc.charPositionsStr = loc.charPositions.join(", ");
          loc.matchedNamesStr = loc.matchedNames.join(", ");
          collapsedLocations.push(loc);
        }
        return _.sortBy(collapsedLocations, function(l) {
          return -l.matches.length;
        });
      };
      getUnresolvedLocations = function(data) {
        var allPos, notIn, resPos;
        allPos = _.map(data.locationOccurrences, function(loc) {
          return loc.position;
        });
        resPos = _.map(data.resolvedLocations, function(loc) {
          return loc.location.position;
        });
        notIn = _.difference(allPos, resPos);
        console.log(notIn);
        return _.filter(data.locationOccurrences, function(occ) {
          return _.contains(notIn, occ.position);
        });
      };
      return {
        extractAndResolve: function(text, callback) {
          var config;
          config = {
            method: "POST",
            url: "/service/geoparser/process",
            headers: {
              "Content-Type": "text/plain"
            },
            data: text
          };
          return $http(config).success(function(data, status) {
            var locs, unresolved;
            if (status >= 200 && status < 300) {
              console.log("Success!");
              locs = processResolvedLocations(data);
              unresolved = getUnresolvedLocations(data);
              return callback(data, locs, unresolved);
            }
          });
        }
      };
    }
  ]);
});

/*
//@ sourceMappingURL=geoparser.js.map
*/
