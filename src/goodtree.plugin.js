// TODO:
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
             branches = node.children('ul, ol');

          if(!node.data("loaded") && branches.length > 0)
          {

            branches.hide();
            node.prepend(methods.openCloseButton(branches));
            node.data("loaded", true);

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

      $(element).parents('li').each(function() {
        $(this).children('div.' + settings.toggleButtonClass).click();
      });

    },

    openCloseButton : function(branches) {
      var button = $('<div />',
      {
        'class': settings.toggleButtonClass + ' ' + settings.expandIconClass,
        on: {
          click: function(event) {
            var self = button;

            methods.animateActions(branches, self.data('open'));

            (self.data('open'))
              ? button.removeClass(settings.contractIconClass).addClass(settings.expandIconClass)
              : button.removeClass(settings.expandIconClass).addClass(settings.contractIconClass);

            self.data('open', !self.data('open'));
          }
        }
      });

      // Initialize buttons as closed
      button.data('open', false);

      return button;
    },

    animateActions : function(branches, open) {
      if(settings.animateActions)
      {
        (open)
          ? branches.animate(settings.closeAnimation, settings.closeAnimationSpeed)
          : branches.animate(settings.openAnimation, settings.openAnimationSpeed);
      }
      else
      {
        branches.toggle();
      }
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
