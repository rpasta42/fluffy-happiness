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
   var t = $('.third');
   t.click(() => {
      t.css('animation-name', 'mymove');
      t.css('animation-duration', '1s');
      t.css('animation-fill-mode', 'forwards');
   });
});



