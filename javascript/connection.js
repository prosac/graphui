const Raphael = require('Raphael');

module.exports = function(){

  return Raphael.fn.connection = function(obj1, obj2, line, bg) {
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
}()
