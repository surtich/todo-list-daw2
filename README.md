Enunciado del examen de la primera evaluación
=============================================


Pasos previos antes de empezar
------------------------------


* Configure su usuario de Git (es único para todos)

```bash
	git config --global user.name "user-daw-zayas"
	git config --global user.email "javier.perezarteaga@educa.madrid.org"
```

* Clone el repositorio del enunciado

```bash
	git clone https://user-daw-zayas@bitbucket.org/surtich/todo-list-daw2.git
```

* Vaya al directorio del repositorio

```bash
	cd todo-list-daw2
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



Ejercicios
----------

Ahora ya puede empezar el examen. Sólo unas notas previas:

i) El objetivo de este ejercicio es conseguir que funcione lo que se le pide. La calidad del código y la forma de la implementación, salvo en los apartados que expresamente lo indiquen, es menos importante.

ii) La valoración será correcta o incorrecta, no considerándose puntuaciones intermedias.

iii) Cada pregunta figura asignada a una asignatura: diseño o desarrollo.

iv) Para aprobar, hay que obtener cinco puntos; siendo la nota de un examen independiente de la del otro.

v) Lea completamente el ejercicio antes de comenzar. Comience por lo que se sienta más seguro.

vi) Si no entiende algo, pregúntelo.

vii) Implemente exáctamente lo que se le pide. Implementar más o hacer ora cosa diferente, no le va reportar puntos adicionales.

viii) Controle el tiempo. Si algo no le funciona, déjelo e intente otro apartado.


##¡¡¡Suerte!!!


## Examen de desarrollo:

### 1) (0,5 puntos desarrollo) Cuando se inserte un TODO, se cambiará el color de fondo a azul, tal y como se muestra en la imagen:

![apartado1](https://bitbucket.org/surtich/todo-list-daw2/downloads/apartado1.png "El fondo cambia a azul al añadir una imagen")

### 2) (0,5 puntos desarrollo) Cuando un TODO se marque como realizado, se cambiará el color de fondo a verde:

![apartado2](https://bitbucket.org/surtich/todo-list-daw2/downloads/apartado2.png "Los TODOs completados serán verdes.")

### 3) (0,5 puntos desarrollo) Cuando un TODO realizado, se marque como no realizado, se volverá a poner de color azul:

![apartado3](https://bitbucket.org/surtich/todo-list-daw2/downloads/apartado3.png "Los TODOs completados serán verdes; los no realizados, azules.")

### 4) (1,0 puntos desarrollo) Cuando un TODO comience por *@@important@@*, se pondrá el fondo de color rojo:

![apartado4](https://bitbucket.org/surtich/todo-list-daw2/downloads/apartado4.png "Los TODOs importantes serán rojos.")

### 5) (0,5 puntos desarrollo) Los caractéres *@@important@@* no se mostrarán cuando el TODO se guarde:

Nota: Puede ser una buena idea leer el apartado 8 para hacerlo de la forma que allí se indica y así conseguir también los puntos de ese apartado.

![apartado5](https://bitbucket.org/surtich/todo-list-daw2/downloads/apartado5.png "*@@important@@* No se verá")

### 6) (1,0 puntos desarrollo) Pero sí se verán cuando esté editando el TODO:

Nota: Este apartado no puntuará si no se ha resuelto correctamente el apartado 5.

![apartado6](https://bitbucket.org/surtich/todo-list-daw2/downloads/apartado6.png "*@@important@@* se verá durante la edición")

### 7) (0,5 puntos desarrollo) Cuando un TODO importante se marque como realizado, se podrá de fondo verde:

![apartado7](https://bitbucket.org/surtich/todo-list-daw2/downloads/apartado7.png "Los TODOS realizados siempre serán verdes")

### 8) (1,5 puntos desarrollo) En el futuro, se quiere tener la capacidad de añadir otros tipos de TODO, con otros colores de fondo.

Está previsto que pueden ser varias decenas. Para permitir que esto se pueda hacer sin tener que modificar el código cada vez que se añada un tipo de TODO, lo que se hará será lo siguiente:

> El tipo de todo se indicará con *@@tipo@@*. Para asociarle el estilo, se creara un estilo para el atributo de clase *.tipo* y, desde JavaScript, se asignará el atributo *className* al tipo definido.

Por ejemplo:

```css
/*In base.css*/
...

