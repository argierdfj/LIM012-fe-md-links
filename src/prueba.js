const md = require('./index.js');
const path = '../src'
const res = md.relativeToAbsolute(path)
console.log('-'.repeat(res.length))
console.log(res);
console.log('-'.repeat(res.length))
md.validatePath(res);
setTimeout(() => {
  console.log('-'.repeat(res.length));
}, 2000) 
