"use strict";
var logEl = document.getElementById('log');
function newLog(e) {
  var log = document.createElement('p');
  log.innerHTML = e.detail;
  log.classList.add('log--' + e.type);
  logEl.appendChild(log);
  logEl.scrollTop = logEl.scrollHeight;
}
document.addEventListener('recognize', newLog);
document.addEventListener('command', newLog);
document.addEventListener('speech', newLog);
