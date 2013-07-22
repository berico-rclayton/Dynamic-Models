define ["require", "ang", "app"], (require, angular) ->
  require ["vendor/domReady!"], (document) ->
    angular.bootstrap document, ["app"]