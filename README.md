# Pagina

Portafolio personal de **José Reyes** ([@Tatoman12](https://github.com/Tatoman12)).

Sitio estático sin dependencias: HTML, CSS y JavaScript vanilla. Listo para servirse
desde GitHub Pages.

## Estructura

```
index.html          Página principal
favicon.svg         Icono del sitio
assets/css/styles.css
assets/js/main.js
```

## Verlo en local

Abre `index.html` en el navegador, o levanta un servidor sencillo:

```bash
python -m http.server 8000
```

Y visita <http://localhost:8000>.

## Publicarlo con GitHub Pages

El sitio se sirve desde la rama `main`, carpeta raíz:

1. En el repositorio, ve a **Settings → Pages**.
2. En *Build and deployment*, selecciona **Deploy from a branch**.
3. Elige la rama `main` y la carpeta `/ (root)`.
4. Guarda y espera un par de minutos.

La URL será <https://tatoman12.github.io/Pagina/>.

## Personalizar

- **Contenido**: todo el texto está en `index.html`.
- **Colores y tipografía**: variables CSS al inicio de `assets/css/styles.css`.
- **Proyectos**: cada tarjeta es un `<article class="card">` dentro de `#proyectos`.
- **Foto**: la imagen de perfil se carga desde GitHub; cámbiala en el `<img class="avatar">`.
