

$(function(){
//////Function Definitions

  var isScrolledIntoView = function (elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }


  var setJumbotron = function(elem){
    $(".top-bar").hide();
    $(elem).css({
      height: ($(window).height()).toString()+"px",
      paddingTop: "20%",
      marginTop: (-$(".top-bar").outerHeight())+"px"
    });
    $("#jumbotron-scroll").css({
      right: (($(window).width()/2)-(parseInt($("#jumbotron-scroll").css("width"))/2)).toString()+"px"
    });
  }

  var toggleMenu = function() {
    if ($(window).scrollTop() > $(window).height() - 50) {
      console.log("navbar trigger");
      $(".top-bar").slideDown("slow");
      // $(".jumbotron").hide();
    }
    else {
      $(".top-bar").hide();
      // $(".jumbotron").show();
    }
  }

  var scrollDown = function () {
    $("html, body").animate({ scrollTop: $(window).height() - 49 });
  }


////////End Functions



/////MAIN CODE

  $(document).foundation();

  $(".jumbotron").backstretch("/images/mountain.jpg");
  setJumbotron(".jumbotron");

  $(document).on("scroll", function(e){
    toggleMenu();
  });

  $(document).on("click", "#jumbotron-scroll", function(){
    scrollDown();
    toggleMenu();
  });

  // $(".icon-links .link-icon").hover(function(){
  //   console.log(this);
  //   $(this).css("color", "#000");
  //   $(this).animate({color: "#FFF"}, 100, function(){return false});
  // });


  //////Crawl for webpage links and grab the screenshot
  var linkImages = $(".dataURL");

  var linkUrls = linkImages.map(function(ind, item){
    console.log(ind, item);
    console.log($(item).closest("a").attr("href"));
    return $(item).closest("a").attr("href");
  });

  serialLinkUrls = JSON.stringify(linkUrls.toArray());

  $.get("/loadImages", {urls: serialLinkUrls}, function(data){
    for (var i = 0; i < linkImages.length; i++) {
      var url64 = data[i]?"data:image/png;base64,"+data[i].toString():"http://placehold.it/150x150";
      $(linkImages[i]).attr({
        alt: "Embedded Image",
        src: url64
      });
    };

  });
  /////End crawl for screenshots



});

