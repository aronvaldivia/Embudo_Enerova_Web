import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FloatingScrollButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkVisibility = () => {
      const target = document.getElementById('funnel-container') || document.getElementById('formulario-solicitud');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Si la parte superior del formulario está a la vista del usuario en pantalla, ocultamos el botón flotante
      if (rect.top <= windowHeight * 0.45 && rect.bottom >= 0) {
        setIsVisible(false);
      } else if (rect.top > windowHeight * 0.45) {
        // El usuario está arriba del formulario
        setIsVisible(true);
      } else {
        // El usuario ya pasó el formulario hacia abajo
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    checkVisibility(); // Comprobación inicial

    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  const handleScrollToForm = () => {
    const target = document.getElementById('formulario-solicitud') || document.getElementById('funnel-container');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.85 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-5 inset-x-0 flex justify-center items-center z-50 lg:hidden pointer-events-none px-4"
        >
          <button
            type="button"
            id="btn-floating-scroll-form"
            onClick={handleScrollToForm}
            aria-label="Deslizar al formulario de solicitud"
            className="pointer-events-auto group flex items-center gap-2.5 bg-[#024327] hover:bg-[#035933] active:scale-95 text-white pl-4 pr-1.5 py-1.5 rounded-full shadow-[0_10px_25px_-4px_rgba(2,67,39,0.6)] border-2 border-[#76b72f] cursor-pointer transition-transform duration-150 backdrop-blur-md"
          >
            <span className="text-xs font-black tracking-wide uppercase text-white font-['Outfit']">
              ¡Envía tu solicitud!
            </span>
            <div className="w-8 h-8 rounded-full bg-[#76b72f] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
              <ArrowDown className="w-4 h-4 text-[#024327] stroke-[3] animate-bounce" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
