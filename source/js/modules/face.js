(function(jarvic) {
  'use strict';
  var jarvisFace;

  jarvis.oninit.push(() => {
    if(!jarvisFace) {
      jarvisFace = document.body.appendChild(document.createElement('div'));
      jarvisFace.className = 'jarvis jarvis--passive';
      jarvisFace.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        jarvis.listen();
      }
    }
  });

  jarvis.onpassive.push(() => {
    jarvisFace.className = 'jarvis jarvis--passive';
  });

  jarvis.onlisten.push(() => {
    jarvisFace.className = 'jarvis jarvis--listen';
  });

  jarvis.ontalk.push(() => {
    jarvisFace.className = 'jarvis jarvis--talk';
  });
})(jarvis);
