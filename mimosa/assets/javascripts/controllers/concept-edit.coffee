define ["controllers/controllers", "controllers/concept-base", "inflection"], (controllers, BaseConceptController) ->

  class ConceptEditController extends BaseConceptController

    constructor: ($scope, $routeParams, $location, resourceLoader) ->
      super($scope, $routeParams, $location, resourceLoader)

      @$scope.isEdit = $routeParams.id?

      @$scope.titleAction = if @$scope.isEdit then "Modify " else "Create a new "


      @$scope.$on "formbuilder#saved", (event, datum) =>
        console.log "Received formbuilder#saved event."
        console.log datum


    save: =>
      console.log @$scope.datum

  controllers.controller "ConceptEditController", [
    "$scope", "$routeParams", "$location", "resourceLoader", ConceptEditController
  ]