sendgrid = (require "sendgrid") global.process.env.SENDGRID_USERNAME, global.process.env.SENDGRID_PASSWORD 


formatEmail = (formData)->
  email = {}
  email.to = "rudrarajut@gmail.com"
  email.from = formData["from"] 
  formWho = if isArray(formData.who) then formData.who.join("-") else formData.who
  email.subject = formWho+":  "+formData.subject
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