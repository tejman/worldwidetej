var sendgrid = require("sendgrid")();

module.exports = {
  validate: function(req, res){
    console.log(req.query);
    res.send("success");
  }
};