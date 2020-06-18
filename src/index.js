const axios = require('axios');

const {
  convertRelativeToAbsolutePath,
  isValidPath,
  getPathMdFile,
  findLinks
} = require('./flowmd.js');

//? Fn para el validate 
const validateWithAxios = (arrMdFileLinks) => {
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
        return {
          ...mdFileLinks,
          status: err.response ? err.response.status : 999,
          msg: 'FAIL'
        }
      })
    );
  });

  return arrLinkStatus;
}

//? Fn para el arr de objetos de mdlinks 
const objMdlinks = (arrLinksFound) => {
  const arrMdFileLinks = [];

  if (arrLinksFound.length) {
    arrLinksFound.forEach((linkFound) => {
      linkFound.links.forEach((link) => {
        const str = link.split('](');
        arrMdFileLinks.push({
          href: str[1].trim().slice(0, -1),
          text: str[0].trim().slice(1, 50),
          file: linkFound.path
        })
      });
    });
  }  
  return arrMdFileLinks;
};

const mdlinks = (elemPath, options = {
    validate: false
  }) =>
  new Promise((resolve, reject) => {
    const absPath = convertRelativeToAbsolutePath(elemPath);

    if (!isValidPath(absPath)) {
      reject(new Error('La ruta ingresada no es válida'));
    }
    
    const arrMdFilePath = getPathMdFile(absPath);

    if (!arrMdFilePath.length) {
      reject(new Error('No se encontraron archivos .md'));
    }

    const arrLinksFound = findLinks(arrMdFilePath);
    const arrMdFileLinks = objMdlinks(arrLinksFound);

    if (!arrMdFileLinks.length) {
      reject(new Error('No se encontraron links'));
    } 

    if (options.validate) {
      const arrLinkStatus = validateWithAxios(arrMdFileLinks);
      resolve(Promise.all(arrLinkStatus));
    } else {
      resolve(arrMdFileLinks);
    }

  });

module.exports = mdlinks;