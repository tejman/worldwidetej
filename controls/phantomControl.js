// Generated by CoffeeScript 1.7.1
(function() {
  var binPath, childProcess, pageImageModel, path, phantomjs;

  path = require("path");

  childProcess = require("child_process");

  phantomjs = require("phantomjs");

  binPath = phantomjs.path;

  pageImageModel = require("../models/pageImageModel.js");

  module.exports = {
    getDataUrl: function(req, res) {
      var count, dataUrlArray, runPhantom, url, urlArray, _i, _len;
      console.log("route triggered");
      urlArray = JSON.parse(req.query.urls);
      count = 0;
      dataUrlArray = [];
      runPhantom = function(i, url) {
        return pageImageModel.findOne({
          pageUrl: url
        }, function(err, result) {
          var childArgs;
          if (err) {
            console.log(err);
            dataUrlArray[i] = "http://placehold.it/150x150";
            count++;
            if (count === urlArray.length) {
              res.send(dataUrlArray);
              return false;
            }
          } else if (result) {
            console.log("found item in db: ", result.pageUrl);
            dataUrlArray[i] = result.dataUrl;
            count++;
            if (count === urlArray.length) {
              res.send(dataUrlArray);
              return false;
            }
          } else if (!result) {
            console.log("Phantom trigger");
            childArgs = [path.join(__dirname, "test.js"), url];
            childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
              var newDoc;
              count++;
              dataUrlArray[i] = stdout;
              newDoc = new pageImageModel({
                pageUrl: url,
                dataUrl: stdout
              });
              newDoc.save();
              if (count === urlArray.length) {
                res.send(dataUrlArray);
              }
              return false;
            });
          }
          return false;
        });
      };
      for (_i = 0, _len = urlArray.length; _i < _len; _i++) {
        url = urlArray[_i];
        runPhantom(_i, url);
      }
      return false;
    }
  };

}).call(this);
