require(["app", "components/menu/manifest", "services/menu"], function(app, manifest) {
  return app.run([
    "menuService", function(menuService) {
      return require(manifest, function() {
        var menuItem, _i, _len;
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          menuItem = arguments[_i];
          menuService.addItem(menuItem);
        }
        return menuService.refresh();
      });
    }
  ]);
});

/*
//@ sourceMappingURL=loader.js.map
*/
