const fs = require('fs')

module.exports = function fileGenerator(filepath, words, loop, callback) {
  if (!loop || typeof loop !== 'number') {
    loop = 1
  }

  let writeFile
  
  try {
    writeFile = fs.createWriteStream(filepath)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }


  writeFile.on('open', () => console.log('[OPEN]', filepath))
  writeFile.on('close', () => console.log('[CLOSE]', filepath))
  writeFile.on('finish', () => {
    console.log('[FINISH]', filepath)
    callback()
  })

  for (let i = 0; i < loop; i++) {
    writeFile.write(words)
  }

  writeFile.end()
}
