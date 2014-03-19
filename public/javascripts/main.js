

$(function(){
//////Function Definitions

  var isScrolledIntoView = function (elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    console.log($(elem).offset().top)
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
    setJumbotronScroll();
  }

  var setJumbotronScroll = function(){
    $("#jumbotron-scroll").css({
      right: (($(window).width()/2)-(parseInt($("#jumbotron-scroll").css("width"))/2)).toString()+"px"
    });
  }

  var toggleMenu = function() {
    if ($(window).scrollTop() > $(window).height() - 63) {
      $(".top-bar").slideDown("slow");
    }
    else {
      $(".top-bar").hide();
    }
  }

  var scrollDown = function (elem) {
    var scrollTo = elem ? $(elem).offset().top : $(window).height() - 61;
    $("html, body").animate({ scrollTop: scrollTo}, 1500);
  }


////////End Functions



/////MAIN CODE

  var sectionLabels = $(".section-label");

  $(document).foundation();
  $(function(){ $(".flipster").flipster(); });

  $(document).on("click", ".toggle-topbar", function(e){
    e.preventDefault();
  });

  $(".jumbotron").backstretch("/images/mountain.jpg");
  setJumbotron(".jumbotron");

  $(document).on("scroll", function(e){
    toggleMenu();
    for (var i = sectionLabels.length - 1; i >= 0; i--) {
      if(isScrolledIntoView($(sectionLabels[i]))){
        console.log("true");
        $(sectionLabels[i]).animate({left: "5px"}, 500);
      }
    };
  });

  $(document).on("click", "#jumbotron-scroll", function(){
    scrollDown();
    toggleMenu();
  });

  $(document).on("click", ".send-email", function(e){
    e.preventDefault();
    scrollDown("#contact-form");
  });

  $(window).on("resize", function(){
    setJumbotronScroll();
  });

  //////Crawl for webpage links and grab the screenshot
  var linkImages = $(".dataURL");

  var linkUrls = linkImages.map(function(ind, item){
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

