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

   $('.first').click(() => {
      //$('.first').css('transform', 'rotateY(180deg)');
      /*$('.first').animate({
         transform: 'rotateY(180deg)'
      }/*, {
         step: function(now, fx) {

         }
      }*/);*/


   });

});



