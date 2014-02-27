$(function(){
  $(document).foundation();


  $(".jumbotron").css({
    height: ($(window).height()-45).toString()+"px",
    paddingTop: (($(window).height()/5)).toString()+"px"
  });
 

});