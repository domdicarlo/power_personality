jQuery(document).ready(function() {
/* This is to fix the hover flyout on mobile devices */
	if( navigator.userAgent.match(/Android/i) ||
	 navigator.userAgent.match(/webOS/i) ||
	 navigator.userAgent.match(/iPhone/i) ||
	 navigator.userAgent.match(/iPod/i) ||
	 navigator.userAgent.match(/BlackBerry/)
	 ){
		jQuery('.widget_nav_menu ul li.menu-item a').click(function() {
			var listChildren = jQuery(this).parent().children('ul').css('display','block');
		});
	}
});