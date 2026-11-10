# Carpintería metálica y cristalería: brief de diseño

Plantilla `carpinteria-metalica` creada el 10/11/2026 a partir de `reformas-oficios` con `php artisan plantillas:nueva` y
rediseñada entera con el tema **Werkstatt** de la skill Hallmark (género playful). De la base solo queda la estructura
técnica (carga del `site.yaml`, fichas, zonas, varias páginas y SEO comunes). Este fichero se queda en el repo: es lo que lee
quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: talleres de carpintería de aluminio y PVC, cristalerías, cerrajería y forja (sectores
  `carpinteria-metalica`, `cristaleria`, `cerrajeria`, `aluminio-pvc`): ventanas y puertas a medida, cerramientos de terraza,
  mamparas, persianas y mosquiteras, vidrios y espejos, barandillas, puertas de garaje, rejas y estructuras ligeras, para
  particulares, comunidades y obras. Su cliente entra a ver trabajos hechos (fotos grandes), qué fabrican, si instalan en su
  pueblo y a pedir presupuesto o medición.
- **Qué tiene que conseguir la web**: que **pidan medición o presupuesto** (teléfono, WhatsApp o formulario). «Pedir
  medición» en la cabecera, «Llamar ahora» y «Pedir medición» en la portada, la banda de presupuesto con el formulario y, en
  móvil, barra fija con «Llamar» y «Presupuesto».
- **Tono**: de taller, seguro de sí, de tú. Sí: el catálogo impreso de un taller, colgado en la pared, con los datos en
  celdas. No: la web de reformas amarilla y negra con diagonales (la base), ni el cristal azul degradado de las webs de
  ventanas.

## Tema Hallmark y cómo se ha traducido

Werkstatt (`references/themes/werkstatt.md`, colorway `putty`): papel masilla, tinta casi negra, Jost 700 en mayúsculas para
titulares y cifras, Karla para leer, filetes cuadrados de 2 y 3 px que encierran celdas, cero radios, cero sombras, fotos en
blanco y negro y tres primarios planos (azul, bermellón, amarillo), cada uno con un trabajo: codificar una categoría.

- **La traducción clave**: las «tres escuelas» del tema son aquí **los tres talleres** (Aluminio y PVC, Cristalería,
  Cerrajería y forja). Cada taller tiene su color y ese color es el mismo en todas partes: la franja bajo la foto de la
  portada, la celda del taller, la muestra en el índice de servicios y el pie de cada trabajo (`categoria` = título del
  taller, `colorDe()` en `src/data/site.ts`). Un conjunto de un solo tipo (cifras, zonas, opiniones) no lleva color.
- **Cuatro colores** → `fondo` = papel (`#d2c9b9`), `texto` = tinta (`#14110e`), `primario` = azul ultramar (`#1949c5`):
  primer taller y campo de la banda de presupuesto; `acento` = bermellón (`#c52a10`): segundo taller. El **tercer primario**
  (amarillo) no tiene variable propia: se deriva del acento con `oklch(from var(--c-acento) 0.86 0.155 calc(h + 59))`, siempre
  claro y con el matiz girado hacia el amarillo (con el bermellón sale el amarillo del tema).
- **Derivados** (`src/styles/global.css`): `--papel-2` (bandas), `--papel-3` (pozos y hover), `--apagado`, `--regla`
  (filetes finos), `--sobre-tinta` (letra en la banda de tinta y el pie), `--sobre-cat-1/2/3` (letra clara u oscura sobre cada
  color, según su luminosidad). Probado con primario verde oscuro, acento naranja, fondo blanco y tinta gris azulada:
  la letra sobre el naranja y el verde lima derivado pasa a oscura sola y todo se lee.
- **Material**: celdas encerradas por filetes de 3 px (`.celdas`) para los datos de la portada, los talleres, las cifras, las
  zonas, las opiniones, las vías de contacto y el pie; filete de 2 px bajo la cabecera y sobre tablas; índice de servicios y
  horario como tablas con filetes; formulario como hoja de impreso (campos en celdas, botón como bloque al pie); botones
  cuadrados: tinta llena + borde de 2 px (invertidos en las bandas de color); enlaces con subrayado de 2 px que pasa a 3 px.
  Movimiento quieto, como un impreso: solo el subrayado y el color de los botones al pasar.
- **Firma**: la foto de la portada con la franja de los tres talleres en sus colores debajo (como la del tema), y esos colores
  repetidos en el resto de la página.

## Tipografías y licencias

Jost 700 (Owen Earl) y Karla 400 y 600 (Jonathan Pinhorn), las del tema, ambas **OFL-1.1**, woff2 `latin` de Fontsource en
`public/fuentes/` (37 KB en total), `font-display: swap`, respaldo del sistema de la misma clase (Futura/Century Gothic y
system-ui) y `preload` solo de Jost. No se usa la tercera cara del tema (JetBrains Mono, solo para código). Detalle en
`public/fuentes/LICENCIAS.md`.