.important {
	color: #b94a48;
	background-color: #f2dede;
	border-color: #ebccd1;
}

.warning {
	color: #c09853;
	background-color: #fcf8e3;
	border-color: #faebcc;
}
```

![apartado8](https://bitbucket.org/surtich/todo-list-daw2/downloads/apartado8.png "Habrá un código de color para cada uno de los tipos de TODO que se vayan creando")

### 9) (1,0 puntos desarrollo) Cuando un TODO se marque como realizado, pasará al último lugar de la lista.

### 10) (0,5 puntos desarrollo) Cuando se modifique la lista de TODOS, se mostrará por consola la acción realizada: añadido, borrado, cambiado estado, modificado, borrados todos, borrados completados o marcados todos como completados.

![apartado10](https://bitbucket.org/surtich/todo-list-daw2/downloads/apartado10.png "Se mostrará un log de actividad de la aplicación").

### 11) (1,0 puntos desarrollo) Además de por consola, la actividad de la aplicación también se mostrará en la página Web.

Nota: Aunque la imagen muestre estilos y colores, no se preocupe por ello y déjelo sin estilos.

![apartado11](https://bitbucket.org/surtich/todo-list-daw2/downloads/apartado11.png "El log de actividad se mostrará también en la Web").

### 12) (1,0 puntos desarrollo) Los mensajes mostrados, desaparecerán después de estar tres segundos en pantalla.

### 13) (0,5 puntos desarrollo) En clase se detectó que se podían dejar los Todos con el texto en blanco. Otro error no corregido de la aplicación, es que se pueden dejar con el texto en blanco al modificarlos.
Corrija este problema: Al modificar un Todo, si el texto está vacío o sólo tiene espacios en blanco, se eliminará el Todo.
Nota: Este es el comportamiento previsto en TodoMVC.
Si al modificar, el texto contiene blancos al principio o al final, se eliminarán (como hacemos al insertar).

## Examen de diseño:

El diseño de la aplicación dista de ser responsivo. Se trata hacerlo responsivo; pero esto sería demasiado extenso por lo que debe centrarse únicamente en lo que se le pide.

Para todos los apartados: habrá dos diseños básicos; uno para dispositivos con pantallas grandes y otro para dispositivos con pantallas pequeñas.

![grandes](https://bitbucket.org/surtich/todo-list-daw2/downloads/grandes.png "Pantalla para dispositivos con pantalla grande").

![pequeños](https://bitbucket.org/surtich/todo-list-daw2/downloads/pequenos.png "Pantalla para dispositivos con pantalla pequeña").

Los siguientes son los cambios que deben suceder. Si no se especifica, se refieren a los dispositivos con pantalla pequeña (en la grande no deberían producirse cambios).

### 14) (2,0 puntos diseño) Para ambos tipos de dispositivos, la caja de texto para mostrar los TODOs debe ser fluida y crecer y contraerse según sea la pantalla ocupando aproximadamente el 90% pero sin pasar de 500px.

### 15) (1,0 puntos diseño) El tamaño de los textos de los TODOS debe ser más pequeño, para adaptarse a la pantalla.

### 16) (1,0 puntos diseño) El título grande que contiene el texto *todos*, debe desaparecer.

### 17) (2,0 puntos diseño) Los enlaces a los filtros de TODOs deben sustituirse por las imágenes que se le facilitan y aparecer en la parte superior.

### 18) (2,0 puntos diseño) Los enlaces con imágenes deben estar centrados y el espacio entre ellos estar equivalentemente distribuido para todo tipo de pantallas pequeñas.

### 19) (1,0 puntos diseño) Los textos *items left* y *clear completed* deben ser más grandes.

### 20) (1,0 puntos diseño) La desaparición de los textos del apartado 12 se hará de forma progresiva creando un efecto *fan-out*.


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
