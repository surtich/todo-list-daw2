# Examen 2ª evaluación Diseño y Desarrollo de aplicaciones Web.

### Día 21/02/2014		Tiempo: 4 horas


* Nota: Cada pregunta se valorará como bien o como mal (valoraciones intermedias serán excepcionales).
* Nota2: Cada pregunta está asignada a un examen (diseño o desarrollo).
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
	git clone https://user-daw-zayas@bitbucket.org/surtich/todo-list2-daw2.git
```

* Vaya al directorio del repositorio

```bash
	cd todo-list2-daw2
```

* Cree un *branch* con su nombre y apellidos separados con guiones (no incluya mayúsculas, acentos o caractéres no alfabéticos, excepción hecha de los guiones). Ejemplo:

```bash
	git checkout -b javier-perez-arteaga
```

* Compruebe que está en la rama correcta:

```bash
	git status
```

* Suba la rama al repositorio remoto:

```bash
	git push origin nombre-de-la-rama-dado-anteriormente
```

* Dígale al profesor que ya ha terminado para que compruebe que todo es correcto y desconecte la red.


## Introducción

Actualmente, los *todos* se pueden filtrar por su estado (activos o completados). Se pretende añadir un nuevo criterio de filtrado por palabras clave (en adelante *tags*). Cada *todo* puede o no tener asociados uno o varios *tags* para localizarlos más fácilmente.

* 1.- Añadir o borrar *tags*.

* 1.1.- (1 punto, diseño) Cada *todo* tiene una descripción, un estado y una sección para añadir *tags* que por defecto mostrará **NO TAGS**. Implemente esto último de acuerdo a la imagen.

![ejercicio1.1](https://bitbucket.org/surtich/todo-list2-daw2/downloads/1.1.png)

* 1.2.- (1 punto, diseño) Al hacer *doble click* sobre la descripción del *todo* se **se activará únicamente la edición de la descripción** del *todo*. Observe que actualmente la edición se activa al hacer *doble click* sobre cualquier parte del *todo* (estado y borrar incluidos). Modifique este comportamiento. Ver imagen.

Nota:  El *checkbox* y el botón de borrar se ocultarán pero los *tags* del *todo* se mostrarán.

![ejercicio1.2](https://bitbucket.org/surtich/todo-list2-daw2/downloads/1.2.png)

* 1.3.- (1 punto, diseño) Al hacer *doble click* sobre los *tags* del *todo* se **se activará unicamente la edición de los tags** del *todo*. Ver imagen.

Nota:  El *checkbox* y el botón de borrar se ocultarán pero la descripción del *todo* se mostrará.

![ejercicio1.3](https://bitbucket.org/surtich/todo-list2-daw2/downloads/1.3.png)

* 1.4.- (1 punto, diseño) Estando en modo edición de la descripción del *todo*, si se pulsa *intro*, *esc* o se pierde el foco de la caja de texto, se pasará a modo *no edición*.

* 1.5.- (1 punto, diseño) Estando en modo edición de los *tags* del *todo*, si se pulsa *intro*, *esc* o se pierde el foco de la caja de texto, se pasará a modo *no edición*.

* 1.6.- (1 punto, desarrollo) Cuando se salga del modo edición (de la descripción o de los *tags*), se llamará al servicio *modTodo*, para que los cambios se almacenen en la base de datos. Observe que en *Postman* se ha modificado este servicio para que reciba un nuevo parámetro *tags* que contendrá la información contenida en este campo. El campo *tags* es de tipo *string* y contendrá las palabras clave asociadas separadas por comas.
Nota: Se modifique el texto o los *tags*, el servicio *modTodo* actualizarán ambos.
Nota2: El comportamiento de la tecla *Esc* debe ser el mismo: Cancelará la edición, restaurando los valores previos de ambos campos.

* 1.7.- (1 punto, desarrollo) Al añadir un *todo*, su campo *tags* estará vacío y se mostrará *NO TAGS*. Lo mismo pasará cuando se cargue un *todo* que no tenga campo *tags*.

* 1.8.- (1 punto, desarrollo) Al editar un *todo*, si el campo de *tags* se deja vacío, se borrarán los *tags* de ese *todo*. En el servidor, el servicio *modTodo* borrará el campo *tags* en la base de datos si no se le pasa este campo; es decir, si sólo se le pasa el texto (ver en Postman *modTodo-deleting tags*).

## 2.- Filtrar por un *tag*.

![ejercicio2](https://bitbucket.org/surtich/todo-list2-daw2/downloads/2.png)

* 2.1.- (1 punto, diseño) A la derecha, se creará un espacio para contener un *sidebar* con los *tags*.

* 2.2.- (1 punto, diseño) El estilo de este *sidebar* será el que se muestra en la imagen y tendrá como título *Tags*.

* 2.3.- (2 puntos, desarrollo) Cuando se inicie la aplicación, el *sidebar tags* contendrá el nombre de cada *tag*.
Nota: Si varios *todos* tienen el mismo *tag*, éste sólo se mostrará una vez en el *sidebar*.

* 2.4.- (1 punto, desarrollo) Al lado del nombre de cada *tag* aparecerá un número que indicará cuántos *todos* tienen ese *tag*.

* 2.5.- Cuando se realicen cambios en los *todos*, se actualizará el sidebar *tags* para que, en todo momento, la información esté actualizada. Esta actualización se realizará sin recargar la página. Las acciones que requieren actualización son las siguientes:

* 2.5.1.- (1 punto, desarrollo) Cuando se editen los *tags* de un *todo*.
* 2.5.2.- (1 punto, desarrollo) Cuando se borre un *todo* o cuando se borren los *todos* completados.

* 2.6.- (1 punto, diseño) El estilo de los *tags* será el que se muestra en la imagen (fíjese, en cómo se muestra el número de *todos* de cada *tag* y su texto).
Nota: Hay un componente de Bootstrap que le puede ayudar a hacer esto.

* 2.7.- (1 punto, diseño) Al situar el puntero del ratón sobre un *tag*, su estilo cambiará al que se muestra en la imagen.
Nota: Hay un componente de Bootstrap que le puede ayudar a hacer esto.

![ejercicio2.7](https://bitbucket.org/surtich/todo-list2-daw2/downloads/2.7.png)

* 2.8.- (1 punto, diseño) Al pulsar sobre un *tag* cualquiera *x*, se navegará a **#;filter=tag:x**

* 2.9.- (2 puntos, desarrollo) Al pulsar sobre un *tag*, sólo se mostrarán los *todos* que contengan ese *tag*. Para volver a visualizar todos los *todos*, hay que navegar a *#;filter=all*.
Ayuda: El estado visible o no de un *todo* se establece con la propiedad visible que se asigna en el método *getTodo* del *resource* *todo*.

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
	git push
```

* Abandone el aula en silencio.
