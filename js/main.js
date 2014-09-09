(function () {
  docTitle = window.location.hostname + " - Domän till salu";
  document.title = docTitle;

  $("#offerForm").submit(function(e) {
    e.preventDefault;

    var domain = $("#domainname").val(),
        name = $("#name").val(),
        email = $("#email").val(),
        bid = $("#bid").val(),
        toEmail = $("#toEmail").val();

        $.ajax({
          type: "POST",
          url: "https://mandrillapp.com/api/1.0/messages/send.json",
          data: {
            'key': '6S347zZmNGk5fXFP9MPlEQ',
            'message': {
              'from_email': email,
              'from_name': name,
              'headers': {
                'Reply-To': email,
                'CC': email
              },
              'subject': 'Bud på ' + domain,
              'html': name + ' har bjudit ' + bid + ' på ' + domain + '<br>Kontakta ' + name + ' via ' + email,
              'to': [{
                'email': toEmail,
                'name': "Radioteknik",
                'type': 'to'
              }]
            }
          }
        })
        .done(function (response) {
          alert("Your message has been sent");
        })
        .fail(function (response) {
          alert("Error sending message");
        });
  });

  $("#submit").on("click", function (e) {
    e.preventDefault();
    $("#offerForm").submit();
  });

})();

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
    });

  }]);
})(window.angular);
