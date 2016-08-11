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

var rotateDeg = 0;
function rotateFirst() {
   if (rotateDeg < 180) {
      rotateDeg += 2;
      var rotateStr = 'rotateY(' + rotateDeg + 'deg)';
      $('.first').css('transform', rotateStr);
      setTimeout(rotateFirst, 1);
   }
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

   $('.first').click(() => {
      //$('.first').css('transform', 'rotateY(180deg)');
      rotateFirst();
   });


   var hovering = false;
   var t = $('.third');

   function checkIfHovering() {
      if (hovering)
         setTimeout(checkIfHovering, 100);
      else
         animate(t, 'rotate-y-backwards-180', 1);
   }

   t.hover(() => {
      if (hovering)
         return;
      hovering = true;
      animate(t, 'rotate-y-forward-180', 1);
      setTimeout(checkIfHovering, 1400);
   });

   t.mouseout(function() {
      hovering = false;
   });
});

function animate(el, name, duration) {
   el.css('animation-name', name);
   el.css('animation-duration', duration + 's');
   el.css('animation-fill-mode', 'forwards');
}



