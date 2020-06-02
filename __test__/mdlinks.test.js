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
  test('Probando con un String vacío', () => {
    expect(flowmd.convertRelativeToAbsolutePath('')).toBe('C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\src');
    });
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
    const absPath = flowmd.convertRelativeToAbsolutePath('./a.md')
    expect(flowmd.isValidPath(absPath)).toBe(true);
  });
  test('Probando con la ruta a un elemento que no existe', () => {
    const absPath = flowmd.convertRelativeToAbsolutePath('../algo.md')
    expect(flowmd.isValidPath(absPath)).toBe(false);
  });
  test('Probando con un número', () => {
    expect(flowmd.isValidPath(6)).toBe(false);
  });
});

describe('OBTENIENDO RUTAS DE ARCHIVOS MD', () => {
  test('Probando con un directorio vacío', () => {
    const absPath = flowmd.convertRelativeToAbsolutePath('./prueba');
    expect(flowmd.getPathMdFile(absPath)).toEqual([]);
  });
  test('Probando con un directorio con elementos', () => {
    const absPath = flowmd.convertRelativeToAbsolutePath('../src');
    expect(flowmd.getPathMdFile(absPath)).toEqual([
      `C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\src\\a.md`,
      `C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\src\\test\\paso-a-paso.md`,
    ]);
  });
  test('Probando con un archivo md', () => {
    const absPath = flowmd.convertRelativeToAbsolutePath('./paso_a_paso.md');
    expect(flowmd.getPathMdFile(absPath)).toEqual(['C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\src\\paso_a_paso.md']);
  });
});

describe('ENCONTRANDO LINKS EN ARCHIVOS MD', () => {
  test('Probando con un archivo md lleno de enlaces', () => {
    expect(flowmd.findLinks(['C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\src\\a.md'])[0].links[0]).toBe('[learnyounode](https://github.com/workshopper/learnyounode)');
  });
  test('Probando con un string', () => {
    expect(flowmd.findLinks('array de links')).toEqual([]);
  });
});