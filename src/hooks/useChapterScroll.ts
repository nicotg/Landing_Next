import { useEffect, type RefObject } from 'react';
import { animate } from 'framer-motion';

// Un gesto (rueda, swipe o tecla) = un capítulo. La sección es un sticky de
// `count` pantallas con scroll real; mientras está fijo interceptamos la entrada
// y animamos el scroll hasta el capítulo vecino. En los extremos soltamos el
// scroll normal de la página.
export const useChapterScroll = (ref: RefObject<HTMLElement | null>, count: number) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const last = count - 1;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animating = false;
    let lastEvent = 0;
    let lastAbs = 0;
    let touchY: number | null = null;

    const metrics = () => {
      const unit = el.offsetHeight / count;
      const top = el.getBoundingClientRect().top + window.scrollY;
      return { unit, top, pos: (window.scrollY - top) / unit };
    };

    // Devuelve true si el gesto fue consumido por la sección
    const handle = (dir: 1 | -1, fresh: boolean) => {
      const { unit, top, pos } = metrics();
      if (pos < -0.001 || pos > last + 0.001) return false;
      const target = dir === 1 ? Math.floor(pos + 1e-3) + 1 : Math.ceil(pos - 1e-3) - 1;
      // Si el gesto ya venía en curso (inercia del trackpad) y llegamos al borde,
      // lo tragamos para que no arrastre la página fuera de la sección.
      if (target < 0 || target > last) return !fresh;
      if (animating || !fresh) return true;
      animating = true;
      animate(window.scrollY, top + target * unit, {
        duration: reduce ? 0 : 0.85,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => window.scrollTo({ top: v, behavior: 'instant' }),
        onComplete: () => {
          animating = false;
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
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null) return;
      const dy = touchY - e.touches[0].clientY;
      const { pos } = metrics();
      if (pos >= -0.001 && pos <= last + 0.001) e.preventDefault();
      if (Math.abs(dy) < 40) return;
      touchY = null;
      handle(dy > 0 ? 1 : -1, true);
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
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
    };
  }, [ref, count]);
};
