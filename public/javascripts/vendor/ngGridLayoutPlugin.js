var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  var ngGridLayoutPlugin;
  return ngGridLayoutPlugin = (function() {
    function ngGridLayoutPlugin() {
      this.updateGridLayout = __bind(this.updateGridLayout, this);
      this.init = __bind(this.init, this);
    }

    ngGridLayoutPlugin.prototype.init = function(scope, grid, services) {
      this.domUtilityService = services.DomUtilityService;
      this.grid = grid;
      return this.scope = scope;
    };

    ngGridLayoutPlugin.prototype.updateGridLayout = function() {
      var _this = this;
      return this.scope.$apply(function() {
        return _this.domUtilityService.RebuildGrid(_this.scope, _this.grid);
      });
    };

    return ngGridLayoutPlugin;

  })();
});

/*
//@ sourceMappingURL=ngGridLayoutPlugin.js.map
*/
