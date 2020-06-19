## FLOWMD.JS
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

## INDEX.JS
1. Fn MDLINKS
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
  - Si contiene elementos, recorro cada uno de ellos buscando la propiedad links. [path y links].
  - Valido en una condicional si existe la propiedad links.
  - Si la contiene, recorro cada elemento de links para separar en nuevas cadenas el texto del link y el enlace.
  - Almaceno el una constante el contenido de la propiedad link aplicándole el método ```split('](')``` para crear un arr con dos cadenas una con el texto y otra con el link.
  - Al arrMdFileLinks que estaba vacío le aplico el método ```push()``` para añadirle un objeto con las propiedades URL o href, text y RUTA o file.
    * Al valor de href le asigno el índice 1 de str que es la URL, aplicándole el método ```slice(0, -1)``` para cortar el paréntesis del final del enlace.
    * Al valor de text le asigno el índice 0 de str que es el TEXTO del enlace, aplicándole el método ```slice(1, 50)``` para cortarle el corchete de inicio y que esté truncado a 50 caracteres.
    * Le añado la clave file y le asigno la ruta del link donde se encontró el archivo que contenía el enlace accediendo a la propiedad ```path``` del linkFound.
  - Valido con una condicional si el arr de links en archivos .md tiene elementos.
  - Si no tiene elementos, llamo a la fn ```reject(new Error)``` para mostrar el mensaje de que no se encontraron links.

2. Validate de la fn mdlinks.
  - Valido si arrMdFileLinks contiene elementos (arr deobj con propiedades {url,texto,ruta}) .
  - Si contiene elementos, valido en otra condicional si validate es true.
  - Si no es true, llamo a la fn ```resolve()``` para que solo me retorne el arr de links en archivos .md "arrMdFileLinks".
  - Si validate es true, creo el arrLinkStatus vacío.
  - Recorro cada elemento del arr de links en archivos .md (obj).
  - Y en cada elemento recorrido al arrLinkStatus le aplico el método ```push()```.
    * Dentro del método push aplico el método get de axios# para hacer la petición al http accediendo a la propiedad href del objeto del elemento del arr actual, que sería la url que se va a evaluar.
    * Axios retorna una promesa por lo tanto aplico el método then, y dentro la fn anónima con parámetro data que representa todo el objeto que me trae la consulta a la URL con axios.
    * En el then retorno un objeto con el operador de propagación ... mdfilelinks para anidarle al obj del arr mdFileLinks las claves status y msg.
    * Al valor de status le asigno la propiedad status del objeto data (objeto que trae la data de la petición al http).
    * Al valor de msg le asigno el string 'OK', porque la solicitud respondió correctamente con un código de estatus entre 200 y 300.
    * Para los casos de error aplico el método catch, y dentro la fn anónima con parámetro err, que representa la respuesta fallida de la solicitud http.
    * En el catch retorno un objeto con el operador de propagación ... mdfilelinks para anidarle al obj del arr mdFileLinks las claves status y msg.
    * Evalúo con un ternario si el obj err contiene la propiedad response, en ese caso Al valor de status le asigno la propiedad response de status del objeto err (objeto que trae la respuesta de la petición al http), en caso contrario le asigno un nro por defecto (999).
    * Al valor de msg le asigno el string 'FAIL', porque la solicitud respondió con un código de estatus entre 400 y 500.

    #NOTA: AXIOS regresa una promesa y garantiza el funcionamiento en cualquier navegador,detecta en qué navegador está trabajando y se adapta al XMLHttpRequest o fetch. Es de gran utilidad en proyectos grandes porque garantiza que siempre va a retornar una promesa sea lo que sea donde estemos trabajando.

## CLI
1. Lo primero es añadir la instrucción especial de shell en la parte superior de nuestro archivo js para decirle a los sistemas unix que el intérprete del archivo js busque el node ejecutable instalado localmente.

