###
Dynamically constructs a form from Deployd's resource schema.
###
class FormBuilder

  restrict: "E"
  replace: true
  transclude: true
  scope: {}

  ###
  Keep a reference to $compile so we can get Angular to evaluate the
  dynamic content when we are done constructing it.
  ###
  constructor: (@$compile) ->
    console.log "Form Builder instantiated"

  ###
  Construct an object with the default values or null.
  ###
  _makeDefaultDatum: (properties)->
    datum = {}
    for property in properties
      datum[property.name] = property.defaultValue ? null
    datum

  ###
  Create a control group, which will wrap the supplied control.
  ###
  _controlGroup: (property, control) ->
    group = """
            <div class='control-group'>
              <label class='control-label' for='ctrl-#{property.name}'>#{property.humanized}:</label>
              <div class='controls'>
                #{control}
              """
    if property.description?
      group += "<p class='help-block'>#{property.description}</p>"

    group += """
               </div>
             </div>
             """

  ###
  Create a button group, which represents the actions of the control.
  ###
  _buttonGroup: (buttonFn) =>
    """
    <div class='form-actions'>
      #{buttonFn}
    </div>
    """

  ###
  Create a Textbox from a property.
  ###
  _textBox: (property, value) =>
    """
    <input type='text' id='ctrl-#{property.name}' ng-model='datum.#{property.name}'
           value='#{value}' class='input-xlarge'>
    """

  ###
  Create a true/false Radio Group
  ###
  _radioGroupTrueFalse: (property, value) =>
    # Figure out which button should be selected.
    [selectedFalse, selectedTrue] = if (value? and value) then ["false","true"] else ["true","false"]

    """
    <label class='radio'>
      <input type='radio' id='ctrl-#{property.name}' name='ctrl-#{property.name}'
             ng-model='datum.#{property.name}' value='true' ng-checked='#{selectedTrue}'> True
    </label>
    <label class='radio'>
      <input type='radio' id='ctrl-#{property.name}' name='ctrl-#{property.name}'
             ng-model='datum.#{property.name}' value='false' ng-checked='#{selectedFalse}'> False
    </label>

    """

  ###
  Create a select group.
  ###
  _selectGroup: (property, value) =>
    content = "<select class='input-xlarge'"
    if property.type is "array"
      content += "multiple='multiple'>"
    else
      content += ">"
    for option in property.options
      selected = if option is value then "selected='selected'" else ""
      content += "<option #{selected}>#{option}</option>"
    content += "</select>"

  ###
  Create an Array of Strings sub control.
  ###
  _arrayOfStringsControl: (property) =>
    """
    <stringcollection target='#{property.name}'></stringcollection>
    """

  ###
  Called by Angular when it's time to party.
  ###
  link: (scope, element, attrs) =>

    # Schema is loaded from the serve, and is a "Promise".
    # Instead of doing some wierd stuff waiting for it to come back,
    # we can leave a handler to process the schema when it comes back
    # with data.
    scope.$parent.schema.then (schema) =>

      # If datum exists (edit) we set the scope datum to it, else (new) we
      # create a prototype.
      scope.datum = scope.$parent.datum ? @_makeDefaultDatum schema.properties

      # Save the record!
      scope.save = ->
        scope.$parent.$broadcast "formbuilder#saved", scope.datum

      # Go back!
      scope.back = ->
        window.history.back()

      # Content header.
      content = """
                <form class='form-horizontal'>
                  <fieldset>
                """

      # Iterate over the properties and generate controls
      for property in schema.properties
        value = scope.datum[property.name]

        controlType = if property.customType? then property.customType else property.type

        # Determine the best control for this property
        control = switch controlType
          when "boolean"           then @_radioGroupTrueFalse(property, value)
          when "array"             then @_arrayOfStringsControl(property)
          when "selectFromOptions" then @_selectGroup(property, value)
          else @_textBox(property, value)

        # Generate the content specific to the control
        content += @_controlGroup property, control


      # Add the form actions.
      content += @_buttonGroup """
        <button type='button' class='btn btn-primary actionBtnWidth' ng-click='save()'>Save</button>
        <button type='button' class='btn actionBtnWidth' ng-click='back()'>Cancel</button>
        """

      # Content footer
      content += """
                   </fieldset>
                 </form>
                 """

      # Append the content to the element
      element.append content

      # Instruct Angular to compile and apply the scope variable to the element.
      @$compile(element.contents())(scope)




define ["ang", "lodash", "jquery", "directives/directives", "inflection"], (angular, _, $, directives)->

  console.log "Registering directive formbuilder"

  directives.directive "formbuilder", [ "$compile", ($compile)  -> return new FormBuilder($compile) ]