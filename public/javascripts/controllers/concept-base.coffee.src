define ["lodash", "inflection"], (_) ->

  class BaseConceptController

    constructor: (@$scope, @$routeParams, @$location, @resourceLoader) ->
      @_registerScopeVar()
      @_registerScopeFn()
      @_loadSchema()

    goto: (path) =>
      @$location.path(path)

    _loadSchema: =>
      @$scope.schema = @resourceLoader.get(@$routeParams.resource).then(@_normalizeSchema)

    _registerScopeVar: =>
      @$scope.conceptName = @$routeParams.resource
      @$scope.conceptTitle = @$routeParams.resource.titleize()
      @$scope.conceptSingular = @$routeParams.resource.singularize().titleize()

    _registerScopeFn: =>
      @$scope.goto = @goto

    _normalizeSchema: (resource) =>
      normProperties = _.map _.values(resource.properties), (property) ->
        property.humanized = property.name.underscore().humanize().titleize()
        property
      { id: resource.id, properties: _.values normProperties }