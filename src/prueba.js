const md = require('./index.js');
const path = '../README.md'
const fnMdLinks = md.mdlinks(path);

console.log(fnMdLinks);
