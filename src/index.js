const fn = require('./flowmd.js');
const axios = require('axios');

const mdlinks = (elemPath, options = { validate: false }) =>
  new Promise((resolve, reject) => {
    const absPath = fn.convertRelativeToAbsolutePath(elemPath);

    if (fn.isValidPath(absPath)) {
      const arrMdFilePath = fn.getPathMdFile(absPath);

      if (arrMdFilePath.length) {
        const arrLinksFound = fn.findLinks(arrMdFilePath);

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
            const arrLinkStatus = [];
            arrMdFileLinks.forEach((mdFileLinks) => {
              arrLinkStatus.push(axios.get(mdFileLinks.href)
                .then((data) => {
                  return {
                    ...mdFileLinks,
                    status: data.status,
                    msg: 'OK'
                  }
                })
                .catch((err) => {
                  // console.log(err.response)
                  return {
                    ...mdFileLinks,
                    status: err.response ? err.response.status : 999,
                    msg: 'FAIL'
                  }                  
                })
              );
            });
            resolve(Promise.all(arrLinkStatus))     
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
