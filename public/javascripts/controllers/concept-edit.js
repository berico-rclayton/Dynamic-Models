var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["controllers/controllers", "controllers/concept-base", "inflection"], function(controllers, BaseConceptController) {
  var ConceptEditController;
  ConceptEditController = (function(_super) {
    __extends(ConceptEditController, _super);

    function ConceptEditController($scope, $routeParams, $location, resourceLoader) {
      this.save = __bind(this.save, this);
      var _this = this;
      ConceptEditController.__super__.constructor.call(this, $scope, $routeParams, $location, resourceLoader);
      this.$scope.isEdit = $routeParams.id != null;
      this.$scope.titleAction = this.$scope.isEdit ? "Modify " : "Create a new ";
      this.$scope.$on("formbuilder#saved", function(event, datum) {
        console.log("Received formbuilder#saved event.");
        return console.log(datum);
      });
    }

    ConceptEditController.prototype.save = function() {
      return console.log(this.$scope.datum);
    };

    return ConceptEditController;

  })(BaseConceptController);
  return controllers.controller("ConceptEditController", ["$scope", "$routeParams", "$location", "resourceLoader", ConceptEditController]);
});

/*
//@ sourceMappingURL=concept-edit.js.map
*/
