"use strict";
// SpeechRecognition polyfill
var SpeechRecognition = window.SpeechRecognition ||
                        window.webkitSpeechRecognition ||
                        window.mozSpeechRecognition ||
                        window.msSpeechRecognition ||
                        window.oSpeechRecognition;
function Recognition() {
  var rec = this.recognition = new SpeechRecognition(),
      commands = this.commands = [];
  rec.continuous = true;
  rec.interimResults = false;
  rec.lang = 'pl-PL';
  rec.onstart = function() {
    console.log('rec start');
  };
  rec.onresult = function(event) {
    var msg = '', match, newEvent;
    var interim_transcript = '';
    function testCommand(command){
      if((match = msg.match(command[0]))) {
        newEvent = new CustomEvent('command', { detail: command[0] });
        document.dispatchEvent(newEvent);
        if(command[1]) command[1](match);
      }
    }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if(event.results[i].isFinal) {
        msg = event.results[i][0].transcript;
      } else {
        msg += event.results[i][0].transcript;
      }
    }
    newEvent = new CustomEvent('recognize', { detail: msg });
    document.dispatchEvent(newEvent);
    commands.forEach(testCommand);
  };
  rec.onend = function() {
    rec.start();
  };

}
Recognition.prototype.start = function(callback) {
  var that = this;
  navigator.webkitGetUserMedia({audio: true}, function() {
    that.recognition.start();
    if(callback) callback(true);
  }, function() {
    if(callback) callback(false);
  });
};
Recognition.prototype.addCommand = function(regexp, fn) {
  var newEvent = new CustomEvent('newCommand', { detail: regexp });
  document.dispatchEvent(newEvent);
  this.commands.push([regexp, fn]);
};
