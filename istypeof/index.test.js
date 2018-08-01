const istypeof = require('./index')
  , num = 3
  , numStr = '3'
  , str = 'test'
  , generatorFun = function* () {yield 1}
  , arr = [1, 2]
  , func = () => 'yes'

test(`Test number ${num}`, () => {
  expect(istypeof('number')(num)).toBe(true)
})

test(`Test string ${numStr}`, () => {
  expect(istypeof('string')(numStr)).toBe(true)
})

test(`Test string ${str}`, () => {
  expect(istypeof('string')(str)).toBe(true)
})

test(`Test GeneratorFunction ${generatorFun}`, () => {
  expect(istypeof('GeneratorFunction')(generatorFun)).toBe(true)
})

test(`Test array ${arr}`, () => {
  expect(istypeof('array')(arr)).toBe(true)
})

test(`Test function ${func}`, () => {
  expect(istypeof('function')(func)).toBe(true)
})

test(`Test: GeneratorFunction ${generatorFun} is function, too`, () => {
  expect(istypeof('function')(generatorFun)).toBe(true)
})