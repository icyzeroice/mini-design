/**
 * Reference:
 *   - https://github.com/koajs/koa/blob/master/lib/application.js
 */
const compose = require('./compose')

const istypeof = require('../istypeof')
const isFunction = istypeof('function')

module.exports = class Bootstrap {

  constructor() {
    this.middlewareList = []
  }
  
  /**
   * Add middleware to List, delay to fire
   * @param {Function} middleware 
   */
  add(middleware) {
    
    if (!isFunction(middleware)) {
      throw new Error('Middleware must be a function!')
    }
    
    this.middlewareList.push(middleware)

    return this
  }

  /**
   * Run all the middleware in order
   * @param {Function} callback 
   */
  run(data) {
    compose(this.middlewareList)(data)
    return this
  }

  remove(index) {
    this.middlewareList.splice(index, 1)
    return this
  }

  addAt(index, middleware) {
    if (!isFunction(middleware)) {
      throw new Error('Middleware must be a function!')
    }

    this.middlewareList.splice(index, 0, middleware)
    return this
  }

  clear() {
    this.middlewareList = []
    return this
  }
}