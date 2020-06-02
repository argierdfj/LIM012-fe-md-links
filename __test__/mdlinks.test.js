const mdlinks = require('../src/index.js');
const flowmd = require('../src/flowmd.js');

// describe('Test asíncrono', () => {
//   test('Realizando una petición a una API', (done) => {
//     const api = 'https://us-central1-movistar-web-publica.cloudfunctions.net/ga_flow/hello_world'
//     mdlinks(api).then((data) => {     
//       expect(data.saludo).toBe('Hello World')
//       done();
//     })
//   });
// });

// describe('Extraer links', () => {
//   test('Probando extraer links de archivos md', () => {
//     let testing = md.mdlinks('./algo.md')
//     expect(testing[0]).toBe(['www.url.com', 'pagina', './archivo.md']);
//   });
// });

describe('RESOLVIENDO A RUTA ABSOLUTA', () => {
  test('Probando con una ruta a un archivo .js', () => {
    expect(flowmd.convertRelativeToAbsolutePath('../__test__/algo.js')).toBe(`${__dirname}\\algo.js`);
  });
  test('Probando con una ruta de una carpeta', () => {
    expect(flowmd.convertRelativeToAbsolutePath('../__test__/prueba')).toBe(`${__dirname}\\prueba`);
  });
  // test('Probando con un String vacío', () => {
  //   expect(flowmd.convertRelativeToAbsolutePath('')).toBe(__dirname);
  //   });
  test('Probando con un Número', () => {
    expect(flowmd.convertRelativeToAbsolutePath(2)).toBe('');
  });
  test('Probando con un Array', () => {
    expect(flowmd.convertRelativeToAbsolutePath([])).toBe('');
  });
  test('Probando con un Objeto', () => {
    expect(flowmd.convertRelativeToAbsolutePath({})).toBe('');
  });
  test('Probando con un Booleano', () => {
    expect(flowmd.convertRelativeToAbsolutePath(true)).toBe('');
  });
  test('Probando con una Función', () => {
    expect(flowmd.convertRelativeToAbsolutePath(() => {})).toBe('');
  });
});

describe('VERIFICANDO SI LA RUTA ES VÁLIDA', () => {
  test('Probando con la ruta a un elemento que si existe', () => {
    const path = flowmd.convertRelativeToAbsolutePath('./a.md')
    expect(flowmd.isValidPath(path)).toBe(true);
  });
  test('Probando con la ruta a un elemento que no existe', () => {
    const path = flowmd.convertRelativeToAbsolutePath('../algo.md')
    expect(flowmd.isValidPath(path)).toBe(false);
  });
  test('Probando con un número', () => {
    expect(flowmd.isValidPath(6)).toBe(false);
  });
});

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