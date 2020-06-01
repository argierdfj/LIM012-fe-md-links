const axios = require('axios');
const path = require('path');
const fileSystem = require('fs');

// const mdlinks = async (elemPath, opts = undefined) => {
//   return axios.get(elemPath)
//   .then(({data}) => {
//     return data;
//   })
//   .catch()
// }

const relativeToAbsolute = (elemPath) => {
  return path.resolve(__dirname, elemPath)
}

const validatePath = (elemPath) => {
  const directoryName = path.dirname(elemPath);
  const elemName = path.basename(elemPath);
  const elemList = fileSystem.readdirSync(directoryName);

  let foundElem = false;
  if (elemList.includes(elemName)) {
    // console.log('Ruta válida');
    foundElem = true
  } else {
    // console.log('La ruta no es válida');
  }

  return foundElem;
}

const validateElem = (elemPath, mdFilesPath = []) => {
  const extElem = path.extname(elemPath)
  const elemName = path.basename(elemPath);
 
  //? ES UN DIRECTORIO
  if (extElem == '' && elemName.charAt(0) !== '.') {
 
    const elemList = fileSystem.readdirSync(elemPath);

    //? CONTIENE ELEMENTOS
    if (elemList.length) {
      elemList.forEach((elem) => {
        const absPath = `${elemPath}\\${elem}`;
        validateElem(absPath, mdFilesPath)
      });
    } else {
      // console.log('No contiene elementos');
    }
  } else {
    // console.log('No es una carpeta');
    if (extElem == '.md') {
      mdFilesPath.push(elemPath)
    }
  }

  return mdFilesPath;
}



const searchLinks = (mdFilesPath) => {
  const links = [];
  mdFilesPath.forEach((mdFile) => {
    const contentFile = fileSystem.readFileSync(mdFile, {
      encoding: 'utf8'
    })
    const regExpLinks = new RegExp('\\[.+\\]\\(.+\\)+', 'g')
    links.push({
      path: mdFile,
      links: contentFile.match(regExpLinks)
    });
  });

  return links.flat();
}

const mdlinks = (elemPath, opts = {validate: false}) => {
  const absPath = relativeToAbsolute(elemPath)

  // console.log('-'.repeat(absPath.length))
  // console.log(absPath);
  // console.log('-'.repeat(absPath.length))

  // console.log(validatePath(absPath))
  const arrMdFilePath = validateElem(absPath)

  const linksFound = searchLinks(arrMdFilePath);
  // console.log(linksFound);

  // URL, TEXTO, RUTA
  const elemMdLinks = [];
  linksFound.forEach((linkFound) => {
    linkFound.links.forEach((link) => {
      const str = link.split('](');
      elemMdLinks.push({
        URL: str[1].slice(0, -1),
        TEXTO: str[0].slice(1, 50),
        RUTA: linkFound.path
      })
    });
  });

  console.log(elemMdLinks);
  

  return new Promise((resolve, reject) => {
    if (elemMdLinks.length) {
      resolve(elemMdLinks);
    } else {
      reject(new Error('No se encontraron links'))
    }
  });
}


module.exports = {
  mdlinks,
  relativeToAbsolute,
  validatePath,
  validateElem,
  searchLinks
}