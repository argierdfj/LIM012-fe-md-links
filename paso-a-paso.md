1. Almacené en unas constantes las librerías que utilicé.
PATH y FS.

2. Creé un objeto flowmd para hacer referencia al diagrama de flujo del proyecto, y dentro almacené las fn.

3. Fn para resolver a una ruta absoluta "convertRelativeToAbsolutePath", retorna la ruta absoluta.
  - Recibe como parámetro la ruta del elemento.
  - Retorno el método ```PATH.resolve()```.
  - El ```__dirname``` para obtener la ruta del archivo que donde estoy ejecutando la fn.
  - Y la ruta del elemento que quiero convertir en absoluta.

4. Fn para validar la ruta ```isValidPath()```, retorna un Booleano.
  - Recibe como parámetro la ruta del elemento
  - Almaceno en una constante el nombre del directorio con el método ```PATH.dirname(elemPath)```.
  - Almaceno en otra constante el nombre del elemento a buscar con el método path.basename(elemPath).
  - Utilizo el método de ```S.readdirSync(directoryName)``` para leer el directorio donde estoy buscando a un determinado archivo y éste devolverá un arr los nombres de los elementos que contiene.
  - Creo una variable booleana con valor False que cambiará a true si encuentra el elemento en ese directorio.
  - Evalúo en una condicional con el método de arr includes si el arr devuelto por el método readdirSync contiene el elemento que se está buscando.
  - Si lo encuentra se cambia a true el valor de la variable foundElem, si no encuentra el archivo en el directorio que se está analizando la variable será False, ésto porque el elemento no existe en esa ruta, por lo tanto no es válida.
  - Se retornará la variable foundElem.

5. Fn que valida si el elemento que le estoy pasando en la ruta es un directorio o un archivo "getPathMdFile", retorna un arr con las rutas de los archivos md que se encuentre.
  - Recibe como parámetro la ruta del elemento y el arrMdFilesPath vacío.
  - Aplico el método de ```PATH.extnamen(elemPath)``` para verificar las extensiones de los elementos que analiza la fn.
  - Luego creo una condicional, donde evalúo si la extensión del elemento es igual a un string vacío y si no empieza por punto (.), si es así entonces es un directorio.
  - En caso de que sea un directorio utilizo nuevamente el método de ```fS.readdirSync(elemPath)``` para leer su contenido y que devuleva en un arr los elementos que contenga.
  - luego evalúo en otra condicional la longitud de ese arr para verificar si contiene elementos.
  - En caso de que sí contenga elementos recorro cada uno de ellos con el forEach para obtener las rutas de archivos md que encuentre de cada elemento.
  - Almaceno en una constante la concatenación de la ruta absoluta del elemento analizado con el nombre del elemento que contiene.
  - Y vuelvo a llamar a mi fn ```getPathMdFile()``` (recursividad), pasándole como parámetro la constante donde almacené la ruta absoluta del elemento encontrado y el arrMdFilesPath para que vuelva a analizar su contenido. Y en caso de que vaya encontrando archivos md los vaya añadiendo en el arrMdFilesPath.
  - En caso de que no sea un directorio, evalúo en una condicional si la extensión del archivo es .md.
  - Si encuentra archivos con extensión .md los va a añadir en el arrMdFilesPath.
  - La fn retorna el arrMdFilesPath que contendrá las rutas absolutas de esos archivos.

6. Fn para buscar links en archivos md "findLinks", retorna un arr de objetos.
  - Recibe como parámetro la ruta del elemento y el arrMdFilesPath vacío.
  - Creo el arrLinks vacío.
  - Valido con una condicional si es que el arrMdFilesPath contiene elementos.
  - Si tiene contenido, recorro cada elemento del arr de ruta de archivos md.
  - En cada elemento recorrido almaceno en una constante el contenido del elemento leyendolo con el método de FS ```readFileSync(mdFile, {encoding: 'utf8'})```.
  - Almaceno en otra constante la expresión regular para encontrar los patrones de cómo se escriben links en archivos md, la letra 'g' indica que la búsqueda es global, encuentra todos los resultados en vez de parar después de la primera búsqueda exitosa.
  - Al arr links le añado con el método de arr ```push()``` un objeto con las keys:
    * path: para alamcenar la ruta del archivo md. Y
    * links: para almacenar los links encontrados en ese archivo usando el método ```match()``` para obtener todas las ocurrencias de mi expresión regular dentro del contenido del archivo md que es un string.
  - La fn retorna en el arrLinks un arr de objetos con las propiedades path y links, aplicándole el método de arr flat para que se cree un nuevo arr único de objetos.