Titulares sin palabras partidas: `overflow-wrap: normal` y `hyphens: manual`, y además cada titular se ajusta a su columna
con `font-size: min(var(--tam), 100cqi / (letras × 0,68))`, donde `letras` es la longitud de su palabra más larga (calculada
al construir) y 0,68 em el ancho medio medido de una mayúscula de Jost 700. «Impermeabilizaciones» cabe en el `h1` a 375 px y
en la columna de 5/12 a 1440 px (comprobado con `revisar.mjs`, sin desbordes).

## Forma y ritmo de bandas

| # | Sección | Papel | Lleva |
|---|---|---|---|
| 1 | `hero` | papel | Stage: texto en 5 columnas con datos en celdas y dos botones; foto enmarcada en 7 con la franja de talleres |
| 2 | `talleres` | papel (filete de 3 px arriba) | rejilla codificada: foto, nombre sobre su color, texto y lo que incluye en filas |
| 3 | `servicios` | papel 2 | índice en tabla: nombre, texto, taller con muestra de color, precio |
| 4 | `trabajos` | papel | mosaico de fotos enmarcadas, la primera grande, pie del color de su taller |
| 5 | `proceso` | tinta | horario en filas: número y paso en mayúsculas grandes, lo que pasa a la derecha |
| 6 | `cifras` | papel | cifras en celdas a tamaño de titular |
| 7 | `zonas` | papel 2 | pueblos en celdas, enlazados a su página |
| 8 | `opiniones` | papel | opiniones en celdas |
| 9 | `presupuesto` | campo primario | garantías en filas y formulario como hoja de impreso |
| 10 | `preguntas` | papel | cabeza fija a la izquierda, filas desplegables |
| 11 | `contacto` | papel 2 | vías en celdas, horario en filas y la nave enmarcada |
| — | pie | tinta | nombre como mástil, celdas con horario, dirección, contacto y menú; barra fija en móvil |

Se alternan bandas de foto (portada, talleres, trabajos, contacto) con bandas que solo hace el material (índice, filas,
celdas, hoja). Cada sección sin contenido no se pinta (no quedan bandas vacías con el `site.yaml` vacío).

## Listas propias y páginas

- `talleres.items` {titulo, texto, incluye, imagen}, `servicios.items` {titulo, texto, categoria, precio, detalle, imagenes},
  `trabajos.trabajos` {titulo, texto, lugar, categoria, imagen}, `contacto.horario` {dia, horas}.
- Fichas: cada servicio con `detalle` tiene su página en `/servicios/<slug>/` (`Service`). Zonas: cada pueblo con `texto`
  tiene su página en `/zonas/<slug>/` («Carpintería metálica en {zona}»). El comprobador sugiere ficha también para los
  talleres; no se ha hecho para no duplicar las páginas de servicios.
- Varias páginas recomendadas: Qué hacemos (talleres, servicios, proceso), Dónde instalamos (zonas), Presupuesto y contacto
  (presupuesto, preguntas, contacto). Inicio se queda con portada, trabajos, cifras y opiniones.

## Fotos

10 fotos generadas con IA a partir de `fotos.json` (nave del taller con una ventana a medio montar, manos ajustando un marco
de PVC, cristalería con vidrios en caballete, soldadura de una barandilla, cerramiento de ático, mampara, barandilla de
escalera, puerta de garaje seccional, ventanas en una fachada de piedra, interior de la nave). Sin texto legible, sin
logotipos, sin caras. El generador da 1024×1024: se recortan a 4:3 y se amplían como mucho ×1,5 (portada 1536 px, el resto
1400 px). El blanco y negro del tema se aplica por CSS (`grayscale(1) contrast(1.06)`), así que las fotos del cliente
también salen en blanco y negro y los colores de los talleres siguen siendo el único color de la página.

## Lo que no se ha podido o choca con Hallmark

- `antetitulo` es contrato: se pinta como letra menuda en caja normal (Hallmark prohíbe el antetítulo).
- `opiniones` y `cifras` llevan ejemplos ficticios en el `site.yaml` de muestra (Hallmark prohíbe inventarlos); la plataforma
  las deja desmarcadas y vacías al crear una web. Los `items` de la portada la plataforma los trata como cifras: no van en el
  guion del asistente.
- El tema pide dos bandas como mucho; aquí hay dos de papel 2, una de tinta y un campo de primario, porque el cliente quiere
  bandas a todo el ancho.
- Fotos en 4:3 y no cuadradas como en el tema: el generador y los huecos del editor (4:3) mandan.
- El sello de Hallmark no queda en la primera línea del CSS servido (Tailwind antepone su cabecera al ir en línea) y
  `comun.css` (común a todas las plantillas) trae colores literales y etiquetas en mayúsculas espaciadas que aquí se anulan.
- Hallmark pide 450 palabras por página; esta pasa de 1000 con el índice de servicios y las preguntas. Se queda así porque
  es contenido que el cliente necesita.
- El botón de la cabecera va lleno de tinta (como en el tema) y sloplint avisa de dos botones llenos en la primera pantalla.

## Ajuste del coordinador (10/11/2026)

Las fotos de «Trabajos» (sección y páginas de zona) y las galerías de las fichas van en su color (`.foto--color`): el cliente enseña el acabado real. El blanco y negro del tema se queda en la portada, los talleres y las cabeceras de ficha.
