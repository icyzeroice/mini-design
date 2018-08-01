/**
 * Reference:
 *   - https://github.com/koajs/compose
 * 
 * Functional Programming -- Curry
 *
 * 
 * @function middleware
 * @param {Object|String|Number} data
 * @param {Function} nextMiddleware
 *
 *  
 * @param {Array<Function>} middlewareList 
 * @param {Function|undefined} callback -- fire callback while complete all the functions in middlewareList
 * @return {Function}
 */
module.exports = function compose(middlewareList) {
  
  return function(data, callback) {

    // store data, callback in the memory

    return dispatch(0)

    /**
     * fire Middleware recursively
     * TODO: tail call optimization
     * @param {Number} index
     */
    function dispatch(index) {
      let middleware
      
      if (index == middlewareList.length)  {
        middleware = callback
      } else {
        middleware = middlewareList[index]
      }

      try {
        // fn turns to undefined after callback is fired
        // here use `bind` to create a new function and do not fire it now 
        return Promise.resolve(
          middleware 
          ? middleware(data, dispatch.bind(new Object(null), ++index)) 
          : undefined
        )
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}