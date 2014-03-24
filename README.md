# Examen Final Diseño y Desarrollo de aplicaciones Web.

### Día 03/03/2014		Tiempo: 4 horas


* Nota: Cada pregunta se valorará como bien o como mal (valoraciones intermedias serán excepcionales).
* Nota2: En cada pregunta se especifica si se valora en el examen de diseño, en el de desarrollo o en los dos. Cuando una pregunta pertenezca a ambos exámenes, en el de diseño se valorará el estilo y el comportamiento estático y en el de desarrollo el comportamiento dinámico.
* Nota3: Para aprobar cada examen hay que obtener una puntuación mínima de 5 puntos en ese examen.
* Nota4: Organice su tiempo. Si no consigue resolver un apartado pase al siguiente. El examen consta de dos ejercicios que se pueden resolver de forma independiente. Los apartados de diseño y de desarrollo también se pueden resolver por separado. Si un apartado depende de otro que no sabe resolver, siempre puede dar una solución que aunque no sea correcta, le permita seguir avanzando.
* Nota5: Lea completamente el examen antes de empezar.


Pasos previos antes de empezar
------------------------------

* Configure su usuario de Git (es único para todos)

```bash
	git config --global user.name "user-daw-zayas"
	git config --global user.email "javier.perezarteaga@educa.madrid.org"
```

* Clone el repositorio del enunciado

```bash
	git clone https://user-daw-zayas@bitbucket.org/surtich/todo-listF-daw2.git
```

* Vaya al directorio del repositorio

```bash
	cd todo-listF-daw2
```

* Cree un *branch* con su nombre y apellidos separados con guiones (no incluya mayúsculas, acentos o caractéres no alfabéticos, excepción hecha de los guiones). Ejemplo:

```bash
	git checkout -b fulanito-perez-gomez
```

* Compruebe que está en la rama correcta:

```bash
	git status
```

* Suba la rama al repositorio remoto:

```bash
	git push origin nombre-de-la-rama-dado-anteriormente
```

* Instale las dependencias:

```bash
	npm install
```

* Arranque MongoDB:

```bash
	su -c mongod
```

* Ejecute su proyecto:

```bash
	npm start // http://localhost:8080
```

* **Sólo para los que hagan el ejercicio de diseño**. Clone el repositorio de Bootswatch e instale sus dependencias

```bash
	cd
	git clone https://github.com/thomaspark/bootswatch.git
	cd bootswatch
	npm install
```

* Dígale al profesor que ya ha terminado para que compruebe que todo es correcto y desconecte la red.


## Introducción

El examen consite en completar el ejercicio de los *tags* corrigiendo algún error e incorporando pequeñas mejoras. El resultado final perseguido es el que se muestra en la imagen.

