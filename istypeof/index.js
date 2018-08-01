module.exports = istypeof

/**
 * Compatibility:
 *   almost all
 * 
 * Curry
 * 
 * @param {string} typename 
 * @returns {Function}
 */
function istypeof(typename) {

  if (typeof typename !== 'string') {
    throw new TypeError('Function `istypeof` needs a `string` type as argument.')
  }
  
  return function (target) {
    
    var toStr = Object.prototype.toString
      
    var type = typename.toLowerCase()
    
    var regex = /\[object (\w+)\]/

    /**
     * Null, Undefined, String, Number, Object, Date, Array, Symbol, [Symbol.toStringTag]
     * TODO: Date, Array ... is Object, too?
     */
    var matches = toStr.call(target).match(regex)

    // `function` will match GeneratorFunction, too
    return new RegExp(type).test(matches[1].toLowerCase())
  }
}