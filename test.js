

var page = require("webpage").create();
page.open("http://github.com", function(){
  var dataURL = page.renderBase64("PNG");
  setTimeout(function() {
    console.log(dataURL);
    phantom.exit();
  }, 1000);
  return dataURL
});

