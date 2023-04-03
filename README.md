Podcaster es una aplicación para escuchar podcasts musicales.

Consiste en 3 vistas principales:

- Principal o Home Page, donde se puede ver un listado de los 100 podcasts mas populares en ITunes.
- Detalles de un podcast, donde se puede ver el nombre, autor y descripción de un podcast, así como también se pueden ver la lista de los últimos 20 episodios del mismo.
- Detalles del capitulo de un episodio, donde se puede ver una breve descripción del episodio selecionado en la vista anterior y reproducirlo.

La arquitectura de la aplicación esta basada en un patrón de capas donde se descomponen los grupos en subtareas para el cual se utilizó Easy Peasy (Una abstracción de Redux. Mas info https://easy-peasy.vercel.app/).
El modelo de la aplicación consiste en dos capaz:

- La primera donde se obtiene el listado de los 100 podcasts mas populares, y se los guarda en el estado global de la aplicación, donde también se almacena los datos de la última vez que se realizó el fetch de los datos para poder hacer un request luego de que ha pasado un día completo.
- La segunda es la cual donde se almacenan los detalles de un podcast en una lista a medida que el usuario va navegando por los diferentes podcasts, en la cual se almacena la última vez que se ha realizado el fetch de los detalles de un podcast, para poder hacer el request luego de 24hs.

La librería de componentes se puede encontrar en /src/components

- Navbar - Se encarga de mostarle al cliente cuando los datos estan cargando y también de poder navegar de nuevo hacia la página principal
- Filter - Encargado de filtrar los podcast de la página principal
- PodcastCard - Componente para representar cada elemento de el listado de podcasts en la página principal
- PodcastDetails - Utilizado en los detalles de un podcast y un episodio, para mostrar Nombre, Autor y Descripción de un podcast, también encargado de navegar desde los detalles de un episodio hacia la vista anterior para poder volver a los detalles de un podcast



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
