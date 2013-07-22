define(["controllers/controllers", "jquery", "lodash", "ang", "async", "templates", "vendor/ngGridLayoutPlugin", "chardin", "scrollto"], function(controllers, $, _, angular, async, templates, ngGridLayoutPlugin, chardin) {
  var GeoParserController;
  GeoParserController = function($scope, geoParser, geoparserChannel) {
    var btnClearResults, btnScrollToGeoparserInput, btnScrollToResolvedLocations, btnScrollToTop, btnScrollToUnresolvedLocations, btnShowHide, lastResLocGridSelection, lockedForLoading, refreshLayouts, resLayoutPlugin, unresLayoutPlugin,
      _this = this;
    console.log("Starting up GeoParserController");
    $scope.view_resolved_location = "resolved_location";
    $scope.view_selected_location = "selected_location";
    $scope.resolvedLocations = [];
    $scope.selectedLocations = [];
    $scope.unresolvedLocations = [];
    $scope.clearResults = function() {
      $scope.unresolvedLocations.length = 0;
      $scope.resolvedLocations.length = 0;
      return $scope.selectedLocations.length = 0;
    };
    resLayoutPlugin = new ngGridLayoutPlugin();
    unresLayoutPlugin = new ngGridLayoutPlugin();
    lastResLocGridSelection = null;
    lockedForLoading = false;
    $scope.showResults = true;
    refreshLayouts = function() {
      return async.until((function() {
        return !$scope.$$phase;
      }), (function(cb) {
        return setTimeout(cb, 200);
      }), function() {
        resLayoutPlugin.updateGridLayout();
        return unresLayoutPlugin.updateGridLayout();
      });
    };
    $scope.gridOptions = {
      data: "resolvedLocations",
      showGroupPanel: true,
      columnDefs: [
        {
          field: "geoname.name",
          displayName: "Normalized Name",
          minWidth: 50
        }, {
          field: "matches.length",
          displayName: "Occurrences",
          minWidth: 50
        }, {
          field: "matchedNamesStr",
          displayName: "Matches",
          minWidth: 50
        }, {
          field: "charPositionsStr",
          displayName: "Positions",
          minWidth: 50
        }, {
          field: "geoname.primaryCountryName",
          displayName: "Country",
          minWidth: 50
        }, {
          field: "geoname.featureCode",
          displayName: "Location Type",
          cellTemplate: templates.location_type_cell,
          minWidth: 50
        }, {
          field: "geoname.latitude",
          displayName: "Latitude",
          minWidth: 50
        }, {
          field: "geoname.longitude",
          displayName: "Longitude",
          minWidth: 50
        }, {
          field: "geoname.timezone",
          displayName: "Timezone",
          minWidth: 50
        }, {
          field: "confidence",
          displayName: "Confidence",
          minWidth: 50
        }
      ],
      rowTemplate: "resolved_location_row",
      multiSelect: false,
      selectedItems: $scope.selectedLocations,
      plugins: [resLayoutPlugin],
      afterSelectionChange: function(rowItem, event) {
        console.log("Selection Changed");
        if (!(rowItem.entity === lastResLocGridSelection || lockedForLoading)) {
          lastResLocGridSelection = rowItem.entity;
          return geoparserChannel.selectResolvedLocation(lastResLocGridSelection);
        }
      }
    };
    $scope.unresolvedGridOptions = {
      columnDefs: [
        {
          field: "text",
          displayName: "Unresolved Location"
        }, {
          field: "position",
          displayName: "Character Position"
        }
      ],
      data: "unresolvedLocations",
      plugins: [unresLayoutPlugin]
    };
    btnScrollToTop = {
      label: "Map/Details",
      icon: "icon-globe",
      isVisible: function() {
        return $scope.isVisible();
      },
      clicked: function() {
        return $scope.scrollTo('.navbar');
      }
    };
    btnScrollToResolvedLocations = {
      label: "Resolved",
      icon: "icon-map-marker",
      isVisible: function() {
        return $scope.isVisible();
      },
      clicked: function() {
        return $scope.scrollTo('#resolvedLocations');
      }
    };
    btnScrollToUnresolvedLocations = {
      label: "Unresolved",
      icon: "icon-question-sign",
      isVisible: function() {
        return $scope.isVisible();
      },
      clicked: function() {
        return $scope.scrollTo('#unresolvedLocations');
      }
    };
    btnScrollToGeoparserInput = {
      label: "Input",
      icon: "icon-edit",
      isVisible: function() {
        return true;
      },
      clicked: function() {
        return $scope.scrollTo('#geoparser');
      }
    };
    btnShowHide = {
      label: "Show/Hide",
      icon: "icon-fullscreen",
      isVisible: function() {
        return $scope.resolvedLocations.length > 0;
      },
      clicked: function() {
        return $scope.toggleShowResults();
      }
    };
    btnClearResults = {
      label: "Clear",
      icon: "icon-fire",
      isVisible: function() {
        return $scope.resolvedLocations.length > 0;
      },
      clicked: function() {
        return $scope.clearResults();
      }
    };
    $scope.geoparserInputNavConfig = {
      menuitems: [btnScrollToTop, btnShowHide, btnClearResults]
    };
    $scope.resolvedNavConfig = {
      menuitems: [btnScrollToTop, btnScrollToGeoparserInput, btnShowHide, btnClearResults]
    };
    $scope.unresolvedNavConfig = {
      menuitems: [btnScrollToTop, btnScrollToGeoparserInput, btnShowHide, btnClearResults]
    };
    $scope.topNavConfig = {
      additionalClasses: "submenu-top-border",
      menuitems: [btnScrollToResolvedLocations, btnScrollToUnresolvedLocations, btnScrollToGeoparserInput, btnShowHide, btnClearResults]
    };
    $scope.sampleText = function() {
      return templates.vissample;
    };
    $scope.selectedLocation = function() {
      if ($scope.hasSelectedLocation()) {
        return $scope.selectedLocations[0];
      } else {
        return null;
      }
    };
    $scope.showHelp = function() {
      return $("body").chardinJs("start");
    };
    $scope.toggleShowResults = function() {
      return $scope.showResults = !$scope.showResults;
    };
    $scope.hasSelectedLocation = function() {
      return $scope.selectedLocations.length > 0;
    };
    $scope.isVisible = function() {
      return $scope.showResults && $scope.resolvedLocations.length > 0 || lockedForLoading;
    };
    $scope.clearInput = function() {
      return $scope.inputText = "";
    };
    $scope.sample = function() {
      return $scope.inputText = templates.sample;
    };
    $scope.scrollTo = function(element) {
      return $.scrollTo(element, 1000);
    };
    $scope.resolve = function() {
      if (($scope.inputText != null) && $scope.inputText.trim() !== "") {
        return geoParser.extractAndResolve($scope.inputText, function(data, locs, unres) {
          var loc, unr, _i, _j, _len, _len1;
          lockedForLoading = true;
          $scope.clearResults();
          $scope.documents = data;
          for (_i = 0, _len = locs.length; _i < _len; _i++) {
            loc = locs[_i];
            $scope.resolvedLocations.push(loc);
          }
          for (_j = 0, _len1 = unres.length; _j < _len1; _j++) {
            unr = unres[_j];
            $scope.unresolvedLocations.push(unr);
          }
          $scope.showResults = true;
          refreshLayouts();
          geoparserChannel.receiveGeoparsedDocument({
            doc: data,
            res: locs,
            unres: unres
          });
          geoparserChannel.selectResolvedLocation(locs[0]);
          if ($scope.isVisible()) {
            return setTimeout((function() {
              return $.scrollTo(".navbar", 1000);
            }), 500);
          }
        });
      }
    };
    $scope.$on("ngGridEventData", function() {
      var _ref;
      if (((_ref = $scope.gridOptions) != null ? _ref.selectRow : void 0) != null) {
        lockedForLoading = false;
        $scope.gridOptions.selectRow(0, true);
        return refreshLayouts();
      }
    });
    return geoparserChannel.onResolvedLocationSelected(function(location) {
      var idx;
      idx = _.findIndex($scope.resolvedLocations, function(loc) {
        return loc.geoname.geonameID === location.geoname.geonameID;
      });
      if (idx !== -1) {
        return $scope.gridOptions.selectItem(idx, true);
      }
    });
  };
  return controllers.controller("GeoParserController", ["$scope", "geoParserService", "geoparserChannel", GeoParserController]);
});

/*
//@ sourceMappingURL=geoparser.js.map
*/
