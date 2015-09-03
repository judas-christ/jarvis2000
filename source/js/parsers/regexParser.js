(function(jarvis) {
  'use strict';

  var regexParser = function(opts) {
    var commands = opts.commands;
    var parser = function(text) {
      console.log('parsing',text);
      var m;
      for(let key of Object.keys(commands)) {
        m = new RegExp(key).exec(text);
        if(m) {
          commands[key](m);
        }
      }
    };
    parser.addCommand = function(command, handler) {
      commands[command] = handler;
    };
    return parser;
  };

  jarvis.parsers.regexParser = regexParser;
})(jarvis);
