const origin = {
  k: 'key',
  sub: {
    k: 'sub-key'
  }
}

let _demo = ''
Reflect.defineProperty(origin, 'demo', {
  get: function () {
    console.log('get _demo', _demo)
    return _demo
  },
  set: function (value) {
    _demo = value
    console.log('set _demo', value)
  }
})

console.log('sub', origin.sub, 'origin', origin)
console.log('demo', origin.demo)

origin.demo = 1
console.log('demo', origin.demo)

Reflect.defineProperty(origin, 'default', {
  value: 'default can not be written',
  enumerable: true
})

console.log('default', origin)
origin.default = 'can be written ?'
console.log('default', origin)