7. Fn MDLINKS
  - Recibe como parámetro la ruta del elemento y la variable options que es un objeto con valor Booleano, ésto por defecto será False, retorna una promesa.
  - Creo una nueva promesa con los parámetros resolve y reject.
  - Almaceno en la constante absPath la llamada al método de mi obj flowmd ```convertRelativeToAbsolutePath()```.
  - Valido con una condicional si la ruta absoluta es válida con el método ```isValidPath()```.
  - Si la ruta no es válida, llamo a la función ```reject(new Error())``` para mostrar el mensaje de ruta inválida.
  - Si es válida almaceno en arrMdFilePath la llamada al método ```getPathMdFile()``` para obtener el arr con la ruta de archivos .md encontrados.
  - Valido con una condicional si el arr de rutas de archivos md tiene elementos.
  - Si no tiene elementos, llamo a la fn ```reject(new Error())``` para mostrar el mensaje de que no se encontraron archivos .md
  - Si tiene elementos, alamceno en arrLinksFound la llamada al método ```findLinks()```.
  - Creo el arrMdFileLinks vacío.
  - Valido con una condicional si el arrLinksFound contiene elementos.
  - Si contiene elementos, recorro cada uno de ellos buscando la propiedad links. (paso 6)
  - Valido en una condicional si existe la propiedad links.
  - Si la contiene, recorro cada elemento de links para separar en nuevas cadenas el texto del link y el enlace.
  - Almaceno el una constante el contenido de la propiedad link aplicándole el método ```split('](')``` para crear un arr con dos cadenas una con el texto y otra con el link.
  - Al arrMdFileLinks que estaba vacío le aplico el método ```push()``` para añadirle un objeto con las propiedades URL o href, text y RUTA o file.
    * Al valor de href le asigno el índice 1 de str que es la URL, aplicándole el método ```slice(0, -1)``` para cortar el paréntesis del final del enlace.
    * Al valor de text le asigno el índice 0 de str que es el TEXTO del enlace, aplicándole el método ```slice(1, 50)``` para cortarle el corchete de inicio y que esté truncado a 50 caracteres.
    * Le añado la clave file y le asigno la ruta del link donde se encontró el archivo que contenía el enlace accediendo a la propiedad ```path``` del linkFound.
  - Valido con una condicional si el arr de links en archivos .md tiene elementos.
  - Si no tiene elementos, llamo a la fn ```reject(new Error)``` para mostrar el mensaje de que no se encontraron links.
  - Si contiene elementos, valido en otra condicional si validate es true.
  - Si no es true, llamo a la fn ```resolve()``` para que solo me retorne el arr de links en archivos .md "arrMdFileLinks".
  - Si validate es true, creo el arrLinkStatus vacío.
  - Recorro cada elemento del arr de links en archivos .md.
  - Y en cada elemento recorrido al arrLinkStatus le aplico el método ```push()```.
    * Dentro del método push aplico el método get de axios# para hacer la petición al http accediendo a la propiedad href del objeto del elemento del arr actual, que sería la url que se va a evaluar.
    * Aplico el método then, y dentro la fn anónima con parámetro data que representa todo el objeto que me trae la consulta a la URL con axios.
    * En el then retorno un objeto con el operador ... para anidarle al elem del arr mdFileLinks las claves status y msg.
    * Al valor de status le asigno la propiedad status del objeto data (objeto que trae la data de la petición al http).
    * Al valor de msg le asigno el string 'OK', porque la solicitud respondió correctamente con un código de estatus entre 200 y 300.
    * Aplico el método catch, y dentro la fn anónima con parámetro err, que representa la respuesta fallida de la solicitud http.
    * En el catch retorno un objeto con el operador ... para anidarle al elem del arr mdFileLinks las claves status y msg.
    * Al valor de status le asigno la propiedad response de status del objeto err (objeto que trae la respuesta de la petición al http).
    * Al valor de msg le asigno el string 'FAIL', porque la solicitud no respondió correctamente con un código de estatus entre 400 y 500.

    #NOTA: AXIOS regresa una promesa y garantiza el funcionamiento en cualquier navegador,detecta en qué navegador está trabajando y se adapta al XMLHttpRequest o fetch. Es de grna utilidad en proyectos grandes porque garantiza que siempre va a retornar una promesa sea lo que sea donde estemos trabajando.
