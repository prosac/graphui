module.exports = function() {
  return {
    aroundPoint: (point) => {
      const range = 1000;
      return {
        x: Numbers.randomInt(point.x - range, point.x + range),
        y: Numbers.randomInt(poiny.y - range, poiny.y + range)
      }
    },
    getPosition: (e) => {
      return {
        x: e.clientX,
        y: e.clientY
      };
    }
  }
}()
