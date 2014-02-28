// console.log(process.argv);
console.log("test");
throw new Error(process.argv);

var page = require("webpage").create();
page.open("http://google.com", function(){
  var dataURL = page.renderBase64("PNG");
  phantom.exit();
  return dataURL
});

