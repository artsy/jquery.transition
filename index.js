// Adapted from Twitter Bootstrap: https://github.com/twbs/bootstrap/blob/master/js/transition.js
// emulateTransitionEnd via: http://blog.alexmaccaw.com/css-transitions
// CSS3 transition detection via: http://modernizr.com/

(function ($, document) {
  'use strict';

  var transitionEnd;

  transitionEnd = function() {
    var el, transEndEventNames, name;

    el = document.createElement('transition');

    transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition:    'transitionend',
      OTransition:      'oTransitionEnd otransitionend',
      transition:       'transitionend'
    };

    for (name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        };
      }
    }
  };

  $.fn.emulateTransitionEnd = function(duration) {
    var called, $el, callback;

    called = false;
    $el = this;

    $(this).one($.support.transition.end, function() { called = true; });

    callback = function() {
      if (!called) { $($el).trigger($.support.transition.end); }
    };

    setTimeout(callback, duration);

    return this;
  };

  $.support.transition = transitionEnd();
})(jQuery, document);
