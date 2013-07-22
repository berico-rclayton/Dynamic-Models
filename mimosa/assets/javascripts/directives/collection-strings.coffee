define ["ang", "lodash", "jquery", "directives/directives"], (angular, _, $, directives)->

  ###
  Easy control for manipulating an array of strings.  Assumes access to the parent
  scope's "datum" object, in which the array is set as a top-level property.
  ###
  class StringCollection

    restrict: "E"
    replace: true
    transclude: true
    templateUrl: "collection_strings"
    scope: {}

    ###
    New it up!
    ###
    constructor: ->
      console.log "Form Builder instantiated"

    ###
    Called by Angular when it's time to party.
    ###
    link: (scope, element, attrs) =>

      scope.collection = scope.$parent.datum[attrs.target]

      # If the parent object has not set the value of the Array,
      # we need to ensure it's set.
      unless scope.collection?
        scope.collection = []
        scope.$parent.datum[attrs.target] = []

      # Add a new entry to the list.
      scope.add = =>
        unless _.contains scope.collection, scope.stringItem
          scope.collection.push scope.stringItem
          scope.$parent.datum[attrs.target].push scope.stringItem
          scope.clear()
        else
          scope.errorMessage = "Must add only unique values to the list."

      # Edit an item from the list, remove it from the collection and
      # placing it in the input box.
      scope.edit = (item) =>
        scope.remove item
        scope.stringItem = item
        scope.errorMessage = null

      # Clear the input box
      scope.clear = =>
        scope.stringItem = ""
        scope.errorMessage = null

      # Remove an item from the list.
      scope.remove = (item) =>
        scope.collection = _.without(scope.collection, item)
        scope.$parent.datum[attrs.target] = _.without(scope.$parent.datum[attrs.target], item)


  console.log "Registering directive StringCollection"

  directives.directive "stringcollection", [ -> return new StringCollection() ]