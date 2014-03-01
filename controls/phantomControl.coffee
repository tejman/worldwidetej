path = require "path"
childProcess = require "child_process"
phantomjs = require "phantomjs"
binPath = phantomjs.path
pageImageModel = require "../models/pageImageModel.js"


module.exports = {
  getDataUrl: (req, res)->

    console.log "route triggered"
    urlArray = JSON.parse(req.query.urls)
    count = 0
    dataUrlArray = []

    runPhantom = (i, url)->
      console.log("find in db: ", url, "result: ",pageImageModel.findOne({pageUrl: url}));
      if pageImageModel.findOne({pageUrl: url}) is not null
        console.log("found item in db: ", pageImageModel.findOne({pageUrl: url}))
        dataUrlArray[i] = pageImageModel.find({pageUrl: url})
        count++
        if count is urlArray.length
          res.send dataUrlArray

      childArgs = [path.join(__dirname, "test.js"),url]

      childProcess.execFile binPath, childArgs, (err, stdout, stderr)->
        # console.log "Print from Control: ", stdout
        console.log("child process spawn")
        count++
        dataUrlArray[i]=(stdout)
        console.log("before save", stdout.slice(0,50))
        newDoc = new pageImageModel({pageUrl: url, dataUrl: stdout})
        console.log("mongo doc:   ",newDoc)
        newDoc.save();
        console.log "Start of print ---------------",i, dataUrlArray
        if count is urlArray.length
          res.send dataUrlArray
        return false

    for url in urlArray
      runPhantom _i, url

    return false
}
