const md = require('./index.js');
const path = './cl.js'
const res = md.relativeToAbsolute(path)
console.log('-'.repeat(res.length))
console.log(res);
console.log('-'.repeat(res.length))
md.validatePath(res);
console.log('-'.repeat(res.length))
