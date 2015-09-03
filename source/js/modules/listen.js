(function(jarvis) {
  'use strict';
  var recognition;
  var slice = Array.prototype.slice,
      map = Array.prototype.map,
      filter = Array.prototype.filter;

  /**
   * Gets the best result from a SpeechRecognitionResultList
   * @param  {[type]} results [description]
   * @return {[type]}         [description]
   */
  function getBestResult(result) {
    var bestResult;
    for(var i=0, l=result.length; i<l; i++) {
      if(!bestResult || bestResult.confidence < result[i].confidence) {
        bestResult = result[i];
      }
    }
    return bestResult;
  }

  jarvis.listen = function() {
    if(!recognition) {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      // recognition.interimResults = true;
      recognition.onresult = function(e) {
        var bestResult = getBestResult(e.results[e.resultIndex]);
        console.log('recognition result', e, bestResult);
        jarvis.parse(bestResult.transcript);
      };
      recognition.onspeechstart = function() {
        console.log('onspeechstart');
        jarvis.trigger('listen', {});
      };
      recognition.onspeechend = recognition.onsoundend = function() {
        console.log('onspeechend');
        jarvis.trigger('passive', {});
      };
    }
    try {
      recognition.start();
    } catch (ex) {
      console.warn('Jarvis is already listening.')
    }
  };

  jarvis.listenStop = function() {
    recognition.stop();
    recognition.onresult = null;
    recognition = null;
  };
})(jarvis);
