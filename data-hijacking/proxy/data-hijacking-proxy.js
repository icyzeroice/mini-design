const origin = {
  k: 'key',
  sub: {
    k: 'sub-key'
  }
}

const proxy = new Proxy(origin, {
  get: function (target, propKey, receiver) {
    console.log('get', propKey)
    return target[propKey]
  },

  set: function (target, propKey, value, receiver) {
    console.log('set', propKey, 'value', value)
    target[propKey] = value
  },

  has: function (target, propKey) {
    console.log('has', propKey)
  }
})

console.log('origin', origin.sub)
console.log('proxy', proxy.sub.k)


origin.t = 'test'
console.log('origin-t', origin.t)
console.log('proxy-t', proxy.t)

proxy.pt = 'proxy-test'
console.log('origin-pt', origin.pt)
console.log('proxy-pt', origin.pt)