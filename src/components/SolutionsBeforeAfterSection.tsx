import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Clock,
  Sparkles,
  ImageOff,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { APP_CONFIG } from '../config';

const SOLUTION_HIGHLIGHTS = [
  { icon: ShieldCheck, label: 'Ignífugo clase A1' },
  { icon: Leaf, label: 'Ecológico' },
  { icon: Clock, label: '40-50 años de vida útil' },
  { icon: Sparkles, label: 'Sin obras ni escombros' },
];

export default function SolutionsBeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState<number>(48);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [beforeImgError, setBeforeImgError] = useState<boolean>(false);
  const [afterImgError, setAfterImgError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const updatePositionFromClientX = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    if (rect.width <= 0) return;
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(96, Math.max(4, rawPercent));
    setSliderPosition(clamped);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already released
      }
      setIsDragging(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(4, prev - 3));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(96, prev + 3));
    }
  };

  const scrollToForm = () => {
    const target =
      document.getElementById('formulario-solicitud') ||
      document.getElementById('funnel-container');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="nuestras-soluciones"
      aria-labelledby="solutions-heading"
      className="relative w-full bg-[#091410] text-white py-16 sm:py-24 border-t border-white/10 overflow-hidden"
    >
      {/* Sutil iluminación ambiental coherente con la paleta Enerova */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-12 right-1/4 w-[420px] h-[300px] bg-[#024327]/25 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-1/4 w-[360px] h-[260px] bg-[#76b72f]/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de sección */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10"
        >
          <h2
            id="solutions-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit'] text-balance"
          >
            Nuestras soluciones
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed max-w-xl">
            Aislamiento de buhardillas con lana mineral soplada. Material ignífugo clase A1,
            hasta 50 años de vida útil, ecológico y financiado al 100 % por los CAE.
          </p>
        </motion.div>

        {/* Contenedor Principal del Comparador Antes / Después */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0d1914] border border-white/10 rounded-[16px] p-3 sm:p-4 shadow-2xl"
        >
          {/* Área interactiva de comparación */}
          <div
            ref={containerRef}
            role="slider"
            tabIndex={0}
            aria-label="Deslizador interactivo para comparar el antes y el después del aislamiento"
            aria-valuemin={4}
            aria-valuemax={96}
            aria-valuenow={Math.round(sliderPosition)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[12px] overflow-hidden select-none touch-none cursor-ew-resize bg-[#07110d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8fd93f]"
          >
            {/* Imagen DESPUÉS (Capa base 100%) */}
            {!afterImgError ? (
              <img
                src={APP_CONFIG.afterInsulationImg}
                alt="Buhardilla después de aplicar lana mineral blanca soplada"
                referrerPolicy="no-referrer"
                draggable={false}
                onError={() => setAfterImgError(true)}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#0e2d1e] to-[#081710] flex flex-col items-center justify-center text-slate-300">
                <ImageOff className="w-8 h-8 mb-2 text-[#8fd93f]" />
                <span className="text-xs font-medium">Imagen después del aislamiento</span>
              </div>
            )}

            {/* Imagen ANTES (Capa superior recortada dinámicamente con clip-path) */}
            <div
              className="absolute inset-0 pointer-events-none select-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              {!beforeImgError ? (
                <img
                  src={APP_CONFIG.beforeInsulationImg}
                  alt="Buhardilla antes de instalar el aislamiento térmico"
                  referrerPolicy="no-referrer"
                  draggable={false}
                  onError={() => setBeforeImgError(true)}
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-stone-900 to-stone-800 flex flex-col items-center justify-center text-stone-300">
                  <ImageOff className="w-8 h-8 mb-2 text-stone-400" />
                  <span className="text-xs font-medium">Imagen antes del aislamiento</span>
                </div>
              )}
            </div>

            {/* Etiqueta inferior izquierda: Antes */}
            <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none px-3 py-1 rounded-[6px] bg-black/65 backdrop-blur-sm border border-white/15 text-white text-xs font-bold tracking-wide">
              Antes
            </span>

            {/* Etiqueta inferior derecha: Después */}
            <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 pointer-events-none px-3 py-1 rounded-[6px] bg-[#76b72f] text-[#051a0f] text-xs font-extrabold tracking-wide shadow-md">
              Después
            </span>

            {/* Línea divisoria vertical + Tirador circular central */}
            <div
              className="absolute top-0 bottom-0 z-20 -translate-x-1/2 pointer-events-none flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Línea vertical luminosa */}
              <div className="w-[2px] h-full bg-white/95 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />

              {/* Botón circular de arrastre (< | >) */}
              <div
                className={`absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#024327] shadow-[0_4px_20px_rgba(0,0,0,0.45)] border-2 border-[#76b72f]/40 flex items-center justify-center transition-transform duration-150 ${
                  isDragging ? 'scale-110' : 'scale-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4 -mr-0.5 stroke-[2.5]" />
                <ChevronRight className="w-4 h-4 -ml-0.5 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Pie del comparador */}
          <p className="text-center text-xs text-slate-400 mt-3 mb-0.5">
            Desliza para comparar antes y después de la instalación
          </p>
        </motion.div>

        {/* Bloque inferior: Métricas + Especificaciones a la izquierda | Texto técnico + CTA a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-10 items-start">
          {/* Columna Izquierda: 2 tarjetas numéricas + 4 características */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="grid grid-cols-2 gap-3.5">
              {/* Tarjeta Ahorro */}
              <div className="bg-[#0e1b16] border border-white/10 rounded-[12px] p-4 sm:p-5">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Hasta
                </span>
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#8fd93f] font-['Outfit'] tabular-nums mt-1 leading-none">
                  30 %
                </span>
                <p className="text-xs font-bold text-white mt-2.5 leading-snug">
                  menos en tu factura
                </p>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  de calefacción y climatización
                </p>
              </div>

              {/* Tarjeta Tiempo */}
              <div className="bg-[#0e1b16] border border-white/10 rounded-[12px] p-4 sm:p-5">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  En solo
                </span>
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#8fd93f] font-['Outfit'] tabular-nums mt-1 leading-none">
                  2 h
                </span>
                <p className="text-xs font-bold text-white mt-2.5 leading-snug">
                  de instalación
                </p>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  sin obras, sin escombros, sin ruido
                </p>
              </div>
            </div>

            {/* 4 Puntos técnicos clave */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SOLUTION_HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-200"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#8fd93f] flex-shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Columna Derecha: Descripción detallada y botón CTA */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit'] tracking-tight text-balance">
              Lana mineral soplada: la solución más eficaz
            </h3>

            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
              La lana mineral se proyecta directamente sobre toda la superficie de la
              buhardilla, cubriendo cada rincón sin dejar puentes térmicos. Más confort
              todo el año: fresco en verano, cálido en invierno.
            </p>

            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
              Material ignífugo certificado clase A1, ecológico, sin mantenimiento y con
              una vida útil de 40 a 50 años. Sistema 100 % soplado limpio, sin obras ni
              desmontajes.
            </p>

            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
              Cada instalación aumenta el valor de tu vivienda y el expediente CAE pasa
              por una verificación independiente.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 bg-[#76b72f] hover:bg-[#89cf3b] active:scale-[0.98] text-[#051a0f] font-extrabold text-sm px-6 py-3 rounded-full shadow-[0_8px_24px_rgba(118,183,47,0.3)] transition-all duration-200 cursor-pointer font-['Outfit'] whitespace-nowrap"
              >
                <span>Solicitar estudio financiado por los CAE</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
