var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["controllers/controllers", "controllers/concept-base", "inflection"], function(controllers, BaseConceptController) {
  var ConceptDefinitionController;
  ConceptDefinitionController = (function(_super) {
    __extends(ConceptDefinitionController, _super);

    function ConceptDefinitionController($scope, $routeParams, $location, resourceLoader) {
      console.log(arguments);
      ConceptDefinitionController.__super__.constructor.call(this, $scope, $routeParams, $location, resourceLoader);
      console.log("Starting up ConceptDefinitionController");
    }

    return ConceptDefinitionController;

  })(BaseConceptController);
  return controllers.controller("ConceptDefinitionController", ["$scope", "$routeParams", "$location", "resourceLoader", ConceptDefinitionController]);
});

/*
//@ sourceMappingURL=concept-definition.js.map
*/
