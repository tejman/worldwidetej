var mongoose = require('mongoose');

var pageImageSchema = new mongoose.Schema({
  pageUrl: String,
  dataUrl: String
});

var pageImageMOdel = module.exports = mongoose.model("pageImage", pageImageSchema);