2. Luego para asignarle el nombre del comando con el que vamos a ejecutar el CLI, para el script de la línea de comandos local, le añadimos un nuevo campo "bin": {"mdlinks": ./cli.js} en el package.JSON.

3. Para vincular el comando para el desarrollo utilizamos el comando ```npm link```, que entre otras cosas, nos permite 'enlazar de manera simbólica una carpeta de paquete' localmente, y para nuestras necesidades, instalará localmente cualquier comando listado en el campo bin de nuestro package.json. En otras palabras, npm link es como un simulador de instalación del paquete NodeJS.

4. Desestructuro el array de process.argv que en la posición 0 tiene el ejecutable de node, y en la posición 1 tiene el CLI, y en la posición 2 en adelante los argumentos que recibirá el CLI, ignorando las primeras posiciones.

5. Creo mi función cli qu recibe los argumentos que el usuario le pase en la terminal (ruta, stats y/o validate).
  - Creo la constante ruta del elemento y las variables stats y validate con valor booleano por defecto false.
  - Creo la condicional para validar si el arr de argumetos contiene --stats y lo mismo para validar si contine --validate y cambiar las variables stats y validate a true respectivamente.
  - Creo la constante options que contiene el objeto validate.
  - Luego llamo a la función mdlinks recibiendo sus respectivos parámetros (ruta y options).
  - Consumo la promesa que creé con el método then, en su función anónima recibe como parámetro links.
  - Con una condicional valido si se recibió el argumento stats para mostrarle al usuario en la consola el TOTAL de links encontrados.
  - Para mostrar los links únicos en caso de que haya alguno repetido, creo el arr uniqueLinks vacío y con el bucle for recorro cada link y en cada recorrido añado al arr uniqueLinks la propiedad href convertida a string con el JSON.stringify para realizar la comparación de cada link, puesto que los objetos aunque sean exactamente iguales no se pueden comparar entre ellos.
  - Luego consoleo los links UNIQUES para mostrarlos al usuario, convierto el arr uniqueLinks con el ...New Set en un arr con elementos únicos y con la propiedad length muestro la cantidad.
  - Añado al condicional para la ejecución del stats junto con el validate.
  - Creo la constante brokenLinks para filtrar los links que en su propiedad msg su valor sea FAIL y luego consoleo la longitud de los links que cumplieron la condición.
  - En un else if añado la condicional para la opción del validate sola.
  - Alamceno en una constante la ruta del directorio de trabajo actual.
  - luego recorro cada link (obj del arr mdlinks) para cambiarles el formato de objeot a string con colores.
    * Para mostrar la ruta de forma más corta con el método replace reemplazo la ruta del directorio de trabajo actual por un punto.
    * Para darles los colores al status y el msg utilicé un ternario donde defino que si el status o el msg es exactamente igual a OK se muestren de color verde y si no que se muestren de color rojo.
  - En el else se hará el output por defecto en caso de que se reciba como argumento solo la ruta.
  - Nuevamente alamceno en una constante la ruta del directorio de trabajo actual.
  - Luego recorro cada elemento del arr mdlinks (objs), recorto la ruta con el método replace y le doy sus respectivos colores para mostrarlo en la consola.

Process.cwd() devuelve el directorio de trabajo actual, es decir, el directorio desde el que invocó el comando node.
__dirname devuelve el nombre de directorio del directorio que contiene el archivo de código fuente de JavaScript.

## MOCKS MANUALES DE AXIOS

1. En src creo una carpeta __mocks__ y dentro un archivo js con el nombre de la librería que voy a simular, en este caso axios.

2. En ese archivo exporto un objeto con la propiedad get que es la que estoy utilizando para hacer la petición al HTTP y como valor le asigno jest.fn para crear una función falsa o mockeada.

3. En mi archivo de tests importo la librería axios y mi archivo axios.js lo suplantará en los tests.

