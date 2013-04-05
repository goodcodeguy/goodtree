(function ( $ ) {
	$.fn.goodtree = function( options ) {

		// Default Settings
		var settings = $.extend({
			'expandIconClass' : 'closed',
			'contractIconClass' : 'open',
			'classPrefix' : 'goodtree_',
		}, options);

		return this.each(function() {

			// Hide all of the children Elements
			$(this).find('ul').hide();

			// Add the plus minus buttons
			$(this).find('li').each(function() {
				if($(this).children('ul').length > 0)
					$(this).prepend($('<div />', {'class': settings.classPrefix + "toggle " + settings.expandIconClass}));
			});

			// Events
			$('.' + settings.classPrefix + 'toggle').click(function() {
				$(this).parent().children('ul').toggle();
				$(this).hasClass('open') 
					? $(this).removeClass(settings.contractIconClass).addClass(settings.expandIconClass) 
					: $(this).removeClass(settings.expandIconClass).addClass(settings.contractIconClass);
			});

		});

	};
}) ( jQuery );