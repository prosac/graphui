const Raphael = require('Raphael');
const connection = require('./javascript/connection');
const os = require('os');
const fs = require('fs');


const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const aroundPoint = (point) => {
  const range = 1000;

  return {
    x: getRandomInt(point.x - range, point.x + range),
    y: getRandomInt(poiny.y - range, poiny.y + raange)
  }
}

const aroundNumber = (n) => {
  const range = 500;
  return getRandomInt(n - range/2, n + range/2);
}

window.onload = () => {
  const dragger = function () {
    this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
    this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
    // this.animate({"fill-opacity": .2}, 500);
  };

  const move = function(dx, dy) {
    const att = this.type == "rect" ? {
      x: this.ox + dx,
      y: this.oy + dy
    } : {
      cx: this.ox + dx,
      cy: this.oy + dy
    };
    this.attr(att);

    connections.forEach((conn) => {
      paper.connection(conn);
    });

    paper.safari();
  };

  const onStartDrag = function() {
    // this.animate({
    //   "fill-opacity": 0
    // }, 500);
  };

  const holder = document.getElementById('holder');
  const paper = Raphael(holder);
  const connections = [];
  const centerX = holder.offsetLeft + holder.offsetWidth / 2;
  const centerY = holder.offsetTop + holder.offsetHeight / 2;
  const rootNode = paper.rect(centerX, centerY, 60, 40, 10);

  const randomX = () => {
    return aroundNumber(centerX)
  }

  const randomY = () => {
    return aroundNumber(centerY)
  }

  const randomColor = () => {
    return "#"+((1<<24)*Math.random()|0).toString(16)
  }

  const getPosition = (e) => {
    const p = {
      x: e.clientX,
      y: e.clientY
    }

    console.log(p);

    return p;
  };

  const addRandomNode = () => {
    const newNode = paper.ellipse(aroundNumber(centerX), aroundNumber(centerY), 30, 20);
    nodes.push(newNode);
    connections.push(paper.connection(rootNode, newNode, "#fff"));
    return newNode;
  };

  const addText = (e, t) => {
    const bbox = e.getBBox();
    const text = paper.text(bbox.x + bbox.width/2, bbox.y + bbox.height/2, t);
    text.attr({
      fill: '#fff'
    });
  }

  const addNode = (p) => {
    const newNode = paper.ellipse(p.x, p.y, 30, 20);
    nodes.push(newNode);
    connections.push(paper.connection(rootNode, newNode, "#fff"));
    update();
  };

  // const addShape = (shape, text) => {
  //   const set = paper.set();
  //   set.push(shape, text);
  //   debugger;
  // };

  const rootNodeClicked = (e) => {
    // addShape(addNode(getPosition()), 'blabla');
    holder.addEventListener('click', addNode);
    // addNode(getPosition());
    holder.removeEventListener('click');
    update();
  };

  const nodes = [
    rootNode
  ];

  // holder.addEventListener('click', addNode);
  rootNode.click(rootNodeClicked);

  const style = (node) => {
    // const color = Raphael.getColor();
    const color = randomColor();

    node.attr({
      fill: color,
      stroke: color,
      "fill-opacity": 0,
      "stroke-width": 2,
      cursor: "move"
    });
  }

  const update = () => {
    nodes.forEach((node) => {
      style(node)
      node.drag(move, dragger, onStartDrag);
    });
  }

  fs.readdir(os.homedir(), (err, files) => {
    files.filter(file => {
      return file[0] !== '.';
    }).forEach(file => {
      const node = addRandomNode();
      style(node);
      const text = addText(node, file);
    });
  })

  update();
};
