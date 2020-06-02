const path = require('path');
const fileSystem = require('fs');

const flowmd = {
  convertRelativeToAbsolutePath: (elemPath) => {
    if (typeof elemPath === 'string') {
      return path.resolve(__dirname, elemPath);
    }
    return '';
  },
  isValidPath: (elemPath) => {
    if (typeof elemPath === 'string') {
      const directoryName = path.dirname(elemPath);
      const elemName = path.basename(elemPath);
      const elemList = fileSystem.readdirSync(directoryName);
  
      let foundElem = false;
      if (elemList.includes(elemName)) {
        foundElem = true
      }
      return foundElem;
    }
    return false;
  },
  getPathMdFile: (elemPath, arrMdFilesPath = []) => {
    const extElem = path.extname(elemPath)
    const elemName = path.basename(elemPath);

    //? ES UN DIRECTORIO
    if (extElem == '' && elemName.charAt(0) !== '.') {

      const elemList = fileSystem.readdirSync(elemPath);

      //? CONTIENE ELEMENTOS
      if (elemList.length) {
        elemList.forEach((elem) => {
          const absPath = `${elemPath}\\${elem}`;
          flowmd.getPathMdFile(absPath, arrMdFilesPath);
        });
      }
    } else {
      if (extElem == '.md') {
        arrMdFilesPath.push(elemPath)
      }
    }

    return arrMdFilesPath;
  },
  findLinks: (arrMdFilesPath) => {
    const arrLinks = [];
    if (arrMdFilesPath.length) {
      arrMdFilesPath.forEach((mdFilePath) => {
        const contentFile = fileSystem.readFileSync(mdFilePath, {
          encoding: 'utf8'
        })
        const regExpLinks = new RegExp('\\[.+\\]\\(.+\\)+', 'g');
        arrLinks.push({
          path: mdFilePath,
          links: contentFile.match(regExpLinks)
        });
      });
    }

    return arrLinks.flat();
  }
}

module.exports = flowmd;