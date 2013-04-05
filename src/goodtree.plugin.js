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
					$(this).prepend("<a href='#' onclick='return false;' class='" + settings.class_prefix + "toggle closed'><img class='" + settings.class_prefix + "expand_icon' src='" + settings.expand_icon + "' /></a>");
			});

			// Events
			$('.' + settings.class_prefix + 'toggle').click(function() {
				$(this).parent().children('ul').toggle();

				if($(this).hasClass('open'))
					$(this).removeClass('open').addClass('closed').html("<img class='" + settings.class_prefix + "expand_icon' src='" + settings.expand_icon + "' />");
				else
					$(this).removeClass('closed').addClass('open').html("<img class='" + settings.class_prefix + "contract_icon' src='" + settings.contract_icon + "' />");
			});


		});

	};
}) ( jQuery );