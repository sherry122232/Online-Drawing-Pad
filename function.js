var ctx, color = "#000";

$(document).ready(function() {

  // setup a new canvas for drawing wait for device init
  setTimeout(function() {
    newCanvas();
  }, 1000);

  // reset palette selection (css) and select the clicked color for canvas strokeStyle
  $(".palette").click(function() {
    $(".palette").css("border-color", "#777");
    $(".palette").css("border-style", "solid");
    $(this).css("border-color", "#fff");
    $(this).css("border-style", "dashed");
    color = $(this).css("background-color");
    ctx.beginPath();
    ctx.strokeStyle = color;
  });

  // link the new button with newCanvas() function
  $("#new").click(function() {
    newCanvas();
  });
  $("#save").click(function() {
    saveCanvas();
  });
});

// function to setup a new canvas for drawing
var timestamp = (new Date()).valueOf();
var timestamp2 = 0;


function saveCanvas(){
        var type ='png';
        var d=document.getElementById("canvas");
        var imgdata=d.toDataURL(type);

        var savaFile=function(data,filename)
        {
            var save_link=document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href=data;
            save_link.download=filename;
            var event=document.createEvent('MouseEvents');
            event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
            save_link.dispatchEvent(event);
        };
        var filename=''+new Date().getSeconds()+'.'+type;
        //我想用当前秒是可以解决重名的问题了 不行你就换成毫秒
        savaFile(imgdata,filename);
        };
//
// //save the drawing
// function saveCanvas() {
//   var img = new Image();
//   var myCanvas = document.getElementById("canvas");
//   var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//   window.location.href = image; // it will save locally
// myCanvas.setAttribute("href", image);
//   console.log(timestamp2); //Time cost
// }

//start drawing on a new canvas
function newCanvas() {
  //define and resize canvas
  $("#content").height($(window).height() - 40);
  var canvas = '<canvas id="canvas" width="' + ($(window).width()-600) + '" height="' + ($(window).height() - 40) + '"></canvas>';

  $("#content").html(canvas);

  // setup canvas
  ctx = document.getElementById("canvas").getContext("2d");
  ctx.strokeStyle = color;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, $(window).width()-600, $(window).height() - 40);
  ctx.lineWidth = 5;

  // setup to trigger drawing on mouse or touch
  $("#canvas").drawTouch();
  $("#canvas").drawPointer();
  $("#canvas").drawMouse();
}

// prototype to	start drawing on touch using canvas moveTo and lineTo
$.fn.drawTouch = function() {
  var start = function(e) {
    e = e.originalEvent;
    ctx.beginPath();
    x = e.changedTouches[0].pageX-300;
    y = e.changedTouches[0].pageY - 5;
    ctx.moveTo(x, y);
  };
  var move = function(e) {
    e.preventDefault();
    e = e.originalEvent;
    x = e.changedTouches[0].pageX-300;
    y = e.changedTouches[0].pageY - 5;
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  $(this).on("touchstart", start);
  $(this).on("touchmove", move);
};

// prototype to	start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
$.fn.drawPointer = function() {
  var start = function(e) {
    e = e.originalEvent;
    ctx.beginPath();
    x = e.pageX-300;
    y = e.pageY - 5;
    ctx.moveTo(x, y);
  };
  var move = function(e) {
    e.preventDefault();
    e = e.originalEvent;
    x = e.pageX-300;
    y = e.pageY - 5;
    ctx.lineTo(x, y);

    ctx.stroke();
  };
  $(this).on("MSPointerDown", start);
  $(this).on("MSPointerMove", move);
};

// prototype to	start drawing on mouse using canvas moveTo and lineTo
$.fn.drawMouse = function() {
  var clicked = 0;
  var start = function(e) {
    timestamp = (new Date()).valueOf();
    clicked = 1;
    ctx.beginPath();
    x = e.pageX-300;
    y = e.pageY - 5;
    ctx.moveTo(x, y);

  };
  var move = function(e) {
    if (clicked) {
      x = e.pageX-300;
      y = e.pageY - 5;
      ctx.lineTo(x, y);

      timestamp2 = timestamp2 + (new Date()).valueOf() - timestamp;
      console.log(x, y);

      ctx.stroke();
    }
  };

  var stop = function(e) {
    clicked = 0;
  };


  $(this).on("mousedown", start);
  $(this).on("mousemove", move);
  $(window).on("mouseup", stop);
};
