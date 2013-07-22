var Channel, GeoparserChannel, MenuChannel, _ref, _ref1,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Channel = (function() {
  function Channel($rootScope, async) {
    this.$rootScope = $rootScope;
    this.async = async;
    this.on = __bind(this.on, this);
    console.log("Channel Started");
  }

  Channel.prototype.on = function(topic, handler) {
    var _this = this;
    return this.$rootScope.$on(topic, function() {
      var args;
      args = _.rest(arguments);
      return _this.async.until((function() {
        return !_this.$rootScope.$$phase;
      }), (function(cb) {
        return setTimeout(cb, 10);
      }), function() {
        return _this.$rootScope.$apply(function() {
          return handler.apply(null, args);
        });
      });
    });
  };

  return Channel;

})();

MenuChannel = (function(_super) {
  __extends(MenuChannel, _super);

  function MenuChannel() {
    this.onMenuItemClicked = __bind(this.onMenuItemClicked, this);
    this.menuItemClicked = __bind(this.menuItemClicked, this);
    _ref = MenuChannel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MenuChannel.prototype.menuItemClicked = function(menuItemName) {
    return this.$rootScope.$broadcast("menuItemClicked", menuItemName);
  };

  MenuChannel.prototype.onMenuItemClicked = function(handler) {
    return this.on("menuItemClicked", handler);
  };

  return MenuChannel;

})(Channel);

GeoparserChannel = (function(_super) {
  __extends(GeoparserChannel, _super);

  function GeoparserChannel() {
    this.onGeoparsedDocumentCleared = __bind(this.onGeoparsedDocumentCleared, this);
    this.clearGeoparsedDocument = __bind(this.clearGeoparsedDocument, this);
    this.onGeoparsedDocumentReceived = __bind(this.onGeoparsedDocumentReceived, this);
    this.receiveGeoparsedDocument = __bind(this.receiveGeoparsedDocument, this);
    this.onUnresolvedLocationUnselected = __bind(this.onUnresolvedLocationUnselected, this);
    this.unselectUnresolvedLocation = __bind(this.unselectUnresolvedLocation, this);
    this.onResolvedLocationUnselected = __bind(this.onResolvedLocationUnselected, this);
    this.unselectResolvedLocation = __bind(this.unselectResolvedLocation, this);
    this.onUnresolvedLocationSelected = __bind(this.onUnresolvedLocationSelected, this);
    this.selectUnresolvedLocation = __bind(this.selectUnresolvedLocation, this);
    this.onResolvedLocationSelected = __bind(this.onResolvedLocationSelected, this);
    this.selectResolvedLocation = __bind(this.selectResolvedLocation, this);
    _ref1 = GeoparserChannel.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  GeoparserChannel.prototype.selectResolvedLocation = function(location) {
    return this.$rootScope.$broadcast("resolvedLocationSelected", location);
  };

  GeoparserChannel.prototype.onResolvedLocationSelected = function(handler) {
    return this.on("resolvedLocationSelected", handler);
  };

  GeoparserChannel.prototype.selectUnresolvedLocation = function(location) {
    return this.$rootScope.$broadcast("unresolvedLocationSelected", location);
  };

  GeoparserChannel.prototype.onUnresolvedLocationSelected = function(handler) {
    return this.on("unresolvedLocationSelected", handler);
  };

  GeoparserChannel.prototype.unselectResolvedLocation = function() {
    return this.$rootScope.$broadcast("resolvedLocationUnselected");
  };

  GeoparserChannel.prototype.onResolvedLocationUnselected = function(handler) {
    return this.on("resolvedLocationUnselected", handler);
  };

  GeoparserChannel.prototype.unselectUnresolvedLocation = function() {
    return this.$rootScope.$broadcast("unresolvedLocationUnselected");
  };

  GeoparserChannel.prototype.onUnresolvedLocationUnselected = function(handler) {
    return this.on("unresolvedLocationUnselected", handler);
  };

  GeoparserChannel.prototype.receiveGeoparsedDocument = function(geodoc) {
    return this.$rootScope.$broadcast("geoparsedDocumentReceived", geodoc);
  };

  GeoparserChannel.prototype.onGeoparsedDocumentReceived = function(handler) {
    return this.on("geoparsedDocumentReceived", handler);
  };

  GeoparserChannel.prototype.clearGeoparsedDocument = function() {
    return this.$rootScope.$broadcast("geoparsedDocumentCleared", geodoc);
  };

  GeoparserChannel.prototype.onGeoparsedDocumentCleared = function(handler) {
    return this.on("geoparsedDocumentCleared", handler);
  };

  return GeoparserChannel;

})(Channel);

define(["ang", "lodash", "async", "services/services"], function(angular, _, async, services) {
  console.log("Registering PubSub Channels");
  services.service("menuChannel", [
    "$rootScope", function($rootScope) {
      return new MenuChannel($rootScope, async);
    }
  ]);
  return services.service("geoparserChannel", [
    "$rootScope", function($rootScope) {
      return new GeoparserChannel($rootScope, async);
    }
  ]);
});

/*
//@ sourceMappingURL=pubsub-channels.js.map
*/
