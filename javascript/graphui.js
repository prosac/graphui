require('./javascript/connection');

const Raphael = require('Raphael');
const Color = require('./javascript/color_restricted');
const Numbers = require('./javascript/numbers');
const Ui = require('./javascript/ui');
const NodeStyle = require('./javascript/styles/default');
const Animations = require('./javascript/animations/default');
const Os = require('os');
const fs = require('fs');

window.onload = () => {
  const holder = document.getElementById('holder');
  const paper = Raphael(holder);
  const connections = [];
  const centerX = holder.offsetLeft + holder.offsetWidth / 2;
  const centerY = holder.offsetTop + holder.offsetHeight / 2;
  const rootNode = paper.rect(centerX, centerY, 60, 60, 10);
  const nodes = [ rootNode ];

  const onRootNodeClicked = (e) => {
    console.log('onRootNodeClicked');
    holder.addEventListener('click', addNode);
    e.stopPropagation();
  };

  rootNode.click(onRootNodeClicked);

  const onStartDrag = function () {
    console.log('onStartDrag!');
    // TODO: make polymorphic
    this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
    this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
    // TODO: discouple more
    Animations.onStartDrag(this);
  };

  const onMove = function(dx, dy) {
    console.log('onMove!');
    const attr = this.type == "rect" ? {
      x: this.ox + dx,
      y: this.oy + dy
    } : {
      cx: this.ox + dx,
      cy: this.oy + dy
    };
    this.attr(attr);

    // TODO: handle only relevant connections
    connections.forEach((conn) => {
      paper.connection(conn);
    });
  };

  const onEndDrag = function() {
    console.log('onEndDrag!');
    Animations.onEndDrag(this);
  };

  const addText = (e, t) => {
    const bbox = e.getBBox();
    const text = paper.text(bbox.x + bbox.width/2, bbox.y + bbox.height/2, t);
    text.attr({
      fill: '#fff'
    });
  }

  const addNode = (p = {x: Numbers.around(centerX),y: Numbers.around(centerY)}) => {
    console.log('addNode!');
    const newNode = paper.ellipse(p.x, p.y, 30, 30);
    nodes.push(newNode);
    connections.push(paper.connection(rootNode, newNode, Color.random()));
    // style(newNode);
    holder.removeEventListener('click', addNode);
    updateAll();
    return newNode;
  };

  const style = (node) => {
    const color = Color.random();

    console.log(color);

    node.attr({
      fill: color,
      stroke: color,
      "fill-opacity": 0,
      "stroke-width": 2,
      cursor: "move"
    });
  }

  const updateAll = () => {
    nodes.forEach((node) => {
      style(node)
      node.drag(onMove, onStartDrag, onEndDrag);
    });
  }

  fs.readdir(Os.homedir(), (err, files) => {
    let count = 0;

    files.filter(file => {
      return file[0] !== '.';
    }).forEach(file => {
      if(count > 3)
        return;
      const node = addNode();
      style(node);
      const text = addText(node, file);
      count++;
    });
  });


  updateAll();
};
