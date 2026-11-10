// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
/** Elemento de lista. `categoria` (servicios) = nombre de un taller; `incluye` (talleres) = «uno; otro; otro». */
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string; categoria?: string; precio?: string; incluye?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }
/** Trabajo hecho (sección `trabajos`): `categoria` = nombre de un taller (colorea el pie de la foto). */
export interface Trabajo { titulo: string; texto?: string; lugar?: string; categoria?: string; imagen?: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  nota?: string;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  trabajos: Trabajo[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v));

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    nota: texto(s.nota),
    cta: s.cta?.url ? (s.cta as Enlace) : undefined,
    cta_secundario: s.cta_secundario?.url ? (s.cta_secundario as Enlace) : undefined,
    items: lista<Item>(s.items),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Testimonio>(s.testimonios),
    galeria: lista<string>(s.galeria),
    horario: lista<Horario>(s.horario),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    trabajos: lista<Trabajo>(s.trabajos),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#1949c5', acento: '#c52a10', fondo: '#d2c9b9', texto: '#14110e', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'HomeAndConstructionBusiness',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Títulos de `servicios.items` (opciones del desplegable «Tipo de trabajo» de los formularios). */
export function tiposDeTrabajo(): string[] {
  const s = seccion('servicios');
  return s ? s.items.map((it) => texto(it.titulo)).filter(Boolean) : [];
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
/** ¿Enlace fuera de la web? (se abre en otra pestaña). */
export const externo = (u?: string) => Boolean(u && /^https?:\/\//.test(u));
/** Elementos de una cadena separada por «;» o por saltos de línea («una por línea» en el editor). */
export const trozos = (t?: unknown) => (t ? String(t).split(/\s*[;\n]\s*/).map((x) => x.trim()).filter(Boolean) : []);

/**
 * Letras de la palabra más larga de un titular. Los titulares van en mayúsculas de Jost y su tamaño se ajusta en CSS
 * con `--letras` para que ninguna palabra se parta ni se salga de su columna, escriba lo que escriba el cliente.
 */
export function letras(t?: unknown): number {
  const palabras = String(t ?? '').split(/[\s/]+/).map((p) => p.replace(/[^\p{L}\p{N}]/gu, ''));
  return Math.max(6, ...palabras.map((p) => p.length));
}

const clave = (t?: unknown) =>
  String(t ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
/**
 * Color de categoría (1, 2 o 3) de un servicio o un trabajo: el del taller de `talleres.items` cuyo título coincide con
 * su `categoria`. Primer taller = primario, segundo = acento, tercero = amarillo derivado del acento; del cuarto en
 * adelante se repiten. Sin taller que coincida: 0 (sin color: un conjunto de un solo tipo no lleva color).
 */
export function colorDe(categoria?: unknown): number {
  const c = clave(categoria);
  const t = seccion('talleres');
  if (!c || !t) return 0;
  const i = t.items.findIndex((it) => {
    const k = clave(it?.titulo);
    return Boolean(k) && (k === c || k.startsWith(c) || c.startsWith(k));
  });
  return i < 0 ? 0 : (i % 3) + 1;
}
