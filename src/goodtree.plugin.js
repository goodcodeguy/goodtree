(function ( $ ) {
	$.fn.goodtree = function( options ) {

		// Default Settings
		var settings = $.extend({
			'expand_icon' : 'images/tree/expand.png',
			'contract_icon' : 'images/tree/contract.png',
			'class_prefix' : 'goodtree_',
		}, options);

		return this.each(function() {

			// Hide all of the children Elements
			$(this).find('ul').hide();

			// Add the plus minus buttons
			$(this).find('li').each(function() {
				if($(this).children('ul').length > 0) 
					$(this).prepend("<div class='" + settings.class_prefix + "toggle closed'></div>");
			});

			// Events
			$('.' + settings.class_prefix + 'toggle').click(function() {
				$(this).parent().children('ul').toggle();
				$(this).hasClass('open') ? $(this).removeClass('open').addClass('closed') : $(this).removeClass('closed').addClass('open');
			});

		});

	};
}) ( jQuery );