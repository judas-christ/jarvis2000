(function(window) {
  // handlers
  var oninit = [],
    onpassive = [],
    onlisten = [],
    ontalk = [];

  // jarvis object
  var jarvis = {
    parsers: {},
    parse: undefined,
    oninit: oninit,
    onpassive: onpassive,
    onlisten: onlisten,
    ontalk: ontalk,
    init: (opts) => {
      jarvis.parse = opts.parser;
      jarvis.trigger('init');
      jarvis.listen();
    },
    trigger: (handler, e) => {
      var array = jarvis['on' + handler];
      if (array) {
        console.log('trigger', handler, array);
        array.forEach(h => {
          h.call(this, e);
        });
      }
    }
  };

  // export jarvis
  window.jarvis = jarvis;
})(window);
