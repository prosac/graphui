module.exports = function() {
  console.log('using custom random color');

  return {
    onStartDrag: (item) => {
      item.animate({"fill-opacity": .2}, 100);
    },
    onEndDrag: (item) => {
      item.animate({"fill-opacity": 0}, 100);
    }
  }
}()
