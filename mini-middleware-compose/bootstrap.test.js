const Bootstrap = require('./Bootstrap')

bootstrap = new Bootstrap()
bootstrap2 = new Bootstrap()

test('Test bootstrap', () => {
  
  bootstrap
    
    .add(function (data, nextMiddleware) {
      console.log('middleware 1', data)
      nextMiddleware()
      console.log('after all the middleware')
      return '111'
    })
    
    .add(function (data, nextMiddleware) {
      console.log('middleware 2', data)
      nextMiddleware()

      return '222'
    })

    .run('dddata')
})


test('Test bootstrap work flow', () => {

  bootstrap2

    .add((data, next) => {
      console.log('mid 1', data)
      next()
    })

    .add((data, next) => {
      console.log('mid2', data)
      next()
    })

    .run('res')

    .remove(1)

    .addAt(0, (data, next) => {
      console.log('mid3', data)
      next()
    })

    .run('res2')

    .clear()

    .add((data, next) => {
      console.log('mid4', data)
      next()
    })

    .run('res3')

})