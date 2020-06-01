si tienes dudas existenciales con respecto a estas decisiones. No existe una
"única" manera correcta :wink:

### Tutoriales / NodeSchool workshoppers

- [learnyounode](https://github.com/workshopper/learnyounode)
- [how-to-npm](https://github.com/workshopper/how-to-npm)
- [promise-it-wont-hurt](https://github.com/stevekane/promise-it-wont-hurt)


2-> Fn para validar si el elemento que estamos pasando en la ruta es un directorio o un archivo.
  - Recibe como parámetro la ruta del elemento y la variable de archivos md con un array vacío.
  - aplico el método de PATH .extnamen(elemPath) para verificar las extensiones de los elementos que analiza la fn.
  - Luego creo una condicional, donde evalúo si la extensión del elemento es igual a un string vacío, si es así entonces es un directorio.
  - En caso de que sea un directorio utilizo nuevamente el método de FS .readdirSync(elemPath) para leerlo y que devuleva en un arr los elementos dentro de ese directorio.
  - luego evalúo en otra condicional la longitud de ese arr para verificar si contiene elementos.
  - En caso de que sí contenga elementos recorro cada uno de ellos con el forEach.
  - Almaceno en una constante la concatenación de la ruta del elemento con el nombre del elemento.
  - Y vuelvo a llamar a mi fn para validar elemento (recursividad), pasándole como parámetro la constante donde almacené la concatenación de la ruta y el nombre y el mdFilesPath para que vuelva a analizar cada uno de los elementos que encuentre en su ejecución. Y en caso de que vaya encontrando archivos md los vaya añadiendo en el arr mdFilesPath.
  - En caso de que no sea un directorio, evalúo en una condicional si la extensión del archivo es .md.
  - Si encuentra archivos con extensión md los va a añadir en el arr mdFilies.
  - La fn retorna el arr mdFilesPath que contendrá las rutas absolutas de esos archivos.

3-> Fn para buscar links en archivos md.
  - recibe como parámetro el arr mdFilesPath.
  - Creo una variable links con un arr vacío.
  - Almaceno en una constante el contenido del elemento leyendolo con el método de FS readFileSync(mdFile, {encoding: 'utf8'}).
  - Almaceno en una constante la expresión regular para encontrar los patrones de cómo se escriben links en archivos md, la letra 'g' indica que la búsqueda es global, encuentra todos los resultados en vez de parar después de la primer búsqueda exitosa.
  - Al arr links le añado con push un objeto con las keys:
    * path: para alamcenar la ruta del archivo md
    * links: para almacenar los links encontrados en ese archivo usando el método match() para obtener todas las ocurrencias de mi expresión regular dentro del contenido del archivo md que es un string.

4-> Fn MDLINKS
  - Recibe como parámetro la ruta del elemento y opts con valor undefined.
  - Dentro de ella se ejecutan las fn:
    * relativeToAbsolute()
    * validatePath()
    * validateElem()
    * searchLinks()
  - Los links encontrados en la fn searchLinks() los almaceno en una variable para darles el formato en que deben retornarse URL, TEXTO y RUTA.
  - El valor de retorno lo convierto a una promesa.

  TO DO
  - Crear variable err para mostrar errores personalizados de acuerdo a lo que se esté evaluando
  