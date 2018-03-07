const Graphui = require('./javascript/graphui');
const Os = require('os');
const fs = require('fs');

window.onload = () => {
  Graphui.init();
};

fs.readdir(Os.homedir(), (err, files) => {
  let count = 0;

  files.filter(file => {
    return file[0] !== '.';
  }).forEach(file => {
    if(count > 3)
      return;
    const node = Graphui.addNode();
    count++;
  });
});
