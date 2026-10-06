import { useEffect, type RefObject } from 'react';
import { animate } from 'framer-motion';

type Options = {
  // Para la sección que da a contenido de scroll libre: frena en su último
  // capítulo la inercia táctil que viene desde abajo.
  snapEnd?: boolean;
};

// Un gesto (rueda, swipe o tecla) = un capítulo. La sección es un sticky de
// `count` pantallas con scroll real; mientras está fijo interceptamos la entrada
// y animamos el scroll hasta el capítulo vecino. En los extremos soltamos el
// scroll normal de la página.
export const useChapterScroll = (
  ref: RefObject<HTMLElement | null>,
  count: number,
  { snapEnd = false }: Options = {},
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const last = count - 1;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animating = false;
    let lastEvent = 0;
    let lastAbs = 0;
    let touchY: number | null = null;
    let touchMode: 'pending' | 'consume' | 'native' = 'pending';
    let touchFired = false;

    const metrics = () => {
      const unit = el.offsetHeight / count;
      const top = el.getBoundingClientRect().top + window.scrollY;
      return { unit, top, pos: (window.scrollY - top) / unit };
    };

    // En pantallas de alta densidad el scroll queda en fracciones de px
    // (1623.6 en vez de 1624): sin tolerancia el último capítulo se lee como
    // "casi" el anterior y el gesto nunca se libera.
    const EPS = 0.02;
    const inZone = (pos: number) => pos >= -EPS && pos <= last + EPS;
    // Hasta una pantalla antes del borde, el gesto engancha la sección en el
    // capítulo del borde en vez de dejarla a medio camino. Una pantalla es justo
    // la distancia entre el último capítulo del hero y el primero de Servicios,
    // así que el paso entre ambos también es un solo gesto.
    const SNAP = 1 + EPS;
    const inReach = (dir: 1 | -1, pos: number) =>
      inZone(pos) ||
      (dir === 1 && pos > -SNAP && pos < 0) ||
      (dir === -1 && pos > last && pos < last + SNAP);
    const targetFor = (dir: 1 | -1, pos: number) =>
      dir === 1 ? Math.floor(pos + EPS) + 1 : Math.ceil(pos - EPS) - 1;

    // La inercia de iOS ignora scrollTo, así que un flick desde abajo podía
    // atravesar el último capítulo y caer en el medio. scroll-snap sí la frena.
    // Es un marcador aparte (WebKit ignora `snap-align: end` en secciones más
    // altas que la pantalla) y el único de la página: con más de uno, Safari
    // salta entre ellos cada vez que alguno se apaga.
    const root = document.documentElement;
    const marker =
      snapEnd && window.matchMedia('(pointer: coarse)').matches
        ? document.createElement('div')
        : null;
    if (marker) {
      marker.setAttribute('aria-hidden', 'true');
      marker.style.cssText = `position:absolute;left:0;top:${(last / count) * 100}%;width:1px;height:1px;pointer-events:none;scroll-snap-stop:always`;
      el.appendChild(marker);
      root.style.scrollSnapType = 'y proximity';
    }
    const setMarker = (on: boolean) => {
      if (marker) marker.style.scrollSnapAlign = on ? 'start' : 'none';
    };
    setMarker(true);
    // Al salir con un gesto propio el marcador queda apagado hasta alejarse:
    // si no, el snap por proximidad devuelve un swipe suave al borde.
    let leaving = false;
    const LEAVE = 1;

    // Devuelve true si el gesto fue consumido por la sección
    const handle = (dir: 1 | -1, fresh: boolean) => {
      const { unit, top, pos } = metrics();
      if (!inReach(dir, pos)) return false;
      const target = targetFor(dir, pos);
      // Si el gesto ya venía en curso (inercia del trackpad) y llegamos al borde,
      // lo tragamos para que no arrastre la página fuera de la sección.
      if (target < 0 || target > last) return !fresh;
      if (animating) return true;
      // Al entrar enganchamos aunque sea inercia; adentro, solo gestos nuevos.
      if (!fresh && inZone(pos)) return true;
      animating = true;
      leaving = false;
      // Con el marcador vivo, cada scrollTo intermedio se reengancharía a él.
      setMarker(false);
      animate(window.scrollY, top + target * unit, {
        duration: reduce ? 0 : 0.85,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => window.scrollTo({ top: v, behavior: 'instant' }),
        onComplete: () => {
          animating = false;
          if (target === last) setMarker(true);
        },
      });
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX) || e.deltaY === 0) return;
      const now = e.timeStamp;
      const abs = Math.abs(e.deltaY);
      // La inercia del trackpad decae sin parar: un impulso claramente mayor al
      // evento anterior es un gesto nuevo aunque no haya pausa entre medio.
      const fresh = now - lastEvent > 150 || (abs > 10 && abs > lastAbs * 1.5);
      lastEvent = now;
      lastAbs = abs;
      if (handle(e.deltaY > 0 ? 1 : -1, fresh)) e.preventDefault();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      touchMode = 'pending';
      touchFired = false;
    };
    // iOS solo respeta preventDefault si se cancela desde el primer touchmove:
    // una vez que arrancó el scroll nativo ya no se puede frenar. Por eso
    // decidimos ahí si el gesto cambia de capítulo o si es scroll normal (por
    // ejemplo, deslizar hacia abajo en el último capítulo para salir).
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null || touchMode === 'native') return;
      const dy = touchY - e.touches[0].clientY;
      if (touchMode === 'pending') {
        const { pos } = metrics();
        if (dy === 0) {
          if (inZone(pos)) e.preventDefault();
          return;
        }
        const dir = dy > 0 ? 1 : -1;
        if (!inReach(dir, pos)) {
          touchMode = 'native';
          return;
        }
        const target = targetFor(dir, pos);
        if (!animating && (target < 0 || target > last)) {
          touchMode = 'native';
          leaving = true;
          setMarker(false);
          return;
        }
        touchMode = 'consume';
      }
      e.preventDefault();
      if (touchFired || Math.abs(dy) < 40) return;
      touchFired = true;
      handle(dy > 0 ? 1 : -1, true);
    };

    // Fuera de la sección (y lejos, si recién salimos) vuelve el marcador.
    const onScroll = () => {
      const { pos } = metrics();
      if (animating || inZone(pos)) return;
      if (leaving && pos > -LEAVE && pos < last + LEAVE) return;
      leaving = false;
      setMarker(true);
    };

    const onKey = (e: KeyboardEvent) => {
      const down = ['ArrowDown', 'PageDown', ' '].includes(e.key) && !e.shiftKey;
      const up = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
      if (!down && !up) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON') return;
      if (handle(down ? 1 : -1, true)) e.preventDefault();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      if (marker) {
        marker.remove();
        root.style.scrollSnapType = '';
      }
    };
  }, [ref, count, snapEnd]);
};
