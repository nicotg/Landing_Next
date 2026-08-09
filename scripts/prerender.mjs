// Inyecta en dist/index.html el HTML de la app ya renderizado, para que los
// crawlers no reciban un <div id="root"> vacío.
//
// Corre DESPUÉS de `vite build`, sobre un build SSR aparte. Se hizo así a
// propósito: los plugins que prerenderizan dentro del build del cliente suman
// react-dom/server como segundo entry, y rolldown termina metiendo ~190 kB de
// código de servidor en el bundle que baja el navegador.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

// dist-ssr ya figura en .gitignore, así que si un build falla a mitad de camino
// la carpeta que queda no se puede colar en un commit.
const SSR_OUT = 'dist-ssr'
const HTML = 'dist/index.html'
const PLACEHOLDER = '<div id="root"></div>'

const { prerender } = await import(pathToFileURL(`${process.cwd()}/${SSR_OUT}/prerender.js`).href)
const { html } = await prerender()

const template = await readFile(HTML, 'utf8')

if (!template.includes(PLACEHOLDER)) {
  throw new Error(`No se encontró ${PLACEHOLDER} en ${HTML}: el prerender no se inyectó.`)
}

await writeFile(HTML, template.replace(PLACEHOLDER, `<div id="root">${html}</div>`))
await rm(SSR_OUT, { recursive: true, force: true })

console.log(`Prerender inyectado en ${HTML} (${html.length} caracteres de HTML)`)

// react-dom/server deja abierto un MessagePort que mantiene vivo el event loop.
process.exit(0)
