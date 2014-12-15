$(function(){
  
  var video = {
    width : 1270,
    height: 720,
    prevCurrentTime: 0,
    $elm  : $('.video'),
    $innerElm: $('.js-video__inner')
  };
  video.aspectRatio = video.width/video.height;

  // event
  video.$elm.on('timeupdate ', function(e){
    console.log('duration time : ' + (e.currentTarget.currentTime - video.prevCurrentTime));
    video.prevCurrentTime = e.currentTarget.currentTime;
  });
  
  
  function getVideoWidth(windowHeight){
    return (windowHeight * video.aspectRatio) + 'px';
  }
  
  function getVideoOffsetLeft(windowWidth){
    var left = 0;
    if(windowWidth < video.width){
      left = (video.$elm.width() - windowWidth) / 2 * -1;
    }
    return left + 'px';
  }

  function resizeVideo(windowWidth, windowHeight){
    video.$innerElm.css('left', getVideoOffsetLeft(windowWidth));
    video.$elm.css('minWidth', getVideoWidth(windowHeight));
  }
  
  // main
  
  $(window).on('resize', function(){
    resizeVideo(window.innerWidth, window.innerHeight);
  }).trigger('resize');
  
});
