# Next Ópticas — Landing Page

Sitio de presentación de **Next Ópticas**, una óptica de Córdoba (Argentina).
Diseño moderno con navbar transparente, hero animado, mosaico asimétrico de
servicios, marcas y tecnología óptica, formulario de contacto y CTA flotante a
WhatsApp.

## Stack

- **React 19** + **TypeScript**
- **Vite 8** (dev server + bundler)
- **Tailwind CSS v4** (con `@theme` para tokens de diseño)
- **Framer Motion** (animación del hero)
- **SVG inline propios** (íconos en `src/components/icons.tsx`)

## Scripts

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm run build      # build de producción → dist/
npm run preview    # servir el build local
npm run lint       # ESLint
```

## Estructura

```
src/
  App.tsx                       Composición de secciones
  main.tsx                      Entry point
  index.css                     Tailwind + tokens de tema
  assets/                       Logos e imágenes
  components/
    Navbar.tsx                  Nav fijo con glass on scroll
    Hero.tsx                    Hero con palabra rotativa
    Services.tsx                Mosaico de servicios
    Brands.tsx                  Marcas + cards de tecnología
    Contact.tsx                 Form, info y mapa
    FloatingWhatsApp.tsx        Botón flotante de WhatsApp
    icons.tsx                   SVG inline (ChatIcon, EyeIcon, ...)
public/                         Favicon e íconos estáticos
implementation_plan.md          Plan de la fase de diseño actual
AGENTS.md                       Guía para agentes de IA
```

## Tema de diseño

Definido en `src/index.css` con la directiva `@theme` de Tailwind v4:

| Token              | Valor       | Uso                        |
|--------------------|-------------|----------------------------|
| `--color-primary`  | `#0033A0`   | Azul institucional Next    |
| `--color-accent`   | `#91D1F2`   | Celeste de acento          |
| `--color-dark`     | `#000000`   | Texto y fondos oscuros     |
| `--color-light`    | `#D9DDE3`   | Grises claros, bordes      |
| `--font-sans`      | `Outfit`    | Tipografía base            |

Para usarlos: `bg-primary`, `text-accent`, `border-light`, etc.

## Convenciones

- Textos en español rioplatense (vos / acercate / contactanos).
- Componentes funcionales con `React.FC` y `export const`.
- Íconos como SVG inline en `src/components/icons.tsx` (`stroke="currentColor"`, `strokeWidth={1.5}`).
- Imágenes importadas desde `src/assets/` para que las procese Vite.
- Tailwind utility-first; nada de hex hardcodeados fuera del tema (excepción
  documentada: verde WhatsApp `#25D366`).

## Próximos pasos

Ver `implementation_plan.md` para el detalle de la fase de refinamiento de
diseño en curso.
