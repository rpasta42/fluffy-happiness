var slideSpeed = 'fast'; //'slow';
var prevPage = '#page-home';

function onResize() {
   var pageHeight = ($(window).height() - $('#top-pan').height() - 1) + 'px';
   //console.log('pageHeight: ' + pageHeight);
   $('.page').css('height', pageHeight);
}

function init() {
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

   $('.back').hide();

   var t1 = $('#third-front');
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
   }

});

var x = 'X'; var y = 'Y'; var z = 'Z';
function rotate(el, axis, deg) {
   el.css('transform', 'rotate' + axis + '(' + deg + 'deg)');
}

function animate(el, name, duration) {
   el.css('animation-name', name);
   el.css('animation-duration', duration + 's');
   el.css('animation-fill-mode', 'forwards');
}



