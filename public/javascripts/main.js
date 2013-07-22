requirejs.config({
  paths: {
    jquery: "vendor/jquery",
    ang: "vendor/angular.min.1.1.4",
    lodash: "vendor/lodash",
    twitterBootstrap: "vendor/bootstrap",
    angui: "vendor/angular-ui.min",
    anguiboot: "vendor/ui-bootstrap-tpls.min",
    async: "vendor/async",
    inflection: "vendor/inflection"
  },
  shim: {
    "ang": {
      deps: ["vendor/modernizr"],
      exports: "angular"
    },
    "vendor/modernizr": {
      exports: "Modernizr"
    },
    "angui": {
      exports: "angui"
    },
    "twitterBootstrap": {
      deps: ["jquery"],
      exports: "bootstrp"
    },
    "anguiboot": {
      deps: ["twitterBootstrap"],
      exports: "anguiboot"
    },
    "inflection": {
      exports: "inflection"
    }
  }
});

requirejs(["app", "jquery", "lodash", "templates", "bootstrap", "twitterBootstrap", "directives/form-builder", "directives/collection-strings", "services/resource-loader", "controllers/main", "controllers/concepts-nav", "controllers/concepts", "controllers/concept-definition", "controllers/concept-edit"], function(app, $, _, templates) {
  app.config([
    "$routeProvider", function($routeProvider) {
      return $routeProvider.when("/", {
        controller: "MainController",
        templateUrl: "layout_home"
      }).when("/concepts", {
        controller: "ConceptsController",
        templateUrl: "layout_concepts"
      }).when("/concepts/:resource", {
        controller: "ConceptDefinitionController",
        templateUrl: "layout_concept_definition"
      }).when("/concepts/:resource/new", {
        controller: "ConceptEditController",
        templateUrl: "layout_concept_edit"
      }).when("/concepts/:resource/edit/:id", {
        controller: "ConceptEditController",
        templateUrl: "layout_concept_edit"
      }).otherwise({
        redirectTo: "/concepts"
      });
    }
  ]);
  return app.run([
    "$templateCache", function($templateCache) {
      var name, template, _results;
      console.log("Loading templates...");
      _results = [];
      for (name in templates) {
        template = templates[name];
        console.log("\tTemplate '" + name + "' loaded.");
        _results.push($templateCache.put(name, template));
      }
      return _results;
    }
  ]);
});

/*
//@ sourceMappingURL=main.js.map
*/
