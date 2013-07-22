define ["controllers/controllers"], (controllers) ->

  controllers.controller "ConceptsNavController", ["$scope", "$routeParams", "$location", "resourceLoader", ($scope, $routeParams, $location, resourceLoader)->

    console.log "Starting up ConceptsNavController"

    $scope.currentPath = $location.path()

    gatherResources = ->
      $scope.resources = resourceLoader.getAll()

    gatherResources()

    $scope.$on "$routeChangeStart", ->
      $scope.currentPath = $location.path()
      gatherResources()

  ]