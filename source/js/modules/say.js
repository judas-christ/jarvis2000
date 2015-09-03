(function(jarvis) {
  'use strict';
  const jarvisVoice = {
    name: "en-GB",
    voiceURI: "en-GB",
    lang: "en-GB",
    localService: true,
    default: true
  };

  jarvis.say = function(text) {
    var utterance = new SpeechSynthesisUtterance();
    utterance.voice = jarvisVoice;
    utterance.voiceURI = jarvisVoice.voiceURI;
    utterance.volume = 0.8; // 0 to 1
    utterance.rate = 1; // 0.1 to 10
    utterance.pitch = 1; //0 to 2
    utterance.text = text;
    utterance.lang = jarvisVoice.lang;
    utterance.onend = function() {
      jarvis.trigger('passive', {});
    };
    speechSynthesis.speak(utterance);
    jarvis.trigger('talk', {});
  };
})(jarvis);
