const md = require('./index.js');
const path = './'
const absPath = md.relativeToAbsolute(path)

console.log('-'.repeat(absPath.length))
console.log(absPath);
console.log('-'.repeat(absPath.length))

console.log(md.validatePath(absPath));
// setTimeout(() => {
//   console.log('-'.repeat(absPath.length));
// }, 2000)
const arrElems = md.validateElem(absPath)
console.log(arrElems);

console.log(md.searchingLinks(arrElems).flat())

