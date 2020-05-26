const path = require('path');
const fileSystem = require('fs');

const mdlinks = (filePath, opts = {validate: false}) => {
  return [[]];
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
    console.log(files);
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