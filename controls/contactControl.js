// Generated by CoffeeScript 1.7.1
(function() {
  var formatEmail, sendgrid;

  sendgrid = (require("sendgrid"))(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

  formatEmail = function(formData) {
    var email;
    email = {};
    email.to = "rudrarajut@gmail.com";
    email.from = formData["from"];
    email.subject = formData.who.join("-") + ":  " + formData.subject;
    email.text = formData.text + "\n \n" + "NAME OF SENDER: " + formData.name;
    return email;
  };

  module.exports = {
    validate: function(req, res) {
      var formData;
      console.log(req.query);
      formData = req.query;
      sendgrid.send(formatEmail(formData), function(err, json) {
        if (err) {
          console.error(err);
        }
        return console.log("sendgrid result: ", json);
      });
      return res.send("success");
    }
  };

}).call(this);
