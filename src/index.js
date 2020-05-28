const axios = require('axios');
const path = require('path');
const fileSystem = require('fs');

const mdlinks = async (filePath, opts = undefined) => {
  return axios.get(filePath)
  .then(({data}) => {
    return data;
  });
}

const relativeToAbsolute = (filePath) => {

  // if (!path.isAbsolute(filePath)) {
  //   return path.resolve(__dirname, filePath)
  // }
  // return filePath;
  return path.resolve(__dirname, filePath)
}

const validatePath = (filePath) => {
  const directory = path.dirname(filePath);
  const fileName = path.basename(filePath);
  fileSystem.readdir(directory, (err, files) => {
    if (files.includes(fileName)) {
      console.log(files);
      console.log('Archivo encontrado')
    } else {
      console.log('No se encontró archivo')
    }
    
  });
  return true;
}

const validateFolder = (route) => {
  return true;
}

const validateFile = (route) => {
  return false;
}

module.exports = {
  mdlinks,
  relativeToAbsolute,
  validatePath,
  validateFolder,
  validateFile
}