path = require "path"
childProcess = require "child_process"
phantomjs = require "phantomjs"
binPath = phantomjs.path


module.exports = {
  getDataUrl: (req, res)->
    console.log "route triggered"
    childArgs = [path.join(__dirname, "test.js"),"test argument"]

    childProcess.execFile binPath, childArgs, (err, stdout, stderr)->
      console.log stdout
      res.send "control has run"
      return false
    
    return false
}
