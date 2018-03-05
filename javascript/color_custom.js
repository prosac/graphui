module.exports = function() {
  console.log('using custom random color');
  return {
    random: () => {
      return "#"+((1<<24)*Math.random()|0).toString(16)
    }
  }
}()
