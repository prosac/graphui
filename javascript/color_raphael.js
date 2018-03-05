module.exports = function() {
  console.log('using Raphael random color');
  return {
    random: () => {
      return Raphael.getColor();
    }
  }
}()
