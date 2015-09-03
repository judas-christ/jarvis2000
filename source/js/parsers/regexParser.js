(function(jarvis) {
  'use strict';

  var regexParser = function(opts) {
    var commands = opts.commands;
    return function(text) {
      var m;
      console.log('regexParser', text);
      for(let key of Object.keys(commands)) {
        m = new RegExp(key).exec(text);
        if(m) {
          commands[key](m);
        }
      }
    };
  };

  jarvis.parsers.regexParser = regexParser;
})(jarvis);
