const mockAxios = require('axios');
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
  test('Probando con un String vacío', () => {
    expect(flowmd.isValidPath('')).toBe(false);
  });
  test('Probando con un Número', () => {
    expect(flowmd.isValidPath(2)).toBe(false);
  });
  test('Probando con un Array', () => {
    expect(flowmd.isValidPath([])).toBe(false);
  });
  test('Probando con un Objeto', () => {
    expect(flowmd.isValidPath({})).toBe(false);
  });
  test('Probando con un Booleano', () => {
    expect(flowmd.isValidPath(true)).toBe(false);
  });
  test('Probando con una Función', () => {
    expect(flowmd.isValidPath(() => {})).toBe(false);
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
    const absPath = flowmd.convertRelativeToAbsolutePath('../paso-a-paso.md');
    expect(flowmd.getPathMdFile(absPath)).toEqual(['C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\paso-a-paso.md']);
  });
});

describe('ENCONTRANDO LINKS EN ARCHIVOS MD', () => {
  test('Probando con un archivo md que contiene enlaces', () => {
    expect(flowmd.findLinks(['C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\__test__\\test\\test.md'])[0].links[0]).toBe('[learnyounode](https://github.com/workshopper/learnyounode)');
  });
  test('Probando con un string', () => {
    expect(flowmd.findLinks('array de links')).toEqual([]);
  });
  test('Probando con un array vacío', () => {
    expect(flowmd.findLinks([])).toEqual([]);
  });
});

describe('PROBANDO FUNCIÓN MD LINKS', () => {
  test('Probando con un archivo md que contiene enlaces', (done) => {
    const api = flowmd.convertRelativeToAbsolutePath('../__test__/test/test.md');
    mdlinks(api).then((links) => {
      expect(links[0]).toEqual({
        'file': 'C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\__test__\\test\\test.md',
        'href': 'https://github.com/workshopper/learnyounode',
        'text': 'learnyounode'
      })
      done();
    })
  });
  test('Probando con un directorio que contiene elementos', (done) => {
    const api = flowmd.convertRelativeToAbsolutePath('../__test__/');
    mdlinks(api).then((links) => {
      expect(links[0]).toEqual({
        'file': 'C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\__test__\\test\\test.md',
        'href': 'https://github.com/workshopper/learnyounode',
        'text': 'learnyounode'
      })
      done();
    })
  });
  test('Probando con un archivo html', (done) => {
    const api = flowmd.convertRelativeToAbsolutePath('../__test__/test/test.html');
    mdlinks(api).catch((err) => {
      expect(err).toEqual(new Error('No se encontraron archivos .md'));
      done();
    })
  });
  test('Probando con una ruta que no es válida', (done) => {
    const api = flowmd.convertRelativeToAbsolutePath('.test.html');
    mdlinks(api).catch((err) => {
      expect(err).toEqual(new Error('La ruta ingresada no es válida'));
      done();
    })
  });
  test('Probando con un archivo md que no continen links', (done) => {
    const api = flowmd.convertRelativeToAbsolutePath('../paso-a-paso.md');
    mdlinks(api).catch((err) => {
      expect(err).toEqual(new Error('No se encontraron links'));
      done();
    })
  });

  test('Realizando petición a http 200', (done) => {
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        status: 200
      })
    );


    const api = flowmd.convertRelativeToAbsolutePath('../__test__/test/test.md');
    mdlinks(api, {
        validate: true
      })
      .then((links) => {
        expect(links[2]).toEqual({
          'file': 'C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\__test__\\test\\test.md',
          'href': "https://github.com/stevekane/promise-it-wont-hurt",
          'msg': "OK",
          'status': 200,
          'text': "promise-it-wont-hurt",
        })
        done();
      })
  });

  test('Realizando petición a http 400', (done) => {
    mockAxios.get.mockImplementation(() =>
      Promise.reject({
        response : { status: 400 }
      })
    );


    const api = flowmd.convertRelativeToAbsolutePath('../__test__/test/test.md');
    mdlinks(api, {
        validate: true
      })
      .then((links) => {
        expect(links[3]).toEqual({
          href: 'https://us-central1-movistar-web-publica.cloudfunctions.net/ga_flow/hello_world/400',
          text: 'error 400 test',
          file: 'C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\__test__\\test\\test.md',
          status: 400,
          msg: 'FAIL'
        })
        done();
      })
  });

  test('Realizando petición a http 500', (done) => {
    mockAxios.get.mockImplementation(() =>
      Promise.reject({
        response : { status: 500 }
      })
    );


    const api = flowmd.convertRelativeToAbsolutePath('../__test__/test/test.md');
    mdlinks(api, {
        validate: true
      })
      .then((links) => {
        expect(links[4]).toEqual({
          href: 'https://us-central1-movistar-web-publica.cloudfunctions.net/ga_flow/hello_world/500',
          text: 'error 500 test',
          file: 'C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\__test__\\test\\test.md',
          status: 500,
          msg: 'FAIL'
        })
        done();
      })
  });

  test('Realizando petición a http 999', (done) => {
    mockAxios.get.mockImplementation(() =>
      Promise.reject({})
    );


    const api = flowmd.convertRelativeToAbsolutePath('../__test__/test/test.md');
    mdlinks(api, {
        validate: true
      })
      .then((links) => {
        expect(links[4]).toEqual({
          href: 'https://us-central1-movistar-web-publica.cloudfunctions.net/ga_flow/hello_world/500',
          text: 'error 500 test',
          file: 'C:\\Users\\Estudiante\\Desktop\\Proyectos Laboratoria\\LIM012-fe-md-links\\__test__\\test\\test.md',
          status: 999,
          msg: 'FAIL'
        })
        done();
      })
  });
});