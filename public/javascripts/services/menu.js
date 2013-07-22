var MenuService,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MenuService = (function() {
  function MenuService($rootScope, $location, menuChannel, async) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.menuChannel = menuChannel;
    this.async = async;
    this.refresh = __bind(this.refresh, this);
    this.handleRouteChange = __bind(this.handleRouteChange, this);
  }

  MenuService.prototype.items = [];

  MenuService.prototype.handleRouteChange = function(event, next, current) {
    return this.refresh();
  };

  MenuService.prototype.setActive = function(name) {
    var item, _i, _len, _ref, _results;
    _ref = this.items;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (item.name === name) {
        _results.push(item.active = true);
      } else {
        _results.push(item.active = false);
      }
    }
    return _results;
  };

  MenuService.prototype.itemIsRegistered = function(name) {
    var item, _i, _len, _ref;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (item.name === name) {
        return true;
      }
    }
    return false;
  };

  MenuService.prototype.addItem = function(menuItem) {
    var _ref, _ref1, _ref2;
    if (!this.itemIsRegistered(menuItem.name)) {
      menuItem.active = (_ref = menuItem.active) != null ? _ref : false;
      menuItem.onClick = (_ref1 = menuItem.onClick) != null ? _ref1 : function() {
        return console.log("Clicked: " + menuItem.name);
      };
      menuItem.href = (_ref2 = menuItem.href) != null ? _ref2 : "";
      this.items.push(menuItem);
      return this.$rootScope.$apply();
    }
  };

  MenuService.prototype.refresh = function() {
    var item, url, _i, _len, _ref,
      _this = this;
    url = "#" + this.$location.url();
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (item.href === url) {
        this.async.until((function() {
          return !_this.$rootScope.$$phase;
        }), (function(cb) {
          return setTimeout(cb, 10);
        }), function() {
          return _this.$rootScope.$apply(function() {
            return _this.setActive(item.name);
          });
        });
        return true;
      }
    }
  };

  return MenuService;

})();

define(["ang", "lodash", "async", "services/services"], function(angular, _, async, services) {
  console.log("Registering menuService");
  return services.factory("menuService", [
    "$rootScope", "$location", "menuChannel", function($rootScope, $location, menuChannel) {
      var menuService;
      menuService = new MenuService($rootScope, $location, menuChannel, async);
      $rootScope.$on("$routeChangeStart", menuService.handleRouteChange);
      return menuService;
    }
  ]);
});

/*
//@ sourceMappingURL=menu.js.map
*/
