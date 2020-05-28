const md = require('../src/index.js');

describe('Test asíncrono', () => {
  test('Realizando una petición a una API', (done) => {
    const api = 'https://us-central1-movistar-web-publica.cloudfunctions.net/ga_flow/hello_world'
    md.mdlinks(api).then((data) => {     
      expect(data.saludo).toBe('Hello World')
      done();
    })
  });
});

// describe('Extraer links', () => {
//   test('Probando extraer links de archivos md', () => {
//     let testing = md.mdlinks('./algo.md')
//     expect(testing[0]).toBe(['www.url.com', 'pagina', './archivo.md']);
//   });
// });

// describe('Cambiar ruta relativa a absoluta', () => {
//   test('Probando convertir ruta relativa a absoluta', () => {
//     expect(md.relativeToAbsolute('./algo.md')).toBe('C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\algo.md');
//   });
// });

// describe('validar ruta', () => {
//   test('verificando si la ruta es válida', () => {
//     expect(md.validateRoute('./algo.md')).toBe(true);
//   });
// });

// describe('Verificar elemento', () => {
//   test('Verificando si es una carpeta', () => {
//     expect(md.validateFolder('./algo.md')).toBe(true);
//   });
// });

// describe('validar archivos md', () => {
//   test('verificando si el archivo es formato md', () => {
//     expect(md.validateFile('./algo.md')).toBe(false);
//   });
// });