define(["controllers/controllers", "services/menu"], function(controllers) {
  return controllers.controller("MenuController", [
    "$scope", "menuService", function($scope, menuService) {
      return $scope.menuItems = menuService.items;
    }
  ]);
});

/*
//@ sourceMappingURL=menu.js.map
*/
