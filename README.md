# Markdown Links

![Flowchart mdlinks](./src/img/diagrama-mdlinks.png)

## Instalación
``` 
$ npm install argierdfj/LIM012-fe-md-links
```
## Uso
```js
const mdlinks = require('mdlinks');

const fnMdLinks = mdLinks(path, options)
.then((links) => {
  console.log(links)
})
.catch((err) => {
  console.log(err.message);
});
```

## CLI
```
$ npm install argierdfj/LIM012-fe-md-links
```
```
$ mdlinks ./path
  [
    {
      href: 'url',
      text: 'texto',
      file: 'ruta'
    }
  ]


$ mdlinks ./path --validate
  [
    {
      href: 'url',
      text: 'texto',
      file: 'ruta',
      status: 200,
      msg: 'OK'
    },
    {
      href: 'url',
      text: 'texto',
      file: 'ruta',
      status: 500,
      msg: 'FAIL'
    }
  ]

$ mdlinks ./path --stats
    Total: 54
    Unique: 53


$ mdlinks ./path --validate --stats
    Total: 54
    Unique: 53
    Broken: 5

```
## Licencia
MIT ©


## Objetivos de aprendizaje

### Pendientes.

### Organización en Github

* [x] Projects
* [x] Issues
* [x] Labels
* [x] Milestones

### Del proyecto.

### Javascript
- [x] Uso de callbacks
- [x] Consumo de Promesas
- [x] Creacion de Promesas
- [x] Modulos de Js
- [x] Recursión

### Node
- [x] Sistema de archivos
- [x] package.json
- [x] crear modules
- [x] Instalar y usar modules
- [x] npm scripts
- [x] CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing
- [x] Testeo de tus funciones
- [ ] Testeo asíncrono
- [ ] Uso de librerias de Mock
- [ ] Mocks manuales
- [ ] Testeo para multiples Sistemas Operativos

### Git y Github
- [x] Organización en Github

### Buenas prácticas de desarrollo
- [x] Modularización
- [x] Nomenclatura / Semántica
- [x] Linting

***
