/*
Dynamically constructs a form from Deployd's resource schema.
*/

var FormBuilder,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FormBuilder = (function() {
  FormBuilder.prototype.restrict = "E";

  FormBuilder.prototype.replace = true;

  FormBuilder.prototype.transclude = true;

  FormBuilder.prototype.scope = {};

  /*
  Keep a reference to $compile so we can get Angular to evaluate the
  dynamic content when we are done constructing it.
  */


  function FormBuilder($compile) {
    this.$compile = $compile;
    this.link = __bind(this.link, this);
    this._arrayOfStringsControl = __bind(this._arrayOfStringsControl, this);
    this._selectGroup = __bind(this._selectGroup, this);
    this._radioGroupTrueFalse = __bind(this._radioGroupTrueFalse, this);
    this._textBox = __bind(this._textBox, this);
    this._buttonGroup = __bind(this._buttonGroup, this);
    console.log("Form Builder instantiated");
  }

  /*
  Construct an object with the default values or null.
  */


  FormBuilder.prototype._makeDefaultDatum = function(properties) {
    var datum, property, _i, _len, _ref;
    datum = {};
    for (_i = 0, _len = properties.length; _i < _len; _i++) {
      property = properties[_i];
      datum[property.name] = (_ref = property.defaultValue) != null ? _ref : null;
    }
    return datum;
  };

  /*
  Create a control group, which will wrap the supplied control.
  */


  FormBuilder.prototype._controlGroup = function(property, control) {
    var group;
    group = "<div class='control-group'>\n  <label class='control-label' for='ctrl-" + property.name + "'>" + property.humanized + ":</label>\n  <div class='controls'>\n    " + control;
    if (property.description != null) {
      group += "<p class='help-block'>" + property.description + "</p>";
    }
    return group += "  </div>\n</div>";
  };

  /*
  Create a button group, which represents the actions of the control.
  */


  FormBuilder.prototype._buttonGroup = function(buttonFn) {
    return "<div class='form-actions'>\n  " + buttonFn + "\n</div>";
  };

  /*
  Create a Textbox from a property.
  */


  FormBuilder.prototype._textBox = function(property, value) {
    return "<input type='text' id='ctrl-" + property.name + "' ng-model='datum." + property.name + "'\n       value='" + value + "' class='input-xlarge'>";
  };

  /*
  Create a true/false Radio Group
  */


  FormBuilder.prototype._radioGroupTrueFalse = function(property, value) {
    var selectedFalse, selectedTrue, _ref;
    _ref = (value != null) && value ? ["false", "true"] : ["true", "false"], selectedFalse = _ref[0], selectedTrue = _ref[1];
    return "<label class='radio'>\n  <input type='radio' id='ctrl-" + property.name + "' name='ctrl-" + property.name + "'\n         ng-model='datum." + property.name + "' value='true' ng-checked='" + selectedTrue + "'> True\n</label>\n<label class='radio'>\n  <input type='radio' id='ctrl-" + property.name + "' name='ctrl-" + property.name + "'\n         ng-model='datum." + property.name + "' value='false' ng-checked='" + selectedFalse + "'> False\n</label>\n";
  };

  /*
  Create a select group.
  */


  FormBuilder.prototype._selectGroup = function(property, value) {
    var content, option, selected, _i, _len, _ref;
    content = "<select class='input-xlarge'";
    if (property.type === "array") {
      content += "multiple='multiple'>";
    } else {
      content += ">";
    }
    _ref = property.options;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      option = _ref[_i];
      selected = option === value ? "selected='selected'" : "";
      content += "<option " + selected + ">" + option + "</option>";
    }
    return content += "</select>";
  };

  /*
  Create an Array of Strings sub control.
  */


  FormBuilder.prototype._arrayOfStringsControl = function(property) {
    return "<stringcollection target='" + property.name + "'></stringcollection>";
  };

  /*
  Called by Angular when it's time to party.
  */


  FormBuilder.prototype.link = function(scope, element, attrs) {
    var _this = this;
    return scope.$parent.schema.then(function(schema) {
      var content, control, controlType, property, value, _i, _len, _ref, _ref1;
      scope.datum = (_ref = scope.$parent.datum) != null ? _ref : _this._makeDefaultDatum(schema.properties);
      scope.save = function() {
        return scope.$parent.$broadcast("formbuilder#saved", scope.datum);
      };
      scope.back = function() {
        return window.history.back();
      };
      content = "<form class='form-horizontal'>\n  <fieldset>";
      _ref1 = schema.properties;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        property = _ref1[_i];
        value = scope.datum[property.name];
        controlType = property.customType != null ? property.customType : property.type;
        control = (function() {
          switch (controlType) {
            case "boolean":
              return this._radioGroupTrueFalse(property, value);
            case "array":
              return this._arrayOfStringsControl(property);
            case "selectFromOptions":
              return this._selectGroup(property, value);
            default:
              return this._textBox(property, value);
          }
        }).call(_this);
        content += _this._controlGroup(property, control);
      }
      content += _this._buttonGroup("<button type='button' class='btn btn-primary actionBtnWidth' ng-click='save()'>Save</button>\n<button type='button' class='btn actionBtnWidth' ng-click='back()'>Cancel</button>");
      content += "  </fieldset>\n</form>";
      element.append(content);
      return _this.$compile(element.contents())(scope);
    });
  };

  return FormBuilder;

})();

define(["ang", "lodash", "jquery", "directives/directives", "inflection"], function(angular, _, $, directives) {
  console.log("Registering directive formbuilder");
  return directives.directive("formbuilder", [
    "$compile", function($compile) {
      return new FormBuilder($compile);
    }
  ]);
});

/*
//@ sourceMappingURL=form-builder.js.map
*/
