$(document).ready(function() {
  var backgroundImgTargetLeft = -1400;
  var backgroundImgTargetTop = -900;
  var backgroundSpeed = 20;
  var $backgroundImg = $('.background-img');
  var delayMillis = 700; //1 second

  var firstTime=true;
  var logoFirstTime=true;


  $('.about-mark').click(function(){
    backgroundImgTargetTop = -900; //About
    backgroundImgTargetLeft = -1400; //About
    hideLogo();
    hideJon();
    hideTyrion();
    hideDaenerys();
    hideBran();
    hideCersei();
    showAbout();
    console.log("Mark is clicked");
  });

  $('.btn-home').click(function() { //Home
    backgroundImgTargetTop = -900; //Home
    backgroundImgTargetLeft = -1400; //Home
    showLogo();
    hideJon();
    hideTyrion();
    hideDaenerys();
    hideBran();
    hideCersei();
    hideAbout();
  });

  $('.btn-one').click(function() { //Jon
    backgroundImgTargetTop = -1620; //Jon
    backgroundImgTargetLeft = -1520; //Jon
    hideLogo();
    showJon();
    hideTyrion();
    hideDaenerys();
    hideBran();
    hideCersei();
    hideAbout();
  });

  $('.btn-two').click(function() { //Tyrion
    backgroundImgTargetTop = -900; //Tyrion
    backgroundImgTargetLeft = -240; //Tyrion
    hideLogo();
    hideJon();
    showTyrion();
    hideDaenerys();
    hideBran();
    hideCersei();
    hideAbout();
  });

  $('.btn-three').click(function() { //Daenerys
    backgroundImgTargetTop = -180; //Daenerys
    backgroundImgTargetLeft = -880; //Daenerys
    hideLogo();
    hideJon();
    hideTyrion();
    showDaenerys();
    hideBran();
    hideCersei();
    hideAbout();
  });

  $('.btn-four').click(function() { //Bran
    backgroundImgTargetTop = -180; //Bran
    backgroundImgTargetLeft = -2160; //Bran
    hideLogo();
    hideJon();
    hideTyrion();
    hideDaenerys();
    showBran();
    hideCersei();
    hideAbout();
  });

  $('.btn-five').click(function() { //Cersei
    backgroundImgTargetTop = -900; //Cersei
    backgroundImgTargetLeft = -2780; //Cersei
    hideLogo();
    hideJon();
    hideTyrion();
    hideDaenerys();
    hideBran();
    showCersei();
    hideAbout();
  });

  function draw() {
    var offset = $backgroundImg.position();
    var offsetLeft = Math.floor(offset.left);
    var offsetTop = Math.floor(offset.top);

    if (offsetLeft > backgroundImgTargetLeft) {
      offsetLeft -= backgroundSpeed;
    } else if (offsetLeft < backgroundImgTargetLeft) {
      offsetLeft += backgroundSpeed;
    }

    if (offsetTop > backgroundImgTargetTop) {
      offsetTop -= backgroundSpeed;
    } else if (offsetTop < backgroundImgTargetTop) {
      offsetTop += backgroundSpeed;
    }

    $backgroundImg.css({
      top: offsetTop,
      left: offsetLeft
    });
    window.requestAnimationFrame(draw);    
  }
   window.requestAnimationFrame(draw);

  function showLogo(imgRig,imgRigObject){
  var imgRig = "<img class='img-logo' src='img/logorig.gif'>";
  var imgRigObject = $('.img-logo');

  if(logoFirstTime){
    $('.img-container').append(imgRig);
    logoFirstTime = false;
  }
    setTimeout(function() {
      $('.img-logo').css("transform","scale(1)");
    }, delayMillis);
  }

  function hideLogo(){
    $('.img-logo').css("transform","scale(0)");
  }

  function showJon(){
    var introText = $('#jon.intro');
    var imgRig = "<img class='img-rig' id='img-jon' src='img/jonsnow.gif'>";
    $('.img-container').append(imgRig);
    setTimeout(function() {
    //function to animate text
      // $('#jon.intro').css("opacity", "1"); 
      introText.css("width", "49%"); 
    //show gif
      $('#img-jon').css("transform","scale(1.1)");
    }, delayMillis);

    setTimeout(function() { 
      $('#img-jon').css("transform", "scale(0.9)");
    }, delayMillis+500);
    }

    function hideJon(){
      $('#jon.intro').css("width", "0%"); 
      $('#img-jon').css("transform","scale(0)");
    }

  function showTyrion(){
    var introText = $('#tyrion.intro');
    var imgRig = "<img class='img-rig' id='img-tyrion' src='img/tyrion.gif'>";
    $('.img-container').append(imgRig);
    setTimeout(function() {
    //function to animate text
      introText.css("width", "49%"); 
    //show gif
      $('#img-tyrion').css("transform","scale(1.1)");
    }, delayMillis);

    setTimeout(function() { 
      $('#img-tyrion').css("transform", "scale(0.9)");
    }, delayMillis+500);
    } 

  function hideTyrion() {
    $('#tyrion.intro').css("width", "0%"); 
    $('#img-tyrion').css("transform","scale(0)");
  }

  function showDaenerys(){
    var introText = $('#daenerys.intro');
    var imgRig = "<img class='img-rig' id='img-daenerys' src='img/daenerys.png'>"; //PLACEHOLDER
    $('.img-container').append(imgRig);
    setTimeout(function() {
    //function to animate text
      introText.css("width", "49%"); 
    //show gif
      $('#img-daenerys').css("transform","scale(1.1)");
    }, delayMillis);

    setTimeout(function() { 
      $('#img-daenerys').css("transform", "scale(0.9)");
    }, delayMillis+500);
    } 

  function hideDaenerys() {
    $('#daenerys.intro').css("width", "0%"); 
    $('#img-daenerys').css("transform","scale(0)");
  }

  function showBran(){
    var introText = $('#bran.intro');
    var imgRig = "<img class='img-rig' id='img-bran' src='img/bran.png'>"; //PLACEHOLDER
    $('.img-container').append(imgRig);
    setTimeout(function() {
    //function to animate text
      introText.css("width", "49%"); 
    //show gif
      $('#img-bran').css("transform","scale(1.1)");
    }, delayMillis);

    setTimeout(function() { 
      $('#img-bran').css("transform", "scale(0.9)");
    }, delayMillis+500);
    } 

  function hideBran() {
    $('#bran.intro').css("width", "0%"); 
    $('#img-bran').css("transform","scale(0)");
  }

  function showCersei(){
    var introText = $('#cersei.intro');
    var imgRig = "<img class='img-rig' id='img-cersei' src='img/cersei.png'>"; //PLACEHOLDER
    $('.img-container').append(imgRig);
    setTimeout(function() {
    //function to animate text
      introText.css("width", "49%"); 
    //show gif
      $('#img-cersei').css("transform","scale(1.1)");
    }, delayMillis);

    setTimeout(function() { 
      $('#img-cersei').css("transform", "scale(0.9)");
    }, delayMillis+500);
    } 

  function hideCersei() {
    $('#cersei.intro').css("width", "0%"); 
    $('#img-cersei').css("transform","scale(0)");
  }

  function showAbout(){
    setTimeout(function() {
    //function to animate text
      $('.about-text').css("opacity", "1"); 
    }, delayMillis);
    } 

  function hideAbout() {
    $('.about-text').css("opacity", "0"); 
  }  

  showLogo();


});



