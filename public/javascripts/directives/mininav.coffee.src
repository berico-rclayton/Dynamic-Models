
class MiniNav

  restrict: "E"
  transclude: true
  templateUrl: "mininav"
  scope: {}
  defaultClasses: "pull-right submenu"

  constructor: ->
    console.log "MiniNav instantiated"

  link: (scope, element, attrs) =>
    config = scope.$parent[attrs.config]

    unless config?
      throw "Mininav configuration object '#{attrs.config}' is not in scope or undefined."

    classes = @defaultClasses

    if config.classes?
      classes = config.classes

    if config.additionalClasses?
      addons = config.additionalClasses
      if addons.push?
        addons = addons.join(" ")
      classes += " " + addons

    scope.classes = classes
    scope.menuitems = config.menuitems



define ["ang", "lodash", "jquery", "directives/directives"], (angular, _, $, directives)->

  console.log "Registering directive mininav"

  directives.directive "mininav", [ "$rootScope", ($rootScope)  ->

    return new MiniNav()
  ]