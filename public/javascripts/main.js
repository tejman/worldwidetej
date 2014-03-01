

$(function(){
  $(document).foundation();


  $(".jumbotron").css({
    height: ($(window).height()).toString()+"px",
    paddingTop: (($(window).height()/5)).toString()+"px"
  });

  var linkImages = $(".dataURL");

  var linkUrls = linkImages.map(function(ind, item){
    console.log(ind, item);
    console.log($(item).closest("a").attr("href"));
    return $(item).closest("a").attr("href");
  });

  serialLinkUrls = JSON.stringify(linkUrls.toArray());

  $.get("/loadImages", {urls: serialLinkUrls}, function(data){
    console.log(data);
    for (var i = 0; i < linkImages.length; i++) {
      var url64 = data[i]?"data:image/png;base64,"+data[i].toString():"http://placehold.it/150x150";
      $(linkImages[i]).attr({
        alt: "Embedded Image",
        src: url64
      });
    };

  });

});

