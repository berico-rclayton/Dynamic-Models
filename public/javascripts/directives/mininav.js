var MiniNav,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MiniNav = (function() {
  MiniNav.prototype.restrict = "E";

  MiniNav.prototype.transclude = true;

  MiniNav.prototype.templateUrl = "mininav";

  MiniNav.prototype.scope = {};

  MiniNav.prototype.defaultClasses = "pull-right submenu";

  function MiniNav() {
    this.link = __bind(this.link, this);
    console.log("MiniNav instantiated");
  }

  MiniNav.prototype.link = function(scope, element, attrs) {
    var addons, classes, config;
    config = scope.$parent[attrs.config];
    if (config == null) {
      throw "Mininav configuration object '" + attrs.config + "' is not in scope or undefined.";
    }
    classes = this.defaultClasses;
    if (config.classes != null) {
      classes = config.classes;
    }
    if (config.additionalClasses != null) {
      addons = config.additionalClasses;
      if (addons.push != null) {
        addons = addons.join(" ");
      }
      classes += " " + addons;
    }
    scope.classes = classes;
    return scope.menuitems = config.menuitems;
  };

  return MiniNav;

})();

define(["ang", "lodash", "jquery", "directives/directives"], function(angular, _, $, directives) {
  console.log("Registering directive mininav");
  return directives.directive("mininav", [
    "$rootScope", function($rootScope) {
      return new MiniNav();
    }
  ]);
});

/*
//@ sourceMappingURL=mininav.js.map
*/
