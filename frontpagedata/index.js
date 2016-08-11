function onResize() {
   var pageHeight = ($(window).height() - $('#top-pan').height() - 1) + 'px';
   //console.log('pageHeight: ' + pageHeight);
   $('.page').css('height', pageHeight);
}

$(function() {
   var slideSpeed = 'fast'; //'slow';
   var prevPage = '#page-home';

   onResize();
   $(window).resize(function() {
      onResize();
   });

   //$('.page').css('display', 'none');
   $('.page').hide();

   $(prevPage).show(); //slideDown();

   /*var pos = 90 + $('#tux').width() + $('#name-text').width();
   $('#top-tabs').css('left', pos + 'px');*/

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

});

