sendgrid = (require "sendgrid") global.env.SENDGRID_USERNAME, global.env.SENDGRID_PASSWORD 


formatEmail = (formData)->
  email = {}
  email.to = "rudrarajut@gmail.com"
  email.from = formData["from"] 
  console.log formData.who
  email.subject = formData.who.join("-")+":  "+formData.subject
  email.text = formData.text + "\n \n" + "NAME OF SENDER: " + formData.name
  return email


module.exports = {
  validate: (req, res)->
    console.log(req.query)
    formData = req.query
    sendgrid.send formatEmail(formData), (err, json)->
      if err
        console.error(err)
      console.log("sendgrid result: ",json)
      
    res.send "success"
};