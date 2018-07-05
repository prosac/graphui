module.exports = function() {
  console.log('using restricted colors');
  return {
    random: () => {
      const colors = [
        '#7391bf',
        '#7773bf',
        '#9973bf',
        '#bb73bf',
        '#bf73a1',
        '#bf737e'
      ];

      return colors[Math.floor(Math.random()*colors.length)];
    }
  }
}()
