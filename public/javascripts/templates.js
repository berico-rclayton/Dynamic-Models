define(function () { var templates = {};

//
// Source file: [/Users/rclayton/Development/JavaScript/formBuilder/mimosa/assets/javascripts/templates/collection_strings.template]
// Template name: [collection_strings]
//
templates['collection_strings'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div>\n    <table class="table table-striped" style="width: 220px"\n           ng-show="collection.length > 0">\n        <tr ng-repeat="item in collection">\n            <td>\n                <i class="icon-pencil" ng-click="edit(item)"></i>\n                <i class="icon-remove" ng-click="remove(item)"></i>\n            </td>\n            <td>\n                <span class="text-info"\n                      style="margin-left: 16px; font-size: 12px">{{item}}</span>\n            </td>\n        </tr>\n    </table>\n    <input type="text" class="input-xlarge" ng-model="stringItem" />\n    <button type="button" class="btn btn-primary" ng-click="add()">\n        <i class="icon-plus icon-white"></i>\n    </button>\n    <button type="button" class="btn" ng-click="clear()">\n        <i class="icon-remove icon-white"></i>\n    </button>\n    <p ng-show="errorMessage" class="help-block"><span class="text-error">{{errorMessage}}</span></p>\n</div>';
}
return __p;
}()

//
// Source file: [/Users/rclayton/Development/JavaScript/formBuilder/mimosa/assets/javascripts/templates/layout_concept_definition.template]
// Template name: [layout_concept_definition]
//
templates['layout_concept_definition'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h2>Concept Definitions</h2>\n<hr />\n<div class="row">\n    <div class="span3">\n        <div ng-include="\'nav_concepts\'" />\n    </div>\n    <div class="span9">\n        <h3><span class="text-success">{{conceptTitle}}</span> Definition</h3>\n        <div>\n            <table class="table table-striped">\n                <thead>\n                    <tr>\n                        <th>Property</th>\n                        <th>Key</th>\n                        <th>Description</th>\n                        <th>Type</th>\n                        <th>Is Concept?</th>\n                        <th>Required</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr ng-repeat="property in schema.properties">\n                        <td>{{property.humanized}}</td>\n                        <td>{{property.name}}</td>\n                        <td>{{property.description}}</td>\n                        <td>{{property.type}}</td>\n                        <td>\n                            <a ng-show="property.refTo"\n                               href="#/concepts/{{property.refTo}}">\n                                {{property.refTo}}\n                            </a>\n                        </td>\n                        <td>{{property.required}}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div>\n            <div class="pull-right">\n                <button type="button" class="btn btn-primary"\n                        ng-click="goto(\'/concepts/\' + conceptName + \'/list\')">\n                    <i class="icon-list icon-white"></i>\n                    <span style="margin-left: 6px">List {{conceptTitle}}</span>\n                </button>\n                <button type="button" class="btn btn-success"\n                        ng-click="goto(\'/concepts/\' + conceptName + \'/new\')">\n                    <i class="icon-plus icon-white"></i>\n                    <span style="margin-left: 6px">New {{conceptSingular}}</span>\n                </button>\n            </div>\n        </div>\n    </div>\n</div>';
}
return __p;
}()

//
// Source file: [/Users/rclayton/Development/JavaScript/formBuilder/mimosa/assets/javascripts/templates/layout_concept_edit.template]
// Template name: [layout_concept_edit]
//
templates['layout_concept_edit'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h2>Concept Definitions</h2>\n<hr />\n<div class="row">\n    <div class="span3">\n        <div ng-include="\'nav_concepts\'" />\n    </div>\n    <div class="span9">\n        <div class="well well-small">\n            <h4>{{titleAction}} <span class="text-success">{{conceptSingular}}</span></h4>\n            <hr />\n            <formbuilder />\n        </div>\n    </div>\n</div>';
}
return __p;
}()

//
// Source file: [/Users/rclayton/Development/JavaScript/formBuilder/mimosa/assets/javascripts/templates/layout_concepts.template]
// Template name: [layout_concepts]
//
templates['layout_concepts'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h1>Tables!</h1>';
}
return __p;
}()

//
// Source file: [/Users/rclayton/Development/JavaScript/formBuilder/mimosa/assets/javascripts/templates/layout_edit_concept.template]
// Template name: [layout_edit_concept]
//
templates['layout_edit_concept'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
}
return __p;
}()

//
// Source file: [/Users/rclayton/Development/JavaScript/formBuilder/mimosa/assets/javascripts/templates/layout_home.template]
// Template name: [layout_home]
//
templates['layout_home'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h2>Introduction</h2>\n<hr />\n<div class="row">\n    <div class="span3">\n        <div ng-include="\'nav_concepts\'" />\n    </div>\n    <div class="span9">\n        Blah!\n    </div>\n</div>';
}
return __p;
}()

//
// Source file: [/Users/rclayton/Development/JavaScript/formBuilder/mimosa/assets/javascripts/templates/nav_concepts.template]
// Template name: [nav_concepts]
//
templates['nav_concepts'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div ng-controller="ConceptsNavController" class="well well-small" style="min-height: 350px">\n    <ul class="nav nav-list">\n        <li ng-class="{ active: currentPath == \'/\' }">\n            <a href="#/">Introduction</a>\n        </li>\n        <li ng-class="{ active: currentPath == \'/concepts\' }">\n            <a href="#/concepts">Concept Overview</a>\n        </li>\n        <li class="nav-header">Concepts</li>\n        <li ng-repeat="resource in resources"\n            ng-class="{ active: currentPath == (\'/concepts/def/\' + resource.id) }">\n            <a ng-href="#/concepts/{{resource.id}}">{{resource.id.titleize()}}</a>\n        </li>\n        <li class="nav-header">Export</li>\n        <li>\n            <a href="">Comma-Separated Values (CSV)</a>\n        </li>\n    </ul>\n</div>';
}
return __p;
}()
return templates; });