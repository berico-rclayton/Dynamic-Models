var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["lodash", "inflection"], function(_) {
  var BaseConceptController;
  return BaseConceptController = (function() {
    function BaseConceptController($scope, $routeParams, $location, resourceLoader) {
      this.$scope = $scope;
      this.$routeParams = $routeParams;
      this.$location = $location;
      this.resourceLoader = resourceLoader;
      this._normalizeSchema = __bind(this._normalizeSchema, this);
      this._registerScopeFn = __bind(this._registerScopeFn, this);
      this._registerScopeVar = __bind(this._registerScopeVar, this);
      this._loadSchema = __bind(this._loadSchema, this);
      this.goto = __bind(this.goto, this);
      this._registerScopeVar();
      this._registerScopeFn();
      this._loadSchema();
    }

    BaseConceptController.prototype.goto = function(path) {
      return this.$location.path(path);
    };

    BaseConceptController.prototype._loadSchema = function() {
      return this.$scope.schema = this.resourceLoader.get(this.$routeParams.resource).then(this._normalizeSchema);
    };

    BaseConceptController.prototype._registerScopeVar = function() {
      this.$scope.conceptName = this.$routeParams.resource;
      this.$scope.conceptTitle = this.$routeParams.resource.titleize();
      return this.$scope.conceptSingular = this.$routeParams.resource.singularize().titleize();
    };

    BaseConceptController.prototype._registerScopeFn = function() {
      return this.$scope.goto = this.goto;
    };

    BaseConceptController.prototype._normalizeSchema = function(resource) {
      var normProperties;
      normProperties = _.map(_.values(resource.properties), function(property) {
        property.humanized = property.name.underscore().humanize().titleize();
        return property;
      });
      return {
        id: resource.id,
        properties: _.values(normProperties)
      };
    };

    return BaseConceptController;

  })();
});

/*
//@ sourceMappingURL=concept-base.js.map
*/
