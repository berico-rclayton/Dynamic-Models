define(["controllers/controllers"], function(controllers) {
  return controllers.controller("ConceptsController", [
    "$scope", "$location", "resourceLoader", function($scope, $location, resourceLoader) {
      console.log("Starting up ConceptsController");
      return $scope.resources = resourceLoader.getAll();
    }
  ]);
});

/*
//@ sourceMappingURL=concepts.js.map
*/
