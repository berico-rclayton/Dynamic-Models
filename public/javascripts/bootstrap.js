define(["require", "ang", "app"], function(require, angular) {
  return require(["vendor/domReady!"], function(document) {
    return angular.bootstrap(document, ["app"]);
  });
});

/*
//@ sourceMappingURL=bootstrap.js.map
*/
