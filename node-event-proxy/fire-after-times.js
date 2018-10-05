// 参考 《Node.js 深入浅出 P78》
const {EventEmitter} = require('events')
const {resolve} = require('path')
const fileGenerator = require('./file-generator')

// 经过 times 次触发同一时间后才会调用 callback
const after = function (times, callback) {
  let _count = 0
  const _result = {}

  return function (key, value) {

    // TODO: safe checking
    _result[key] = value
    _count++

    if (_count === times) {
      callback(_result)
    }
  }
}

const emitter = new EventEmitter()

const proxy = after(3, function () {
  console.log('this event has been emitted 3 times')
})

const handler = function () {
  let _counter = 0

  return function () {
    process.nextTick(() => console.log(_counter))
  }
}

emitter.on('done', proxy)
emitter.on('done', handler)

fileGenerator(resolve(__dirname, 'temp/file1.temp'), 'file1', 100, () => emitter.emit('done'))
fileGenerator(resolve(__dirname, 'temp/file2.temp'), 'file2', 10, () => emitter.emit('done'))
fileGenerator(resolve(__dirname, 'temp/file3.temp'), 'file3', 1, () => emitter.emit('done'))
