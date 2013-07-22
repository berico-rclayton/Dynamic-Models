define ["controllers/controllers", "controllers/concept-base", "inflection"], (controllers, BaseConceptController) ->

  class ConceptDefinitionController extends BaseConceptController

    constructor: ($scope, $routeParams, $location, resourceLoader) ->
      console.log arguments
      super($scope, $routeParams, $location, resourceLoader)
      console.log "Starting up ConceptDefinitionController"

  controllers.controller "ConceptDefinitionController", [
    "$scope", "$routeParams", "$location", "resourceLoader", ConceptDefinitionController
  ]