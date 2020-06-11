#!/usr/bin/env node

const mdlinks = require('./index');

// Retorna un arr con los args pasados en la linea de comandos, el 1ero es el ejecutable node, el 2do la ruta del ejecutable y el 3ero los argumentos que el usuario le pase a mi fn.
const [, , ...args] = process.argv;

const cli = (args) => {
  const elemPath = args[0];
  let stats = false;
  let validate = false;

  if (args.includes('--stats')) {
    stats = true;
  }

  if (args.includes('--validate')) {
    validate = true;
  }

  const options = {
    validate
  }

  mdlinks(elemPath, options)
    .then((links) => {
      if (stats) {
        //* Para contar la cantidad de total links
        console.log('Total: ' + links.length);

        //* Para contar solo los links únicos.
        const newLinks = [];
        for (let i = 0; i < links.length; i++) {
          newLinks.push(JSON.stringify(links[i]));
        }
        console.log('Unique: ' + [...new Set(newLinks)].length)

        //* Para contar la cantidad de links rotos
        if (validate) {
          const brokenLinks = links.filter((link) => link.msg === 'FAIL');
          console.log('Broken: ' + brokenLinks.length);
        }
      } else {
        console.log(links);
      }
    }).catch((err) => {
      console.log(err.message);
    });
};

cli(args);