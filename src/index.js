const axios = require('axios');
const path = require('path');
const fileSystem = require('fs');

const mdlinks = async (elemPath, opts = undefined) => {
  return axios.get(elemPath)
  .then(({data}) => {
    return data;
  })
  .catch()
}



//? ES RUTA ABSOLUTA?
const relativeToAbsolute = (elemPath) => {
  return path.resolve(__dirname, elemPath)
}



//? ES RUTA VÁLIDA
const validatePath = (elemPath) => {
  const directoryName = path.dirname(elemPath);
  const elemName = path.basename(elemPath);
  const elemList = fileSystem.readdirSync(directoryName);

  let foundElem = false;
  if (elemList.includes(elemName)) {
    console.log('Ruta válida');
    foundElem = true
  } else {
    console.log('La ruta no es válida');
  }

  return foundElem;
}



//? ¿ES UNA CARPETA?
const validateElem = (elemPath, mdFiles = []) => {
// para ver la extensión del elemento
  const extElem = path.extname(elemPath)

  //* Si es una carpeta...
  if (extElem == '') {
    console.log('Es una carpeta');
    const elemList = fileSystem.readdirSync(elemPath);

    //? CONTIENE ELEMENTOS?
    //* Si contiene elementos
    if (elemList.length) {
      console.log('Contiene elementos');

      elemList.forEach((elem) => {
        const absPath = `${elemPath}\\${elem}`;
        validateElem(absPath, mdFiles)
      });
    } else {
      console.log('No contiene elementos');
    }
  

  } else {
    console.log('No es una carpeta');
    if (extElem == '.md') {
      mdFiles.push(elemPath)
    }
  }

  return mdFiles;
}



const searchingLinks = (mdFiles) => {
  const links = [];
  mdFiles.forEach((mdFile) => {
    const contentFile = fileSystem.readFileSync(mdFile, {encoding: 'utf8'})
    const regExpLinks = new RegExp('\\[.+\\]\\(.+\\)+', 'g')
    links.push(contentFile.match(regExpLinks));
  });
  return links;
}

module.exports = {
  mdlinks,
  relativeToAbsolute,
  validatePath,
  validateElem,
  searchingLinks
}