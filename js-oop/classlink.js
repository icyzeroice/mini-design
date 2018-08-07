/**
 * Reference:
 *   
 */
function ClassLink() {
  this.data = []
}

ClassLink.prototype.method1 = function () {
  console.log('method 1', this.data)
}

ClassLink.prototype.method2 = function () {
  console.log('method 2', this.data)
}

ClassLink.prototype.ClassLink = ClassLink

inst = new ClassLink()

ClassLink.prototype.ClassLink.prototype.ClassLink.prototype.ClassLink === ClassLink  // true
inst.__proto__ === ClassLink.prototype  // true

module.exports = inst