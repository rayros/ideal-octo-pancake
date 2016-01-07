"use strict";
function speech(lang) {
  return function(msg) {
    var s = new SpeechSynthesisUtterance(msg),
        newEvent = new CustomEvent('speech', { detail: msg });
    s.lang = lang;
    window.speechSynthesis.speak(s);
    document.dispatchEvent(newEvent);
  };
}
