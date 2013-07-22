define ["ang", "lodash", "services/services"], (angular, _, services)->

  console.log "Registering ResourceLoader"

  services.service "resourceLoader", [ "$q", "$http", "$rootScope", ($q, $http, $rootScope)  ->

    getAll: ->
      $http.get("__resources", { cached: true }).then (res) -> res.data

    get: (id) ->
      $http.get("__resources", { cached: true }).then (res) ->
        matches = _.filter(res.data, (resource) -> resource.id is id)
        _.first matches
  ]
