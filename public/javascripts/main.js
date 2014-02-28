

$(function(){
  $(document).foundation();


  $(".jumbotron").css({
    height: ($(window).height()).toString()+"px",
    paddingTop: (($(window).height()/5)).toString()+"px"
  });

  var linkImages = $(".dataURL");
  var linkUrls = linkImages.map(function(item){
    $(item).closest("a").attr("href");
  });

  // $.get("/loagImages", {urls: linkUrls}, function(data){
  //   for (var i = 0; i < linkImages.length; i++) {
  //     $(linkImages[i]).attr("src", data[i].toString())
  //   };
  // });

});

