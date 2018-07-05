module.exports = function() {
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const around = (n) => {
    const range = 500;
    return randomInt(n - range/2, n + range/2);
  }

  const randomX = () => {
    return aroundNumber(centerX)
  }

  const randomY = () => {
    return aroundNumber(centerY)
  }

  return {
    randomInt: randomInt,
    around: around,
    randomX: randomX,
    randomY: randomY
  }
}()
