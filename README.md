# Plantilla NoExpertise · Carpintería metálica y cristalería

Web de taller para aluminio, PVC, cristal y forja: trabajos hechos, zonas y medición sin compromiso.

- Para: talleres de carpintería de aluminio y PVC, cristalerías, cerrajería y forja (ventanas, cerramientos, mamparas, persianas, vidrios, barandillas, puertas de garaje, rejas y estructuras ligeras).
- Sectores: carpinteria-metalica, cristaleria, cerrajeria, aluminio-pvc. Estilo: `werkstatt` (tema Werkstatt de Hallmark). Plan mínimo: gratis.
- Secciones: hero, talleres, servicios, trabajos, proceso, cifras, zonas, opiniones, presupuesto, preguntas, contacto (+ `texto` para apartados nuevos).
- Campos propios: `talleres.items[]` {titulo, texto, incluye, imagen} (cada taller con su color), `servicios.items[]` {titulo, texto, categoria, precio, detalle, imagenes}, `trabajos.trabajos[]` {titulo, texto, lugar, categoria, imagen}, `contacto.horario[]` {dia, horas}, `presupuesto.nota` y `presupuesto.boton_formulario`, `zonas.titulo_pagina` y `zonas.texto_pagina`. `categoria` = el título de un taller: toma su color.
- `cifras` y `opiniones` no se pintan vacías y la plataforma no las inventa.
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas` (Qué hacemos, Dónde instalamos, Presupuesto y contacto). Sin la clave, una sola página larga.
- Contenido editable en `site.yaml`; metadatos y guion del asistente en `template.yaml`; reglas para el agente en `CLAUDE.md`; brief de diseño en `DISEÑO.md`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Fuentes Jost y Karla (OFL-1.1) alojadas en `public/fuentes/` (`LICENCIAS.md`). Fotos de `public/fotos/` generadas con IA para esta plantilla; imágenes de relleno (`public/placeholders/`) propias, sin licencias de terceros.

## Páginas propias
- Cada elemento de `secciones.servicios.items` con `detalle` tiene su página en `/servicios/<slug>/` (`src/pages/[coleccion]/[slug].astro`).
- Cada zona de `secciones.zonas.items` con `texto` tiene su página en `/zonas/<slug>/` (`src/pages/zonas/[slug].astro`); en la sección, `titulo_pagina` y `texto_pagina` con {zona} y {negocio}.
- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
