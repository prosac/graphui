const Graphui = require('./javascript/graphui');
const Os = require('os');
const fs = require('fs');

// This is an example application using graphui to visualize some part of the file system

window.onload = () => {
  Graphui.init(document.getElementById('holder'));
};

fs.readdir(Os.homedir(), (err, files) => {
  files
    .filter(file => { return file[0] !== '.'; })
    .slice(0, 3)
    .forEach(() => Graphui.addNode());
});
