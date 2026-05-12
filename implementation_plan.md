# Segunda Fase: Refinamiento de Diseño de "Next Ópticas"

Este plan detalla la implementación de las nuevas ideas de diseño solicitadas para darle a la landing page un aspecto aún más moderno y dinámico.

## User Review Required

> [!IMPORTANT]
> Por favor, revisá las propuestas a continuación. Una vez que apruebes el enfoque, procederé a implementarlas en el código.
> 
> *Nota: Mencionaste "de este estilo" para las cards de tecnología, pero no se adjuntó ninguna imagen nueva. Voy a diseñar unas cards premium limpias con sombras suaves y hover effects.*

## Proposed Changes

### 1. Nuevo Navbar Transparente (`src/components/Navbar.tsx`)
- **[NEW]** Crear un componente `Navbar` fijado al tope de la pantalla (`fixed top-0 w-full z-50`).
- Estilo inicial transparente que cambiará ligeramente (efecto *glassmorphism* / desenfoque) al hacer scroll.
- Contendrá: 
  - Izquierda: Logo "Next" (texto elegante o placeholder de imagen).
  - Centro: Links a las secciones (Servicios, Marcas, Contacto).
  - Derecha: Ícono de WhatsApp neutro (sin color sólido, probablemente el bordeado de `lucide-react`).

### 2. Rediseño del Hero (`src/components/Hero.tsx`)
- **[MODIFY]** Cambiar la alineación del texto y contenido a la izquierda.
- Añadir un efecto dinámico en el título. Por ejemplo: "Tu [visión / salud / estilo], nuestro enfoque". La palabra cambiará automáticamente usando un ciclo en React (`useEffect`) o animaciones CSS.

### 3. Rediseño de Servicios en Mosaico (`src/components/Services.tsx`)
- **[MODIFY]** Cambiar el layout actual de grilla tradicional por un **mosaico asimétrico** usando CSS Grid (por ejemplo, el primer ítem más grande, o alternando tamaños).
- Incorporar imágenes placeholder (usando un servicio de imágenes de stock libre para óptica o degradados dinámicos) en lugar de solo íconos, con el título del servicio sobre la imagen u oculto y revelado al hacer hover.

### 4. Marcas y Tecnología (`src/components/Brands.tsx`)
- **[MODIFY]** Mantener la fila de marcas de anteojos y agregar una nueva sub-sección para **Marcas de Tecnología** (ej. cristales, tratamientos).
- Implementar las marcas de tecnología en formato de *cards* premium, con algo de texto o descripción de la tecnología, y un aspecto limpio.

### 5. Botón Flotante de WhatsApp (`src/App.tsx`)
- **[MODIFY]** Añadir un componente o div fijado en la esquina inferior derecha (`fixed bottom-6 right-6 z-50`) con el ícono de WhatsApp en el color verde característico y una sombra pronunciada para incentivar el contacto rápido.

## Verification Plan
- Levantar servidor de desarrollo.
- Navegar para verificar el efecto "sticky/glass" del Navbar.
- Comprobar la animación fluida en el Hero.
- Validar la estética asimétrica del mosaico de servicios.
- Probar la interacción de las nuevas cards de tecnología y la visibilidad del botón de WhatsApp.
