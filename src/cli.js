#!/usr/bin/env node

const mdlinks = require('./index');
const chalk = require('chalk');

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
        console.log(`${chalk.magenta('Total:')} ${links.length}`);

        //* Para contar solo los links únicos.
        const newLinks = [];
        for (let i = 0; i < links.length; i++) {
          newLinks.push(JSON.stringify(links[i]));
        }
        console.log(chalk.cyan('Unique:') + [...new Set(newLinks)].length);

        //* Para contar la cantidad de links rotos
        if (validate) {
          const brokenLinks = links.filter((link) => link.msg === 'FAIL');
          console.log(`${chalk.red('Broken:')} ${brokenLinks.length}`);
        }
      } else if (validate) {
        const relativePath = process.cwd();
        links.forEach((e) => {
          const path = chalk.cyan(e.file.replace(relativePath, '.'));
          const url = e.href;
          const text = chalk.blue(e.text);
          let status = (e.msg === 'OK') ? chalk.green(e.status) : chalk.red(e.status);
          const msg = (e.msg === 'OK') ? chalk.green(e.msg) : chalk.red(e.msg);

          console.log(`${path} ${url} ${text} ${status} ${msg}`);
        });
      } else {
        const relativePath = process.cwd();
        links.forEach((e) => {
          const path = chalk.cyan(e.file.replace(relativePath, '.'));
          const url = e.href;
          const text = chalk.blue(e.text);

          console.log(`${path} ${url} ${text}`);
        });
      }
    }).catch((err) => {
      console.log(err.message);
    });
};

cli(args);