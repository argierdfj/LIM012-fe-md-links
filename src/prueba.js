const mdLinks = require('./index.js');
const path = '../__test__'
const fnMdLinks = mdLinks(path, { validate: true });

fnMdLinks.then((links) => {
  console.log(links)
})
.catch((err) => {
  console.log(err.message);
});
