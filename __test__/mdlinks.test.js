const {
  convertRelativeToAbsolutePath,
  isValidPath,
  getPathMdFile,
  findLinks
} = require('../src/flowmd.js');

const mockAxios = require('axios');
const mdlinks = require('../src/index.js');
const path = require('path');

describe('RESOLVIENDO A RUTA ABSOLUTA', () => {
  test('Probando con una ruta a un archivo .html', () => {
    expect(convertRelativeToAbsolutePath('./__test__/test.html')).toBe(path.resolve(`${__dirname}\\test.html`));
  });
  test('Probando con una ruta de una carpeta', () => {
    expect(convertRelativeToAbsolutePath('./__test__/test')).toBe(path.resolve(`${__dirname}\\test`));
  });
  test('Probando con un String vacío', () => {
    expect(convertRelativeToAbsolutePath('')).toBe(path.resolve(process.cwd()));
  });
  test('Probando con un Número', () => {
    expect(convertRelativeToAbsolutePath(2)).toBe('');
  });
  test('Probando con un Array', () => {
    expect(convertRelativeToAbsolutePath([])).toBe('');
  });
  test('Probando con un Objeto', () => {
    expect(convertRelativeToAbsolutePath({})).toBe('');
  });
  test('Probando con un Booleano', () => {
    expect(convertRelativeToAbsolutePath(true)).toBe('');
  });
  test('Probando con una Función', () => {
    expect(convertRelativeToAbsolutePath(() => {})).toBe('');
  });
});

describe('VERIFICANDO SI LA RUTA ES VÁLIDA', () => {
  test('Probando con la ruta a un elemento que si existe', () => {
    const absPath = convertRelativeToAbsolutePath('./paso-a-paso.md')
    expect(isValidPath(absPath)).toBe(true);
  });
  test('Probando con la ruta a un elemento que no existe', () => {
    const absPath = convertRelativeToAbsolutePath('./test.md');
    expect(isValidPath(absPath)).toBe(false);
  });
  test('Probando con un String vacío', () => {
    expect(isValidPath('')).toBe(false);
  });
  test('Probando con un Número', () => {
    expect(isValidPath(2)).toBe(false);
  });
  test('Probando con un Array', () => {
    expect(isValidPath([])).toBe(false);
  });
  test('Probando con un Objeto', () => {
    expect(isValidPath({})).toBe(false);
  });
  test('Probando con un Booleano', () => {
    expect(isValidPath(true)).toBe(false);
  });
  test('Probando con una Función', () => {
    expect(isValidPath(() => {})).toBe(false);
  });
});

describe('OBTENIENDO RUTAS DE ARCHIVOS MD', () => {
  test('Probando con un directorio vacío', () => {
    const absPath = convertRelativeToAbsolutePath('./__test__/test_2');
    expect(getPathMdFile(absPath)).toEqual([]);
  });
  test('Probando con un directorio con elementos', () => {
    const absPath = convertRelativeToAbsolutePath('./__test__');
    expect(getPathMdFile(absPath)).toEqual([path.resolve('__test__/test/test.md')]);
  });
  test('Probando con un archivo md', () => {
    const absPath = convertRelativeToAbsolutePath('./paso-a-paso.md');
    expect(getPathMdFile(absPath)).toEqual([path.resolve('./paso-a-paso.md')]);
  });
  test('Probando con un String vacío', () => {
    expect(getPathMdFile('')).toBe('');
  });
  test('Probando con un Número', () => {
    expect(getPathMdFile(2)).toBe('');
  });
  test('Probando con un Array', () => {
    expect(getPathMdFile([])).toBe('');
  });
  test('Probando con un Objeto', () => {
    expect(getPathMdFile({})).toBe('');
  });
  test('Probando con un Booleano', () => {
    expect(getPathMdFile(true)).toBe('');
  });
  test('Probando con una Función', () => {
    expect(getPathMdFile(() => {})).toBe('');
  });
});

