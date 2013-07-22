define(["controllers/controllers"], function(controllers) {
  return controllers.controller("ConceptsNavController", [
    "$scope", "$routeParams", "$location", "resourceLoader", function($scope, $routeParams, $location, resourceLoader) {
      var gatherResources;
      console.log("Starting up ConceptsNavController");
      $scope.currentPath = $location.path();
      gatherResources = function() {
        return $scope.resources = resourceLoader.getAll();
      };
      gatherResources();
      return $scope.$on("$routeChangeStart", function() {
        $scope.currentPath = $location.path();
        return gatherResources();
      });
    }
  ]);
});

/*
//@ sourceMappingURL=concepts-nav.js.map
*/
