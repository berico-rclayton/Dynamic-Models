define ["controllers/controllers"], (controllers) ->

  controllers.controller "ConceptsController", ["$scope", "$location", "resourceLoader", ($scope, $location, resourceLoader)->

    console.log "Starting up ConceptsController"

    $scope.resources = resourceLoader.getAll()
  ]