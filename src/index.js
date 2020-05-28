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

const relativeToAbsolute = (elemPath) => {
  return path.resolve(__dirname, elemPath)
}

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

const validateDirectory = (elemPath) => {
  const extElem = path.extname(elemPath)
  if (extElem == '') {
    console.log('Es una carpeta');
  } else {
    console.log('No es una carpeta');
  }
  return extElem;
}

const validateFile = (elemPath) => {
  return false;
}

module.exports = {
  mdlinks,
  relativeToAbsolute,
  validatePath,
  validateDirectory,
  validateFile
}