4. En la prueba llamo a la fn axios y a su propiedad get y para simular el mock utilizo el método mockImplementation() para sobreescribir la fn del archivo axios.js, pasándole como parámetro una función anónima con el Promise.resolve o .reject dependiendo de la prueba, y dentro el objeto su respectiva respuesta de la solicitud al HTTP.

5. Luego pruebo la fn mdlinks con la ruta y el vlaidate, en el método then recibo el parámetro links (arr de obj) y en expect defino la respuesta que debería dar el test.

# OBJETIVOS DE APRENDIZAJE

- [x] [Uso de callbacks](https://platzi.com/clases/1099-fundamentos-javascript-2017/6603-los-callbacks-de-javascript/)
    Se utilizan para manejar la asincronía en el lenguaje.
    JavaScript cuando ejecuta código lo hace de manera síncrona, pero una forma que tiene de ejecutar código asíncrono es con las funciones llamadas “Callbacks”.
    Éstas se ejecutan y nos devuelven el proceso, generalmente después de algún evento de tiempo, al completarse un request o al terminar de leer un archivo.

- [x] (Consumo de promesas)[https://platzi.com/clases/1099-fundamentos-javascript-2017/6605-promesas/]
    Para obtener el valor de la resolucion de la promesa se utiliza el método then que tiene como parametro una función que a su vez tendrá como parametro el valor que esperamos obtener.
    Si sucede algun error en la promesa y se rechaza utilizamos el metodo catch que tambien recibe como parámetro una función que va a tener como parámetro el error que arrojó la promesa.

- [x] [Creación de promesas](https://platzi.com/clases/1099-fundamentos-javascript-2017/6605-promesas/)
    Son objetos y están asociadas a las tareas asincronicas.
    Para crear las promesas se usa la clase Promise. El constructor de Promise recibe un sólo argumento, un callback con dos parámetros, resolve y reject. resolve es la función a ejecutar cuando se resuelve y reject cuando se rechaza.
    Al crear una promesa va a estar en estado pendiente.
    las promesas tienen 3 estados:
      * Pending: Pendiente.
      * Rejected: Rechazada.
      * Fullfiled: Completada exitosamente.
      * Setted: completa, rechazada.

- [x] [Módulos de JS](https://developer.mozilla.org/es/docs/JavaScript_code_modules/Using#:~:text=Un%20m%C3%B3dulo%20de%20c%C3%B3digo%20JavaScript,XPCOM%20de%20JavaScript%2C%20usando%20Components.)
    Los módulos de código JavaScript son un concepto de código introducido en firefox 3. Y pueden ser usados para compartir código entre scopes. El módulo es cargado dentro de un scope de js específico usando components.utils.import.
     * [Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export): Esta declaración se utiliza para exportar funciones, obj, o tipos de datos primitivos para que puedan ser usados por otros programas con la sentencia import.
     Existen dos tipos de exportación, nombrada y por defecto. Se pueden tener varias exportaciones nombradas por módulo pero solo una exportación por defecto.
     * [Import](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import): Esta sentencia se utiliza para importar fn que han sido exportadas desde un módulo externo.

- [x] [Recursión](https://platzi.com/clases/1099-fundamentos-javascript-2017/6607-funciones-recursivas/): Una función que se llama o se ejecuta a sí misma (secuencia de fibonacci) hasta que sucede una condición base.
     *[ Memoización](https://platzi.com/clases/1099-fundamentos-javascript-2017/6608-memoizacion/): Es una técnica de optimización utilizada principalmente para acelerar los programas informáticos almacenando los resultados de llamadas fn costosas y devolviendo el resultado almacenado en cahé cuando vuelven a ocurrir las mismas entradas.
      Guardar termporalmente valores que ya han sido calculados anteriormente.

- [x] [Sistema de archivos](https://platzi.com/clases/1759-fundamentos-node/25198-file-system/): El módulo de file system permite acceder a archivos de nuestro sistema leerlos, escribirlos, modificarlos, cambiarles el nombre entre otras cosas.

- [x] [Package.JSON](https://platzi.com/clases/1763-npm/25051-iniciar-un-proyecto/): Es el archivo de configuración de un proyecto de node. Donde tenemos una configuración establecida, una descripción del proyecto, y ciertos valores necesarios. Lo creamos haciendo npm init -y para que se llene de forma automática con las configuraciones esenciales o npm init para ir llenando manualmente esas configuraciones.

- [x] Instalar y usar modules: npm install.

- [x] [npm Scripts](https://docs.npmjs.com/misc/scripts): npm admite la propiedad "scripts" del archivo package.JSON para varios scripts. Hasta ahora he utilizado npm test, npm start.

- [x] [CLI](https://es.wikipedia.org/wiki/Interfaz_de_l%C3%ADnea_de_comandos) (interfáz de línea de comandos): Es un método que permite a los usuarios dar instrucciopnes a algún programa informático por medio de una línea de texto simple. Es un programa que recibe nuestras órdenes de forma relativamente cómoda y las traduce a un lenguaje que la computadora pueda entender y en conjunto con el sistema operativo ejecuta esas instrucciones y muestra el resultado, todo esto sucede en un entorno que se conoce como interfáz de texto.
  Los comandos consisten en el nombre del programa espacio, los parámetros, espacio los modificadores. Los modificadores alteran lo que el programa va a hacer, los parámetros son información adicional para la ejecución del programa.
  comando -flag1 -flag2 arg1 arg2 El guión medio para indicar los flags o modificadores.

- [x] [Testing](https://platzi.com/clases/1357-js-jest-2019/13813-que-son-las-pruebas-unitarias/):
  * Pruebas unitarias:  Las pruebas unitarias lo que hacen es tomar todos tus proyectos o esos bloques de código y descomponerlo en pequeñas partes que vamos a probar. Así, todo lo que vamos pasando sabemos que esta funcionando correctamente y que no hay ningún inconveniente o bug.

Las pruebas unitarias comprueban lo que son casos estándares (suposición explícita) es decir, no son perfectas. Las características de las pruebas unitarias son:

Automatizable: Deben correr sin ningún proceso manual.
Total Cobertura: Debemos de pasar por cada bloque escrito.
Reutilizables: Podemos usarlas para probar otros bloques.
Independientes: No pueden depender de otra prueba para funcionar.
Rápidas de crear: TIenen que ser algo conciso que prueben algo muy particular.
Ventajas de las pruebas unitarias:

Proporciona un trabajo ágil.
Calidad del código.
Detectar errores rapido.
Facilita los cambios y favorece la integración.
Proporciona información.
Reduce el coste.

- [x] [Testeo asíncrono](https://doc.ebichu.cc/jest/docs/es-ES/asynchronous.html): Si tenemos código que se ejecuta de forma asincrónica, Jest debe saber cuando ha terminado el código que se está probando, antes de que puede pasar a otro test.

- [ ] [Librerías de mock](https://folderit.net/es/blog/frameworks-de-mock-de-objetos-para-pruebas-unitarias-es/): Son herramientas que permiten simular una funcionalidad o sobrescribir un comportamiento existente cuando utilizámos métodos que interactúan con componentes de terceros o que requieren de la existencia de cierta información que no se dispone en la prueba.

- [ ] [Mocks manuales](https://jestjs.io/docs/es-ES/manual-mocks): Las simulaciones mock manuales son usadas para sustituir funcionalidad con datos falsos. Por ejemplo, en lugar de acceder a un recurso remoto como un sitio web o una base de datos, puede que se desee crear una simulación manual que permita usar datos falsos. Esto asegura que las pruebas serán rápidas y estables. Las simulaciones mock manuales se definen escribiendo un modulo en el subdirectorio __mocks__ el cual se debe encontrar adyacente al módulo.




     los branchs en los tests son las ramificaciones del código, por ejemplo los ifs.