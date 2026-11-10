# Plantilla «Carpintería metálica y cristalería» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **werkstatt** (tema
Werkstatt de la skill Hallmark): papel masilla, tinta casi negra, titulares en mayúsculas de Jost 700, texto en Karla,
filetes de tinta de 2 y 3 px que encierran celdas, cero radios y cero sombras, fotos en blanco y negro y tres colores
planos, uno por taller. Todo en castellano de España, frases cortas, sin jerga, de tú. Brief de diseño en `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario, acento, fondo, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…). En `src/styles/global.css`:
  - `fondo` = papel; `texto` = tinta (letra, botones llenos, banda oscura de «Cómo trabajamos» y pie).
  - `primario` = color del **primer taller** y campo de la banda de presupuesto; `acento` = color del **segundo taller**; el **tercero** (amarillo) se deriva del acento (`--cat-3`). Del cuarto taller en adelante se repiten.
  - La letra sobre cada color se elige sola (clara u oscura, `--sobre-cat-*`). Los demás tonos (`--papel-2`, `--papel-3`, `--apagado`, `--regla`…) salen de los cuatro con `color-mix()`.
- **Tipografías**: alojadas en `public/fuentes/` (Jost 700, Karla 400 y 600, OFL-1.1; `LICENCIAS.md`). No añadas fuentes externas.
- **Titulares que encajan**: cada titular lleva `style="--letras:N"` (letras de su palabra más larga, `letras()` de `src/data/site.ts`) y la clase `encaja` dentro de un contenedor `ajuste`: el tamaño baja solo para que ninguna palabra se parta ni se salga. Si creas un titular nuevo, hazlo igual.
- **Imágenes**: en `public/`. Las fotos van en `public/fotos/` (lista y descripción en `fotos.json`); las de relleno, en `public/placeholders/`. En `site.yaml` se referencian con ruta absoluta (`/fotos/hero.jpg`). En la web se ven en blanco y negro (filtro CSS de `.foto`): el fichero se queda en color.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = nombre en mayúsculas.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true` (y tiene algo que enseñar). Se pintan en el orden en que aparecen en `site.yaml`.
- `hero` → `hero.astro`: antetítulo, titular, `texto`, `items` como datos en celdas (`{titulo: "Gratis", texto: "Medición en casa"}`; la plataforma los trata como cifras), `cta` (llamar, tinta) y `cta_secundario` (pedir medición, borde). A la derecha, `imagen` enmarcada y, debajo, la franja con los talleres de la sección `talleres` en sus colores.
- `talleres` → `talleres.astro`: `items: [{titulo, texto, incluye, imagen}]`, una celda por taller con su foto, su nombre sobre su color y lo que incluye (`incluye: "Uno; otro; otro"`).
- `servicios` → `servicios.astro`: `items: [{titulo, texto, categoria, precio, detalle, imagenes}]` como índice en tabla con filetes. `categoria` = título de un taller (pinta su muestra de color). Precio como texto («Desde 290 €», «Consultar») o vacío. Sus títulos son las opciones de «Tipo de trabajo» del formulario.
- `trabajos` → `trabajos.astro`: `trabajos: [{titulo, texto, lugar, categoria, imagen}]` en mosaico (el primero grande); el pie de cada foto toma el color de su taller.
- `proceso` → `proceso.astro`: `items: [{titulo, texto}]` como filas grandes numeradas en la banda de tinta.
- `cifras` → `cifras.astro`: `items: [{titulo: "1987", texto}]` en celdas. **No se pinta si `items` está vacío.** No inventes cifras.
- `zonas` → `zonas.astro`: `texto` (radio de trabajo) e `items: [{titulo, texto}]` en celdas; las zonas con `texto` tienen página propia.
- `opiniones` → `opiniones.astro`: `testimonios: [{texto, autor, nota}]` en celdas. No inventes opiniones.
- `presupuesto` → `presupuesto.astro`: campo del color primario con `texto`, `items` (garantías), `nota` y el formulario completo como hoja de impreso (`boton_formulario`).
- `preguntas` → `preguntas.astro`: `preguntas: [{pregunta, respuesta}]` en filas desplegables (`details/summary`); sin preguntas no se pinta.
- `contacto` → `contacto.astro`: vías en celdas (teléfono, WhatsApp, email, dirección de `contacto`), `horario: [{dia, horas}]` en filas (si está vacío, la línea `contacto.horario`) e `imagen` de la nave. Si `presupuesto` no está activa, aquí sale el formulario.
- `texto` → `texto.astro`: apartado genérico (párrafos, `imagen`, `items`, `cta`). Para apartados nuevos: `tipo: texto`.

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`. Evita dos bandas de color seguidas (`proceso` y `presupuesto`).
3. **Cambiar textos, teléfonos, horarios, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas.
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Varios valores en una cadena con «; » (`incluye`). Precios y cifras siempre como texto entre comillas. Máximo 24 elementos por lista.
5. **Taller nuevo**: añade un elemento a `talleres.items`; para que un servicio o trabajo tome su color, pon su título en `categoria`. Los colores van por orden (1.º primario, 2.º acento, 3.º amarillo).
6. **Página nueva**: crea `src/pages/<slug>.astro` usando `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
7. **Sección nueva**: mejor un apartado con `tipo:` (`tipo: texto`, `tipo: servicios`, `tipo: trabajos`…) y su propio id. Si hace falta un diseño nuevo, crea `src/components/secciones/<id>.astro` con `seccion(Astro.props.id)`, `Banda` y `Titular`. `src/pages/index.astro` la recoge sola: no lo toques.
8. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Los ids `hero` y `contacto` son obligatorios. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base, salen solos de `site.yaml` y son comunes a todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
9. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida), sin JavaScript nuevo salvo necesidad real, 16 px de margen lateral (`.contenedor`), sin scroll horizontal en móvil, cero radios y cero sombras, barra inferior fija de móvil («Llamar» / «Presupuesto»: sale sola si hay teléfono o presupuesto). Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altSeccion` de `src/lib/seo.ts`, o el título del elemento); las decorativas, `alt=""`.
10. Los formularios no tienen servidor: abren el correo (`mailto`) con el email de `site.yaml`. No cambies el marcado de `src/components/ui/FormularioContacto.astro` (la plataforma lo conecta al publicar).

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento y páginas por zona)
- Listas con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `secciones.servicios.items` → `/servicios/<slug>/` (servicio).
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página.
  Campos opcionales: `slug` (si falta, sale del nombre; no lo pongas sin motivo) e `imagenes` («/fotos/a.jpg; /fotos/b.jpg», galería de la ficha; la foto principal es `imagen` o, si no hay, la primera de `imagenes`).
- Zonas: cada elemento de `secciones.zonas.items` **con `texto`** (60-150 palabras: qué trabajos se hacen allí, pueblos cercanos) tiene su página en `/zonas/<slug>/`. En la sección: `titulo_pagina` («Carpintería metálica en {zona}») y `texto_pagina` (entrada, con {zona} y {negocio}).
- Una orden «añade una página para X» = escribir su `detalle` (o el `texto` de la zona) en site.yaml. Nunca crees a mano páginas en `src/pages/servicios/` ni en `src/pages/zonas/`.
- No tocar `src/lib/paginas.ts`, `src/lib/slug.ts` ni `src/lib/seo.ts` (comunes a todas las plantillas).

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "talleres; servicios" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Con ella la web pasa a Inicio (hero + lo que no esté en ninguna página) y una página por entrada; el menú se hace solo y los enlaces `/#id` del site.yaml se cambian solos por la dirección de su sección. Sin ella, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- No tocar `src/lib/multipagina.ts`, `src/pages/index.astro` ni `src/pages/[...pagina].astro` (comunes a todas las plantillas). En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
