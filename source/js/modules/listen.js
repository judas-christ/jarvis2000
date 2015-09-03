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
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    // recognition.interimResults = true;
    recognition.onresult = (e) => {
      var bestResult = getBestResult(e.results[e.resultIndex]);
      // console.log('recognition result', e, bestResult);
      jarvis.parse(bestResult.transcript);
    };
    recognition.onspeechstart = function() {
      console.log('onspeechstart', arguments);
      jarvis.trigger('listen', {});
    };
    recognition.onspeechend = function() {
      console.log('onspeechend', arguments);
      jarvis.trigger('passive', {});
    };
    recognition.start();
  };

  jarvis.listenStop = function() {
    recognition.stop();
    recognition.onresult = null;
    recognition = null;
  };
})(jarvis);
