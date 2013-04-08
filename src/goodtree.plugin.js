(function ( $ ) {

  var methods = {
    init : function(options) {
      
      // Default Settings
      var settings = $.extend({
          expandIconClass: 'closed',
          contractIconClass: 'open',
          toggleButtonClass: 'toggle',
          setFocus: undefined
        }, options);

      return this.each(function() {
        var target = $(this);

        target.find('li').each(function() {
          var node = $(this),
              branches = node.children('ul, ol'),
              button;

          if(branches.length > 0) {
            // Show animation if set
            branches.hide();

            button = $('<div />', {
              'class': settings.toggleButtonClass + ' ' + settings.expandIconClass,
              on: {
                click: function(event) {
                  branches.toggle();
                  button.toggleClass(settings.expandIconClass + " " + settings.contractIconClass);
                }
              }
            });

            node.prepend(button);
          }
        });

        if(undefined !== settings.setFocus)
        {
          target.goodtree('setFocus', settings.setFocus);
        }

      });
    },

    setFocus : function(element) {
      return this.each(function() {
        var ancestor = $(this);
        $(element).parents('ul, ol').each(function() {
          if( $(this).is(ancestor) )
          {
            return false;
          }
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