const md = require('./index.js');
const path = '../README.md'
const fnMdLinks = md.mdlinks(path);

fnMdLinks.then((links)=> {
  links.forEach(link => {
    console.log('links:' + link);
  });
})
.catch((err)=>{
  console.log('error:' + err);
});