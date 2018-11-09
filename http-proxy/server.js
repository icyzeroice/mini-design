const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

const server = http.createServer((req, res) => {
  dispatchFiles(req, res)
}).listen(8080)

function dispatchFiles(req, res) {
  const { pathname, query } = url.parse(req.url, true)
  
  let r = fs.createReadStream(path.resolve(__dirname, `public${pathname}`))
  
  r.on('error', err => {
    r = fs.createReadStream(path.resolve(__dirname, `public/404.html`))
    r.pipe(res)
    // r.pipe(process.stdout)
  })

  r.pipe(res)
  // r.pipe(process.stdout)
}
