const axios = require('axios');
const mdLinks = require('./index.js');
const path = './a.md'
const fnMdLinks = mdLinks(path, { validate: true });

fnMdLinks.then((links) => {
  console.log(links)
})
.catch((err) => {
  console.log(err.message);
});


// axios.get('https://us-central1-movistar-web-publica.cloudfunctions.net/ga_flow/hello_world/500')
//   .then((data)=>{
//     return {
//       status: data.status,
//       msg: 'OK'
//     }
//   }).catch(err =>{
//     return {
//       status: err.response.status,
//       msg: 'FAIL'
//     }
//   })
