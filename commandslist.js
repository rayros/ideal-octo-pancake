"use strict";
var commandsEl = document.getElementById('commands');
function newCommand(e) {
  var command = document.createElement('p');
  command.innerHTML = e.detail;
  command.classList.add('commands--command');
  commandsEl.appendChild(command);
}
document.addEventListener('newCommand', newCommand);
