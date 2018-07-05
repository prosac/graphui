module.exports = function() {
  require('./connection');

  const Raphael = require('Raphael');
  const Color = require('./colors/color_restricted');
  const Numbers = require('./utilities/math');
  const Points = require('./utilities/points');
  const NodeStyle = require('./styles/default');
  const Animations = require('./animations/default');
  const connections = [];

  const nodes = [];
  let rootNode;
  let paper;
  let centerX;
  let centerY;

  const update = node => {
    const color = Color.random();

    node.attr({
      fill: color,
      stroke: color,
      "fill-opacity": 0,
      "stroke-width": 2,
      cursor: "move"
    });

    node.drag(onMove, onStartDrag, onEndDrag);
    return node;
  }

  const updateAll = () => {
    nodes.forEach(node => update(node))
  }

  const onStartDrag = function () {
    // TODO: make polymorphic
    this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
    this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
    // TODO: discouple more
    Animations.onStartDrag(this);
  };

  const onMove = function(dx, dy) {
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
    Animations.onEndDrag(this);
  };

  const addNode = (p = {x: Numbers.around(centerX),y: Numbers.around(centerY)}) => {
    const newNode = paper.ellipse(p.x, p.y, 30, 30);
    nodes.push(newNode);
    connections.push(paper.connection(rootNode, newNode, Color.random()));
    holder.removeEventListener('click', addNode);
    update(newNode);
    return newNode;
  };

  const init = (holder) => {
    paper = Raphael(holder);
    centerX = holder.offsetLeft + holder.offsetWidth / 2;
    centerY = holder.offsetTop + holder.offsetHeight / 2;
    rootNode = paper.rect(centerX, centerY, 60, 60, 10);
    nodes.push(rootNode);

    const onRootNodeClicked = (e) => {
      holder.addEventListener('click', addNode);
      e.stopPropagation();
    };

    rootNode.click(onRootNodeClicked);
    updateAll();
  }

  return {
    init: init,
    addNode: addNode
  }
}()
