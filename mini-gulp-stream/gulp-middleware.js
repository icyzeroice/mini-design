const fs = require('fs')
const {Transform} = require('stream')
const data = require('./temp/data.json')

function testMid() {
  
  const transform = new Transform({
    objectMode: true
  })

  transform._transform = function (chunk, encoding, callback) {
    let str = ''
    let reg = /<%(\s*)?(\w+)(\s*)?%>/g
    let err = null
    
    // if (chunk.isBuffer()) {
      console.log('Buffer Mode')

      str = String(chunk)
      str.match(reg).map((item) => {
        str = str.replace(item, data[item.replace(reg, '$2')])
      })

      chunk = new Buffer(str)
    // }

    // else if (chunk.isStream()) {
    //   console.log('Stream Mode')
    // }
    
    // else {
    //   err = new TypeError('Unsupported type')
    // }

    callback(err, chunk)
  }

  return transform
}

const readStream = fs.createReadStream('./temp/temp.tpl')
const writeStream = fs.createWriteStream('./temp/dist.tpl')

readStream
  // Gulp Middleware is the same as a transform Stream
  .pipe(testMid())

  .pipe(writeStream)