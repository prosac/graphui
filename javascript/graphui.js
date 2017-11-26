const Raphael = require('Raphael');

Raphael.fn.connection = function(obj1, obj2, line, bg) {
  if (obj1.line && obj1.from && obj1.to) {
    line = obj1;
    obj1 = line.from;
    obj2 = line.to;
  }
  const bb1 = obj1.getBBox();
  const bb2 = obj2.getBBox();

  const p = [
    {
      x: bb1.x + bb1.width / 2,
      y: bb1.y - 1
    },
    {
      x: bb1.x + bb1.width / 2,
      y: bb1.y + bb1.height + 1
    },
    {
      x: bb1.x - 1,
      y: bb1.y + bb1.height / 2
    },
    {
      x: bb1.x + bb1.width + 1,
      y: bb1.y + bb1.height / 2
    },
    {
      x: bb2.x + bb2.width / 2,
      y: bb2.y - 1
    },
    {
      x: bb2.x + bb2.width / 2,
      y: bb2.y + bb2.height + 1
    },
    {
      x: bb2.x - 1,
      y: bb2.y + bb2.height / 2
    },
    {
      x: bb2.x + bb2.width + 1,
      y: bb2.y + bb2.height / 2
    }
  ];

  const d = {};
  const dis = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 4; j < 8; j++) {
      var dx = Math.abs(p[i].x - p[j].x);
      var dy = Math.abs(p[i].y - p[j].y);
      if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
        dis.push(dx + dy);
        d[dis[dis.length - 1]] = [i, j];
      }
    }
  }

  if (dis.length == 0) {
    var res = [0, 4];
  } else {
    res = d[Math.min(...dis)];
  }
  const x1 = p[res[0]].x;
  const y1 = p[res[0]].y;
  const x4 = p[res[1]].x;
  const y4 = p[res[1]].y;
  dx = Math.max(Math.abs(x1 - x4) / 2, 10);
  dy = Math.max(Math.abs(y1 - y4) / 2, 10);
  const x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3);
  const y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3);
  const x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3);
  const y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
  const path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
  if (line && line.line) {
    line.bg && line.bg.attr({
      path
    });
    line.line.attr({
      path
    });
  } else {
    const color = typeof line == "string" ? line : "#000";
    return {
      bg: bg && bg.split && this.path(path).attr({
        stroke: bg.split("|")[0],
        fill: "none",
        "stroke-width": bg.split("|")[1] || 3
      }),
      line: this.path(path).attr({
        stroke: color,
        fill: "none"
      }),
      from: obj1,
      to: obj2
    };
  }
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function aroundPoint(point) {
  const range = 1000;

  return {
    x: getRandomInt(point.x - range, point.x + range),
    y: getRandomInt(poiny.y - range, poiny.y + raange)
  }
}

function aroundNumber(n) {
  const range = 500;

  return getRandomInt(n - range/2, n + range/2);
}



window.onload = () => {
  const dragger = function() {
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
      r.connection(conn);
    });

    r.safari();
  };

  const onStartDrag = function() {
    // this.animate({
    //   "fill-opacity": 0
    // }, 500);
  };

  const holder = document.getElementById('holder');
  const r = Raphael(holder);
  const connections = [];
  const centerX = holder.offsetLeft + holder.offsetWidth / 2;
  const centerY = holder.offsetTop + holder.offsetHeight / 2;
  const rootNode = r.rect(centerX, centerY, 60, 40, 10);

  function randomX() {
    return aroundNumber(centerX)
  }

  function randomY() {
    return aroundNumber(centerY)
  }

  function randomColor() {
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
    const newNode = r.ellipse(aroundNumber(centerX), aroundNumber(centerY), 30, 20);
    nodes.push(newNode);
    connections.push(r.connection(rootNode, newNode, "#fff"));
  };

  const addNewNode = (p) => {
    const newNode = r.ellipse(p.x, p.y, 30, 20);
    nodes.push(newNode);
    connections.push(r.connection(rootNode, newNode, "#fff"));
    update();
  };

  holder.addEventListener('click', addNewNode);

  const rootNodeClicked = (e) => {
    addNewNode(getPosition());
    update();
  };


  rootNode.click(rootNodeClicked);

  const nodes = [
    r.ellipse(randomX(), randomY(), 30, 20),
    rootNode,
    r.rect(randomX(), randomY(), 60, 40, 2),
    r.ellipse(randomX(), randomY(), 20, 20)
  ];

  function update() {
    nodes.forEach((node) => {
      // const color = Raphael.getColor();
      const color = randomColor();
      node.attr({
        fill: color,
        stroke: color,
        "fill-opacity": 0,
        "stroke-width": 2,
        cursor: "move"
      });
      node.drag(move, dragger, onStartDrag);
    });
  }

  update();

  connections.push(r.connection(nodes[0], nodes[1], "#fff"));
  connections.push(r.connection(nodes[1], nodes[2], "#fff", "#fff|5"));
  connections.push(r.connection(nodes[1], nodes[3], "#000", "#fff"));
};
