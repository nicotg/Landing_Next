# AGENTS.md

Guía genérica para cualquier agente de IA (Claude Code, Cursor, Aider, Codex, etc.)
que trabaje sobre este repositorio.

## Proyecto

**Next Ópticas** — Landing page de una óptica en Córdoba (Argentina).
Stack: React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + lucide-react.

## Comandos

| Acción              | Comando         |
|---------------------|-----------------|
| Instalar deps       | `npm install`   |
| Servidor dev        | `npm run dev`   |
| Build producción    | `npm run build` |
| Preview build       | `npm run preview` |
| Lint                | `npm run lint`  |

Antes de marcar una tarea como terminada: ejecutar `npm run lint` y `npm run build`.

## Estructura

```
src/
  App.tsx              Composición de la landing (orden de secciones)
  main.tsx             Entry point React
  index.css            Tailwind v4 + tema (@theme)
  App.css              Estilos puntuales (preferir Tailwind)
  assets/              Imágenes y logos
  components/
    Navbar.tsx         Nav fijo, glassmorphism on scroll
    Hero.tsx           Hero con palabra rotativa (framer-motion)
    Services.tsx       Mosaico asimétrico de servicios
    Brands.tsx         Marcas + cards de tecnología óptica
    Contact.tsx        Form + info + mapa embebido
    FloatingWhatsApp.tsx  CTA flotante bottom-right
public/                Favicon e íconos estáticos
implementation_plan.md Plan de la fase actual (referencia)
```

## Convenciones

- **Idioma**: textos visibles en **español rioplatense** (vos / acercate / contactanos).
- **Tipado**: componentes con `React.FC` y `export const`. Mantener TS estricto.
- **Estilos**: Tailwind utility-first. Variables de tema en `src/index.css` (`@theme`):
  - `--color-primary: #0033A0` (azul Next)
  - `--color-accent: #91D1F2` (celeste)
  - `--color-dark: #000000`
  - `--color-light: #D9DDE3`
  - `--font-sans: 'Outfit'`
  Usar `bg-primary`, `text-accent`, etc. No introducir hex literales salvo casos
  específicos (ej. verde WhatsApp `#25D366`).
- **Animaciones**: preferir `framer-motion` para transiciones de elementos;
  Tailwind `transition-*` para hover/scroll simples.
- **Íconos**: `lucide-react` con `strokeWidth={1.5}` para coherencia visual.
- **Imágenes**: importar desde `src/assets/` para que Vite las procese.
- **Accesibilidad**: incluir `alt` en `<img>` y `aria-label` en CTAs sin texto.

## Reglas para el agente

1. **No crear archivos** (componentes, .md, configs) salvo que el usuario lo pida.
2. **No agregar dependencias** sin permiso. Si hace falta una, proponela primero.
3. **No reescribir** componentes completos para cambios chicos: usar edits puntuales.
4. **Preservar el tema**: nada de hardcodear paletas distintas a la del `@theme`.
5. **Responsive**: cada cambio visual debe verse bien en mobile (`< md`) y desktop.
6. **Comentarios**: solo cuando expliquen un *por qué* no obvio. No describir el *qué*.
7. **Commits**: mensajes en español, en presente, descriptivos del *porqué*.
8. **Branch**: trabajar en la rama que indique el usuario. No pushear a `main`.

## Plan vigente

Ver `implementation_plan.md` para la fase de diseño actual. Si el código ya cumple
un ítem del plan, no lo reimplementes; confirmá y seguí con lo pendiente.

## Verificación visual

Cambios de UI deben revisarse en navegador con `npm run dev`. Si no es posible
levantar el browser, indicarlo explícitamente en vez de declarar éxito.
