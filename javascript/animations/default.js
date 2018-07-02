module.exports = function() {
  console.log('using custom animation');

  return {
    onStartDrag: (item) => {
      item.animate({"fill-opacity": .2}, 100);
    },
    onEndDrag: (item) => {
      item.animate({"fill-opacity": 0}, 100);
    }
  }
}()
