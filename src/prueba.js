const md = require('./index.js');
const path = './cli.js'
const absPath = md.relativeToAbsolute(path)

console.log('-'.repeat(absPath.length))
console.log(absPath);
console.log('-'.repeat(absPath.length))

console.log(md.validatePath(absPath));
// setTimeout(() => {
//   console.log('-'.repeat(absPath.length));
// }, 2000)

console.log(md.validateDirectory(absPath));

