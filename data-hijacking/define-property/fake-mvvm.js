
function FakeVue(opt) {
  this.$opt = opt

  // 0. 实例对象时，即开始绑定 data
  this.$data = opt.data = Observer(opt.data)
}

FakeVue.prototype.$watch = function (expOrFn, callback) {
  new Watcher(this, expOrFn, callback)
}


/**
 * Watcher
 */
function Watcher(instant, expOrFn, callback) {
  this.vm = instant
  this.exp = expOrFn
  this.cb = callback
  this.init()
}
Watcher.prototype.init = function () {
  
  // 标记当前属性
  Dep.target = this

  this.cb.call(this.vm, this.vm.$data[this.exp])
}
Watcher.prototype.update = function (val) {
  
  this.cb.call(this.vm, val)
}

/**
 * Observer
 */
function Observer(data) {
  
  if (typeof data !== 'object') return

  return new Proxy(data, {

    get(target, key, receiver) {
      console.log('get', target, key)

      // 有初始值
      if (typeof target[key] === 'undefined') {
        const dep = new Dep()
        target[key] = dep
        dep.save()
      } else if (typeof target[key] !== 'object') {
        const dep = new Dep(target[key])
        target[key] = dep
        dep.save()
      }
      
      return target[key].getValue()
    },

    set(target, key, value, receiver) {
      console.log('set', target, key, value)

      if (value === target[key].getValue()) return

      target[key].update(value)
    }
  })
}


/**
 * Dep
 */
function Dep(val) {
  this._val = val
  this._watchers = []
}
Dep.target = null

Dep.prototype.save = function () {
  this._watchers.push(Dep.target)
}
Dep.prototype.getValue = function () {
  return this._val
}
Dep.prototype.update = function (val) {
  this._val = val
  this._watchers.forEach(watcher => watcher.update(val))
}



// demo
const p = document.getElementById('p')
const title = document.getElementById('title')
const input = document.getElementById('input')

const demo = new FakeVue({
  data: {
    title: 'Fake Vue',
    article: 'Article for Fake Vue.',
  },
})

input.addEventListener('keyup', function (e) {
  demo.$data.article = e.target.value
})
demo.$watch('title', str => title.innerHTML = str)
demo.$watch('article', str => p.innerHTML = str)
