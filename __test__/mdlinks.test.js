const mdlinks = require('../src/index.js');
const flowmd = require('../src/flowmd.js');

describe('RESOLVIENDO A RUTA ABSOLUTA', () => {
  test('Probando con una ruta a un archivo .html', () => {
    expect(flowmd.convertRelativeToAbsolutePath('../__test__/test.html')).toBe(`${__dirname}\\test.html`);
  });
  test('Probando con una ruta de una carpeta', () => {
    expect(flowmd.convertRelativeToAbsolutePath('../__test__/test')).toBe(`${__dirname}\\test`);
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
    const absPath = flowmd.convertRelativeToAbsolutePath('../paso-a-paso.md')
    expect(flowmd.isValidPath(absPath)).toBe(true);
  });
  test('Probando con la ruta a un elemento que no existe', () => {
    const absPath = flowmd.convertRelativeToAbsolutePath('../test.md');
    expect(flowmd.isValidPath(absPath)).toBe(false);
  });
  test('Probando con un número', () => {
    expect(flowmd.isValidPath(6)).toBe(false);
  });
});

describe('OBTENIENDO RUTAS DE ARCHIVOS MD', () => {
  test('Probando con un directorio vacío', () => {
    const absPath = flowmd.convertRelativeToAbsolutePath('../__test__/test_2');
    expect(flowmd.getPathMdFile(absPath)).toEqual([]);
  });
  test('Probando con un directorio con elementos', () => {
    const absPath = flowmd.convertRelativeToAbsolutePath('../__test__');
    expect(flowmd.getPathMdFile(absPath)).toEqual([
      `C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\__test__\\test\\test.md`,
    ]);
  });
  test('Probando con un archivo md', () => {
    const absPath = flowmd.convertRelativeToAbsolutePath('../paso_a_paso.md');
    expect(flowmd.getPathMdFile(absPath)).toEqual(['C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\paso_a_paso.md']);
  });
});

describe('ENCONTRANDO LINKS EN ARCHIVOS MD', () => {
  test('Probando con un archivo md con enlaces', () => {
    expect(flowmd.findLinks(['C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\__test__\\test\\test.md'])[0].links[0]).toBe('[learnyounode](https://github.com/workshopper/learnyounode)');
  });
  test('Probando con un string', () => {
    expect(flowmd.findLinks('array de links')).toEqual([]);
  });
});

describe('PROBANDO FUNCIÓN MD LINKS', () => {
  test('Realizando petición a http', (done) => {
    const api = flowmd.convertRelativeToAbsolutePath('../__test__/test/test.md');
    mdlinks(api).then((links) => {     
      expect(links[0]).toEqual({
        'file': 'C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\__test__\\test\\test.md',
        'href': 'https://github.com/workshopper/learnyounode',
        'text': 'learnyounode'})
      done();
    })
  });
  // test('Realizando petición a http2222222', (done) => {
  //   const api = flowmd.convertRelativeToAbsolutePath('../__test__/test/test.md');
  //   mdlinks(api, { validate: true })
  //   .then((links) => {     
  //     expect(links[2]).toEqual({
  //       'file': 'C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\__test__\\test\\test.md',
  //       'href': "https://github.com/stevekane/promise-it-wont-hurt",
  //       'msg': "OK",
  //       'status': 300,
  //       'text': "promise-it-wont-hurt",})
  //     done();
  //   })
  // });
});
