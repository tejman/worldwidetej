exec = (require "child_process").exec

frontControl = module.exports = {
  landing: (req, res)->

    res.render("landing")
    return false

  getImageUrl: (req, res)->
    exec "phantomjs test.js url", (error, stdout, stderr)->
      console.log(error, stderr)
      console.log "END ERROR PRINT"
      res.send stdout
    # res.send data


    # linkUrls = req.query.linkUrls
    # dataUrls = linkUrls.map ()->
    #   page.open url, ()->
    #     dataURL = page.renderBase64 "PNG"
    #     setTimeout ()->
    #       phantom.exit()
    #     ,5000
    #     dataURL
    # dataUrls
}
