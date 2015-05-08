// TODO:
// - refactor state code to use data attributes instead of css classes
// - abstract animations out to be seperate entities that can be overwritten
// - json based tree generation (accept json object and generate tree from that json object)
// - add lazy load option

;(function ( $, window, undefined ) {

  var settings;

  var methods = {
    init : function(options) {

      // Default Settings
      settings = $.extend({
        expandIconClass: 'closed',
        contractIconClass: 'open',
        toggleButtonClass: 'toggle',
        builtTreeClass: 'loaded',
        animateActions: false,
        openAnimation: {
          height: "show",
          marginTop: "show",
          marginBottom: "show",
          paddingTop: "show",
          paddingBottom: "show"
        },
        openAnimationSpeed: 500,
        closeAnimation: {
          height: "hide",
          marginTop: "hide",
          marginBottom: "hide",
          paddingTop: "hide",
          paddingBottom: "hide"
        },
        closeAnimationSpeed: 100,
        reveal: undefined
      }, options);

      return this.each(function() {
        var target = $(this);

        target.find('li').each(function() {
          var node = $(this),
              branches = node.children('ul, ol'),
              button;

          if(!node.children('div.toggle').hasClass(settings.builtTreeClass)) {
            if(branches.length > 0) {

              branches.hide();

              button = $('<div />', {
                'class': settings.toggleButtonClass + ' ' + settings.expandIconClass + ' ' + settings.builtTreeClass,
                on: {
                  click: function(event) {
                    if(settings.animateActions)
                    {
                      (button.hasClass('open')) ?
                            branches.animate(settings.closeAnimation, settings.closeAnimationSpeed)
                          : branches.animate(settings.openAnimation, settings.openAnimationSpeed);
                    }
                    else
                    {
                      branches.toggle();
                    }
                    button.toggleClass(settings.expandIconClass + ' ' + settings.contractIconClass);
                  }
                }
              });

              node.prepend(button);
            }
          }
        });

        if(undefined !== settings.reveal)
        {
          methods.reveal(settings.reveal);
        }

      });
    },

    reveal : function(element) {

      var ancestor = $(this);
      $(element).parents('ul, ol').each(function() {
        if( $(this).is(ancestor) )
        {
          return false;
        }
        // Ignore Animation, makes it weird when it's a deep node
        $(this).show();
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
}) ( jQuery, window );
