exec = (require "child_process").exec

frontControl = module.exports = {
  landing: (req, res)->

    res.render("landing")
    return false

  getImageUrl: (req, res)->
    ()->
      data = exec "phantomjs test.js", (error, stdout, stderr)->
        return stdout
      console.log data
      return data
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
