var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["ang", "lodash", "jquery", "directives/directives"], function(angular, _, $, directives) {
  /*
  Easy control for manipulating an array of strings.  Assumes access to the parent
  scope's "datum" object, in which the array is set as a top-level property.
  */

  var StringCollection;
  StringCollection = (function() {
    StringCollection.prototype.restrict = "E";

    StringCollection.prototype.replace = true;

    StringCollection.prototype.transclude = true;

    StringCollection.prototype.templateUrl = "collection_strings";

    StringCollection.prototype.scope = {};

    /*
    New it up!
    */


    function StringCollection() {
      this.link = __bind(this.link, this);
      console.log("Form Builder instantiated");
    }

    /*
    Called by Angular when it's time to party.
    */


    StringCollection.prototype.link = function(scope, element, attrs) {
      var _this = this;
      scope.collection = scope.$parent.datum[attrs.target];
      if (scope.collection == null) {
        scope.collection = [];
        scope.$parent.datum[attrs.target] = [];
      }
      scope.add = function() {
        if (!_.contains(scope.collection, scope.stringItem)) {
          scope.collection.push(scope.stringItem);
          scope.$parent.datum[attrs.target].push(scope.stringItem);
          return scope.clear();
        } else {
          return scope.errorMessage = "Must add only unique values to the list.";
        }
      };
      scope.edit = function(item) {
        scope.remove(item);
        scope.stringItem = item;
        return scope.errorMessage = null;
      };
      scope.clear = function() {
        scope.stringItem = "";
        return scope.errorMessage = null;
      };
      return scope.remove = function(item) {
        scope.collection = _.without(scope.collection, item);
        return scope.$parent.datum[attrs.target] = _.without(scope.$parent.datum[attrs.target], item);
      };
    };

    return StringCollection;

  })();
  console.log("Registering directive StringCollection");
  return directives.directive("stringcollection", [
    function() {
      return new StringCollection();
    }
  ]);
});

/*
//@ sourceMappingURL=collection-strings.js.map
*/
