(function () {
  angular.module("tillsalu.providers", []).factory('tillSaluData', function($http) {
    return {
      getData: function () {
        return $http.get("./data.json");
      }
    };
  });

  angular.module("tillsalu", ["tillsalu.providers", "ui.mask"]).controller("MainController", ['$scope', '$http', 'tillSaluData', function($scope, $http, tillSaluData) {
    $scope.domain = window.location.hostname;

    tillSaluData.getData().success(function (data) {
      $scope.price = data.pris;
      $scope.contact = data.email;
      $scope.owner = data.owner;
      $scope.owner_site = data.owner_site || "mailto:" + data.email;
    });

  }]);
})(window.angular);
