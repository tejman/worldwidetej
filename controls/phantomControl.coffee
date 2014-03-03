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
      
      pageImageModel.findOne {pageUrl: url}, (err, result)->
        if err
          console.log err
          dataUrlArray[i] = "http://placehold.it/150x150"
          count++
          if count is urlArray.length
            res.send dataUrlArray
            return false

        else if result
          console.log("found item in db: ", result.pageUrl)
          dataUrlArray[i] = result.dataUrl
          count++
          if count is urlArray.length
            res.send dataUrlArray
            return false

        else if not result
          console.log "Phantom trigger"
          childArgs = [path.join(__dirname, "test.js"),url]

          childProcess.execFile binPath, childArgs, (err, stdout, stderr)->
            count++
            dataUrlArray[i]=(stdout)
            newDoc = new pageImageModel({pageUrl: url, dataUrl: stdout})
            newDoc.save();
            if count is urlArray.length
              res.send dataUrlArray
            return false
        return false

    for url in urlArray
      runPhantom _i, url

    return false
}
