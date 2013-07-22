define ["ang", "lodash", "services/services"], (angular, _, services)->

  console.log "Registering GeoCodeService"

  geocodes = []

  services.factory "geoCodeService", [ "$http", ($http)  ->



    $http.get("/javascripts/data/geocodes.json").success (data) =>
      console.log "geoCodeService: got response"
      if data?
        console.log "geoCodeService: and I have data"
        geocodes = data

    lookup: (code) ->
      _.first(_.filter geocodes, (c) -> c.code is code)

  ]
