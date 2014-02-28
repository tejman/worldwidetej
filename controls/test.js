

var page = require("webpage").create();
console.log('in phantom script');
page.open("http://atom.io/", function(){
  var dataURL = page.renderBase64("PNG");
  console.log("render trigger");
  setTimeout(function(){
    console.log("settimout trigger");
    phantom.exit(dataURL);
    return dataURL
  }, 2000);
  console.log(dataURL);
  return dataURL
});
