(function () {
  /**
   * Set the document title based on the url name
   */
  docTitle = window.location.hostname + " - Domän till salu";
  document.title = docTitle;

  /**
   * Send form
   */
  $("#form").submit(function(e) {
    e.preventDefault;

    var domain = $("#domainname").val(),
        name = $("#name").val(),
        email = $("#email").val(),
        bid = $("#bid").val() || "ingenting",
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
                'Reply-To': email
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
        });
  });

  /**
   * Submit form
   */
  $("#submit").on("click", function (e) {
    e.preventDefault();
    $("#form").submit();
  });

  /**
   * Validate form
   */
  $("#form").validate({
    debug: true,
    rules: {
      name: "required",
      email: {
        required: true,
        email: true
      },
      bid: {
        required: true,
        number: true
      }
    },
    messages: {
      name: "Vänligen fyll i ditt namn.",
      email: {
        required: "Vi behöver en mailadress för att kunna kontakta dig.",
        email: "Din Email måste vara i formatet namn@domän.com"
      },
      bid: {
        required: "Vänligen ange ditt bud.",
        number: "Du måste uppge ett belopp."
      }
    },
    submitHandler: function() { 
      $("#submit").val("Tack!").addClass("success-send");
    }
  });

})();