describe('ENCONTRANDO LINKS EN ARCHIVOS MD', () => {
  test('Probando con un archivo md que contiene enlaces', () => {
    expect(findLinks([path.resolve('__test__/test/test.md')])[0].links[0]).toBe('[learnyounode](https://github.com/workshopper/learnyounode)');
  });
  test('Probando con un string', () => {
    expect(findLinks('array de links')).toEqual([]);
  });
  test('Probando con un array vacío', () => {
    expect(findLinks([])).toEqual([]);
  });
  test('Probando con un archivo md que no contiene enlaces', () => {
    expect(findLinks([path.resolve('paso-a-paso.md')])).toEqual([]);
  });
});

describe('PROBANDO FUNCIÓN MD LINKS', () => {
  test('Probando con un archivo md que contiene enlaces', (done) => {
    const api = convertRelativeToAbsolutePath('./__test__/test/test.md');
    mdlinks(api).then((links) => {
      expect(links[0]).toEqual({
        'file': api,
        'href': 'https://github.com/workshopper/learnyounode',
        'text': 'learnyounode'
      })
      done();
    })
  });
  test('Probando con un objeto vacío', (done) => {
    const api = convertRelativeToAbsolutePath('./__test__/test/test.md');
    mdlinks(api, {}).then((links) => {
      expect(links[0]).toEqual({
        'file': api,
        'href': 'https://github.com/workshopper/learnyounode',
        'text': 'learnyounode'
      })
      done();
    })
  });
  test('Probando con un directorio que contiene elementos', (done) => {
    const api = convertRelativeToAbsolutePath('./__test__/');
    mdlinks(api).then((links) => {
      expect(links[0]).toEqual({
        'file': path.resolve('__test__/test/test.md'),
        'href': 'https://github.com/workshopper/learnyounode',
        'text': 'learnyounode'
      })
      done();
    })
  });
  test('Probando con un archivo html', (done) => {
    const api = convertRelativeToAbsolutePath('./__test__/test/test.html');
    mdlinks(api).catch((err) => {
      expect(err).toEqual(new Error('No se encontraron archivos .md'));
      done();
    })
  });
  test('Probando con una ruta que no es válida', (done) => {
    const api = convertRelativeToAbsolutePath('./test.html');
    mdlinks(api).catch((err) => {
      expect(err).toEqual(new Error('La ruta ingresada no es válida'));
      done();
    })
  });
  test('Probando con un archivo md que no continen links', (done) => {
    const api = convertRelativeToAbsolutePath('./paso-a-paso.md');
    mdlinks(api).catch((err) => {
      expect(err).toEqual(new Error('No se encontraron links'));
      done();
    })
  });

  // MOCKS
  test('Realizando petición a http 200', (done) => {
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        status: 200
      })
    );


    const api = convertRelativeToAbsolutePath('./__test__/test/test.md');
    mdlinks(api, {
        validate: true
      })
      .then((links) => {
        expect(links[2]).toEqual({
          'file': api,
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
        response: {
          status: 400
        }
      })
    );


    const api = convertRelativeToAbsolutePath('./__test__/test/test.md');
    mdlinks(api, {
        validate: true
      })
      .then((links) => {
        expect(links[3]).toEqual({
          href: 'https://us-central1-movistar-web-publica.cloudfunctions.net/ga_flow/hello_world/400',
          text: 'error 400 test',
          file: api,
          status: 400,
          msg: 'FAIL'
        })
        done();
      })
  });

  test('Realizando petición a http 500', (done) => {
    mockAxios.get.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 500
        }
      })
    );


    const api = convertRelativeToAbsolutePath('./__test__/test/test.md');
    mdlinks(api, {
        validate: true
      })
      .then((links) => {
        expect(links[4]).toEqual({
          href: 'https://us-central1-movistar-web-publica.cloudfunctions.net/ga_flow/hello_world/500',
          text: 'error 500 test',
          file: api,
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


    const api = convertRelativeToAbsolutePath('./__test__/test/test.md');
    mdlinks(api, {
        validate: true
      })
      .then((links) => {
        expect(links[4]).toEqual({
          href: 'https://us-central1-movistar-web-publica.cloudfunctions.net/ga_flow/hello_world/500',
          text: 'error 500 test',
          file: api,
          status: 999,
          msg: 'FAIL'
        })
        done();
      })
  });
});