const toString = Object.prototype.toString

async function func1() {
  await 1
}

function* func2() {
  yield 1
}

console.log(toString.call(func1))
console.log(toString.call(func2))