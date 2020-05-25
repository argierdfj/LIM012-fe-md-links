import {
  mdlinks,
} from '../src/index.js';

describe('Función mdlinks', () => {
  test('Probando función de mdlinks', () => {
    let testing = mdlinks('./algo.md', null)
    expect(testing[0]).toBe(['www.url.com', 'pagina', './archivo.md'])
  });
});