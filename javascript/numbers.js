module.exports = function() {
  return {
    randomInt: (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    around: (n) => {
      const range = 500;
      return Numbers.randomInt(n - range/2, n + range/2);
    },
    randomX: () => {
      return Numbers.aroundNumber(centerX)
    },
    randomY: () => {
      return Numbers.aroundNumber(centerY)
    }
  }
}()