![introduccion](https://bitbucket.org/surtich/todo-list-daw2-solucion/downloads/Fintro.png)

* 1.- Corregir errores en la edición de *tags*:

* 1.1.- (1 punto, desarrollo) Un mismo *todo* no puede tener 2 *tags* iguales. Esta comprobación se hará en el cliente antes de llamar al servicio correspondiente (en el servidor no se hace ninguna comprobación). Al pulsar *intro*, si algún *tag* está duplicado, no sé finalizará la edición (la caja de texto seguirá estando visible). Sin embargo, al perder el foco, si hay algún *tag* duplicado, se cancelarán los cambios.

* 1.2.- (1 punto, desarrollo) Al comprobar si un *tag* está duplicado, no se distinguirá mayúsculas de minúsculas. Por ejemplo *JavaScript*, *javascript* y *JAVASCRIPT* son el mismo *tag*. Sin embargo en la base de datos se almacenará el *tag* con la capitalización que se hubiera introducido. Por ejemplo, si se escribe *JavaScript*, no sirve almacenar *JAVASCRIPT* ni *javascript*.

* 1.3.- (1 punto, desarrollo) No se permiten *tags* vacíos. Los siguientes son ejemplos de *tags* incorrectos:

```javascript
	tags = "JavaScript,";
	tags = "JavaScript,  ";
	tags = "JavaScript,,HTML5";
	tags = "JavaScript,   ,HTML5";
	tags = ",JavaScript";
	tags = "   ,JavaScript";
```

* 1.4.- (1 punto, desarrollo) A la hora de comprobar la duplicidad de un *tag* y a la hora de almacenarlo en el servidor, se eliminarán los espacios en blanco antes y después del *tag* pero se mantendrán los intermedios. Por ejemplo:

```javascript
	tags = "JavaScript,  JAVASCRIPT"; // Bad. Duplicate tag.
	tags = "     JavaScript    , JAVA SCRIPT "; // Good. Two tags [JavaScript,JAVA SCRIPT]
```

* 2.- Mejorar el *tagcloud*

* 2.1.- (1 punto, diseño) Ya no es necesario mostrar el número apariciones de cada *tag*; elimínelo.

* 2.2.- (1 punto, diseño) Observe que ahora el *sidebar* de *tags* se muestra más abajo, liberando espacio para el panel de introducción de *tags*

![sidebar](https://bitbucket.org/surtich/todo-list-daw2-solucion/downloads/F2.2.png)

* 2.3.- (1 punto diseño, 2 puntos desarrollo) Los *tags* con mayor número de apariciones se mostrarán de mayor tamaño que los *tags* con menor número de apariciones. El tamaño para el/los *tag/s* con menor número de paraciones será de *0.75em* y el/los de mayor número de apariciones de *2.0em*. El resto de *tags* se mostrarán con un tamaño proporcional entre estos dos valores. Por ejemplo:

![sidebar](https://bitbucket.org/surtich/todo-list-daw2-solucion/downloads/F2.3.png)

Suponga que los *tags* y sus repeticiones son las siguientes:

* x (6 veces)
* y (4 veces)
* z (2 veces)

Los tamaños serán:

* x 2.0em (por ser el que más se repite)
* z 0.75em (por ser el que menos se repite)
* y 1.375em (ya que 4 está justo en medio de 2 y 6)

Si hubera otro tag "a" con 3 repeticiones, ¿Cúal sería su tamaño?

* 2.4.- (1 punto diseño, 2 puntos desarrollo) Los *tags* con mayor número de apariciones se mostrarán de diferente color que los *tags* menos frecuentes. Concretamente, los *tags* con más repeticiones se mostrarán con tonalidades amarillas, los *tags* con menos repeticiones con tonalidades rojas; se reservarán tonalidades verdosas y azuladas para los *tags* con un número de repeticiones intermedia.

* 2.5.- (2 puntos, desarrollo) Los *tags* se mostrarán ordenados de mayor a menor número de repeticiones.

* 3.- Trabajo con LESS

* 3.1.- (1 punto diseño) Aplique el estilo *lumen* de Bootswatch.

![less](https://bitbucket.org/surtich/todo-list-daw2-solucion/downloads/F3.1.png)

* 3.2.- (2 puntos diseño) Cambie el valor de la variable *@body-bg* a *#aaa* del estilo *lumen*; compile los ficheros y vuelva a aplicar el estilo.

* 4.- Reponsive Web Design.

Cuando la pantalla sea estrecha (menor de 400px) se ocultará todo lo que tenga que ver con los *tags*.

![media](https://bitbucket.org/surtich/todo-list-daw2-solucion/downloads/F4.png)

* 4.1.- (1 punto diseño) Oculte el *sidebar* que contiene los *tags*.
* 4.2.- (1 punto diseño) Oculte los tags de cada *todo*.
* 4.3.- (1 punto diseño) Aumente el tamaño base de la fuente.

Para entregar
-------------

* Ejecute el siguiente comando para comprobar que está en la rama correcta y ver los ficheros que ha cambiado:

```bash
	git status
```

* Prepare los cambios para que se añadan al repositorio local:

```bash
	git add *
	git commit -m "completed exam" -a
```

* Compruebe que no tiene más cambios que incluir:

```bash
	git status
```

* Dígale al profesor que va a entregar el examen.

* Conecte la red y ejecute el siguiente comando:

```bash
	git push origin nombre-de-la-rama
```

* Abandone el aula en silencio.
