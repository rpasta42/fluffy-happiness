var slideSpeed = 'fast'; //'slow';
var prevPage = '#page-home';
var duration = 0.2;//0.3; //0.5;
var durationMilli = duration * 1000;
var checkIfNeedsToFlipBackDelay = 300;
var debug = false;

function onResize() {
   var pageHeight = ($(window).height() - $('#top-pan').height() - 1) + 'px';
   //console.log('pageHeight: ' + pageHeight);
   $('.page').css('height', pageHeight);
}

function init() {
   var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
   var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
   var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
   var is_safari = navigator.userAgent.indexOf("Safari") > -1;
   var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
   if ((is_chrome)&&(is_safari)) {is_safari=false;}
   if ((is_chrome)&&(is_opera)) {is_chrome=false;}
   if (is_safari)
      alert("This page is broken on Safari. It will be fixed whenever I have access to Mac machine. Sorry inconvenience");

   $('.page').hide();
   onResize();
   $(window).resize(() => onResize());
   $(prevPage).show(); //slideDown();
}

$(function() {
   init();

   $('.nav-i > a').hover(function () {
      $(this).addClass('hovered');
   });
   $('.nav-i > a').mouseout(function() {
      $(this).removeClass('hovered');
   });

   $('.nav-i').click(function () {
      /*$('.nav-i').each(function() {
         $(this).removeClass('active');
      });*/
      $('.nav-i').removeClass('active');
      $(this).addClass('active');

      var tabId = $(this).attr('id');
      var pageId = '#page' + tabId.substr(3, tabId.length);

      console.log('sliding: ' + pageId);
      $(prevPage).slideUp(slideSpeed, function () {
         $(pageId).slideDown(slideSpeed);
      });

      prevPage = pageId;
   });

   /*var finished = true;
   var hovering = false;
   var t = $('#third-front');

   function checkIfHovering() {
      if (hovering)
         setTimeout(checkIfHovering, 100);
      else {
         animate(t, 'rotate-y-backwards-180', 1);
         setTimeout(()=>finished = true, 1000);
      }
   }

   t.hover(() => {
      if (hovering)
         return;
      if (!finished)
         return;

      hovering = true; finished = false;
      animate(t, 'rotate-y-forward-180', 1);
      setTimeout(checkIfHovering, 1400);
   });

   t.mouseout(function() {
      hovering = false;
   });*/

   $('.back').append('<a class="run"><h1>Run!</h1></a>');
   $('#first > .back > .run').attr('href', 'https://forty7.org/buz/burnz/');
   $('#second > .back > .run').attr('href', 'https://forty7.org/fun/ideal-octo-spork/');
   $('#third > .back > .run').attr('href', 'https://forty7.org/fun/gol3d/gol/');
   $('#fourth > .back > .run').attr('href', 'https://forty7.org/ira');
   $('#fifth > .back > .run').attr('href', 'https://forty7.org/fun/wheel/');

  $('.back').hide();
  var t = $('.tiles');

   var status = {};
   t.each(function() {
      var id = $(this).attr('id');
      status[id] = 'inactive';
   });


   t.hover(function() {
      var el = $(this);
      var id = el.attr('id');

      if (status[id] != 'inactive') {
         if (debug) console.log("hovered, but we're busy: " + id);
         return;
      }
      else
         if (debug) console.log('hovered, going to rotate: ' + id);

      status[id] = 'started';

      var f = el.find('.front');
      var b = el.find('.back');

      animate(f, 'rotate-y-forward-90', duration);
      setTimeout(function() { onHalfRot(el, f, b) }, durationMilli);
   });

   function onHalfRot(el, f, b) {
      b.show();
      f.hide();
      //rotate(b, y, 90);
      animate(b, 'rotate-y-backwards-90', duration);
      var id = el.attr('id');
      setTimeout(function() { status[id] = 'turned'; checkIfLeft(id); }, durationMilli);
   }

   function checkIfLeft(id) {
      var el = $('#' + id);
      if (debug) console.log($('#' + id + ':hover'));
      if ($('#' + id + ':hover').length == 0) {
         onMouseOutRec(el);
      }
      else
         setTimeout(function() { checkIfLeft(id); }, checkIfNeedsToFlipBackDelay);
   }

   function onHalfBackRot(el, f, b) {
      f.show();
      b.hide();
      var id = el.attr('id');

      //rotate(f, y, 90);
      if (debug) console.log('got here');
      setTimeout(function() {
         if (debug) console.log('finished rotating back');
         status[id] = 'inactive';
      }, durationMilli);
      animate(f, 'rotate-y-backwards-90', duration);
   }

   function onMouseOutRec(el) {
      var id = el.attr('id');
      /*if (status[id] != 'turned' && status3[id] == true) {
         console.log("we haven't finished turning yet, can't turn back: " + id);
         setTimeout(function() { onMouseOutRec(el); }, 500);
         return;
      }
      else
         console.log('rotating back: ' + id);*/
      status[id] = 'startback';
      var f = el.find('.front');
      var b = el.find('.back');

      rotate(b, y, 0);
      animate(b, 'rotate-y-forward-90', duration);
      setTimeout(function() { onHalfBackRot(el, f, b); }, durationMilli);
   }

   function onMouseOut() {
      var el = $(this);
      onMouseOutRec(el);
   }

   //t.mouseout(onMouseOut);
   /*var t1 = $('#third-front');
   var t2 = $('#third-back');

   t1.hover(() => {
      animate(t1, 'rotate-y-forward-90', 0.5);
      setTimeout(onHalfRot, 500);
   });
   function onHalfRot() {
      t1.hide();
      //rotate(t2, y, 90);
      t2.show();
      animate(t2, 'rotate-y-backwards-90', 0.5);
   }*/
});

function animate(el, name, duration) {
   el.css('animation-name', name);
   el.css('animation-duration', duration + 's');
   el.css('animation-fill-mode', 'forwards');
}

var x = 'X'; var y = 'Y'; var z = 'Z';
function rotate(el, axis, deg) {
   el.css('transform', 'rotate' + axis + '(' + deg + 'deg)');
}

