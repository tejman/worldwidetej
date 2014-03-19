// Generated by CoffeeScript 1.7.1
(function() {
  var formatEmail, sendgrid;

  sendgrid = (require("sendgrid"))(global.process.env.SENDGRID_USERNAME, global.process.env.SENDGRID_PASSWORD);

  formatEmail = function(formData) {
    var email, formWho;
    email = {};
    email.to = "rudrarajut@gmail.com";
    email.from = formData["from"];
    formWho = Array.isArray(formData.who) ? formData.who.join("-") : formData.who;
    email.subject = formWho + ":  " + formData.subject;
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
      return res.redirect("/");
    }
  };

}).call(this);
