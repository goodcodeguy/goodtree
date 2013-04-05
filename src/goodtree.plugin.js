(function ( $ ) {

  var methods = {
    init : function(options) {
      
      // Default Settings
      var settings = $.extend({
          'expandIconClass' : 'closed',
          'contractIconClass' : 'open',
          'setFocus' : undefined,
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

        if(undefined !== settings.setFocus)
        {
          $(this).goodtree('setFocus', settings.setFocus);
        }

      });
    },

    setFocus : function(obj) {
      return this.each(function() {
        var tree_parent = this;
        $(obj).parents('ul').each(function() {
          if($(this) === this)
            return;
          else
            $(this).show();
        });
      });
    }
  }

  $.fn.goodtree = function( method ) {
    if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.goodtree' );
      }
  };
}) ( jQuery );