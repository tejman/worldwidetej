

var page = require("webpage").create();
var system = require("system");

// console.log("ARGUEMENTS: ",system.args);

page.open(system.args[1], function(status){

  if (status==="success") {
    
    setTimeout(function(){
      var dataURL = page.renderBase64("PNG");
      console.log(dataURL);
      phantom.exit();
    }, 2000);
    
  };
  


});
