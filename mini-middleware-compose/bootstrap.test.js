const Bootstrap = require('./Bootstrap')

bootstrap = new Bootstrap()
bootstrap2 = new Bootstrap()

test('Test bootstrap', () => {
  
  bootstrap

    .load('load data 1')
    
    .add(function (data, nextMiddleware) {
      
      console.log('middleware 1', data)
      
      nextMiddleware().then(temp => {
        console.log('after all the middleware', temp)
      })
      
      return 'return middleware 1 data'
    })
    
    .add(function (data, nextMiddleware) {
      console.log('middleware 2', data)
      nextMiddleware()

      return 'return middleware 2 data'
    })

    .run()
})


test('Test bootstrap work flow', () => {

  bootstrap2

    .load('test data1')

    .add((data, next) => {
      console.log('mid 1', data)
      next()
    })

    .add((data, next) => {
      console.log('mid2', data)
      next()
    })

    .run()

    .remove(1)

    .load('test data2')

    .addAt(0, (data, next) => {
      console.log('mid3', data)
      next()
    })

    .run()

    .clear()

    .add((data, next) => {
      console.log('mid4', data)
      next()
    })

    .run()

})