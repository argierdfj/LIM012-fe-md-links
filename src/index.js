const fn = require('./flowmd.js');
const axios = require('axios');

/* const mdlinks = async (elemPath, opts = undefined) => {
   return axios.get(elemPath)
  .then(({data}) => {
    return data;
  })
} */

const mdlinks = (elemPath, options = { validate: false }) =>
  new Promise((resolve, reject) => {
    const absPath = fn.convertRelativeToAbsolutePath(elemPath);

    if (fn.isValidPath(absPath)) {
      const arrMdFilePath = fn.getPathMdFile(absPath);

      if (arrMdFilePath.length) {
        const arrLinksFound = fn.findLinks(arrMdFilePath);

        // URL, TEXTO, RUTA
        const arrMdFileLinks = [];
        if (arrLinksFound.length) {
          arrLinksFound.forEach((linkFound) => {
            if (linkFound.links) {
              linkFound.links.forEach((link) => {
                const str = link.split('](');
                arrMdFileLinks.push({
                  href: str[1].slice(0, -1),
                  text: str[0].slice(1, 50),
                  file: linkFound.path
                })
              });
            }
          });
        }

        if (arrMdFileLinks.length) {
          if (options.validate) {
            const queryArr = [];
            arrMdFileLinks.forEach((mdFileLinks) => {
              queryArr.push(axios.get(mdFileLinks.href)
                .then((data) => {
                  return {
                    ...mdFileLinks,
                    status: data.status,
                    msg: 'OK'
                  }
                })
                .catch((err) => {
                  return {
                    ...mdFileLinks,
                    status: err.response.status,
                    msg: 'FAIL'
                  }                  
                })
              );
            });
            resolve(Promise.all(queryArr))     
          } else {
            resolve(arrMdFileLinks);
          }
        } else {
          reject(new Error('No se encontraron links'));
        }

      } else {
        reject(new Error('No se encontraron archivos .md'));
      }

    } else {
      reject(new Error('La ruta ingresada no es válida'));
    }
  });


module.exports = mdlinks;

// const esteEsMiMetodoPrincipal = (path, options) => new Promise((resolve, reject) => {
// })

// /*
// Resolve == Return
// Reject == Throw
// */