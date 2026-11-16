import { useState, useEffect } from 'react';
import { HardHat, FileText, ShieldCheck, Zap, Home } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface CaeStep {
  id: number;
  number: string;
  nodeLabel: string;
  title: string;
  description: string;
  icon: typeof HardHat;
  positionClass: string;
  labelPositionClass: string;
  arcRotation: number;
}

const CAE_STEPS: CaeStep[] = [
  {
    id: 0,
    number: '01',
    nodeLabel: 'Enerova',
    title: 'Enerova instala y adelanta los costes',
    description:
      'Instalación completa de aislamiento en tu buhardilla. Enerova adelanta el 100 % de los costes. Tú no pagas nada.',
    icon: HardHat,
    positionClass: 'left-1/2 top-[16%] -translate-x-1/2 -translate-y-1/2',
    labelPositionClass: 'top-full mt-1.5 sm:mt-2 left-1/2 -translate-x-1/2',
    arcRotation: -180,
  },
  {
    id: 1,
    number: '02',
    nodeLabel: 'Expediente CAE',
    title: 'Gestionamos toda la documentación',
    description:
      'Expediente técnico completo: mediciones, certificados y cálculo de ahorro energético. Tú no haces ningún trámite.',
    icon: FileText,
    positionClass: 'left-[84%] top-1/2 -translate-x-1/2 -translate-y-1/2',
    labelPositionClass: 'top-full mt-1.5 sm:mt-2 left-1/2 -translate-x-1/2',
    arcRotation: -90,
  },
  {
    id: 2,
    number: '03',
    nodeLabel: 'Verificador',
    title: 'Verificación independiente',
    description:
      'Un tercero independiente revisa que el ahorro energético es real y conforme a la normativa del programa CAE.',
    icon: ShieldCheck,
    positionClass: 'left-1/2 top-[84%] -translate-x-1/2 -translate-y-1/2',
    labelPositionClass: 'bottom-full mb-1.5 sm:mb-2 left-1/2 -translate-x-1/2',
    arcRotation: 0,
  },
  {
    id: 3,
    number: '04',
    nodeLabel: 'Energéticas',
    title: 'Las energéticas financian todo',
    description:
      'Endesa, Iberdrola, Naturgy... compran los certificados CAE para cumplir su cuota legal. El expediente se inscribe en el registro nacional.',
    icon: Zap,
    positionClass: 'left-[16%] top-1/2 -translate-x-1/2 -translate-y-1/2',
    labelPositionClass: 'top-full mt-1.5 sm:mt-2 left-1/2 -translate-x-1/2',
    arcRotation: 90,
  },
];

const AUTO_ADVANCE_MS = 5000;
const ORBIT_RADIUS = 136;
const QUADRANT_ARC_LENGTH = (2 * Math.PI * ORBIT_RADIUS) / 4;

export default function CaeProcessSection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % CAE_STEPS.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, shouldReduceMotion]);

  const handleSelectStep = (index: number) => {
    setActiveStep(index);
  };

  const currentStepData = CAE_STEPS[activeStep];

  return (
    <section
      id="como-funciona-cae"
      aria-labelledby="cae-section-heading"
      className="relative w-full bg-[#07110d] text-white py-16 sm:py-24 overflow-hidden border-t border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle atmospheric glow aligned with Enerova palette */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[620px] h-[320px] bg-[#76b72f]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[380px] h-[280px] bg-[#024327]/30 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de sección con animación al hacer scroll */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="block text-[#76b72f] font-bold text-xs uppercase tracking-[0.18em] mb-3">
            Programa CAE
          </span>
          <h2
            id="cae-section-heading"
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.12] font-['Outfit'] text-balance"
          >
            ¿Cómo funciona el Programa CAE?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed max-w-xl mx-auto">
            Un mecanismo del sistema CAE que financia el 100 % de las obras de aislamiento térmico.
          </p>
        </motion.div>

        {/* Layout principal: Diagrama circular izquierda + 4 tarjetas sincronizadas derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Columna Izquierda: Diagrama Circular Interactivo */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square mx-auto select-none">
              {/* SVG de Órbita, Flechas direccionales y Arco activo */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="caeActiveArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#76b72f" stopOpacity="0.25" />
                    <stop offset="55%" stopColor="#8fd93f" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#a6e65d" stopOpacity="1" />
                  </linearGradient>
                  <filter id="caeArcGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Anillo exterior base */}
                <circle
                  cx="200"
                  cy="200"
                  r={ORBIT_RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.5"
                />

                {/* Anillo interior técnico sutil */}
                <circle
                  cx="200"
                  cy="200"
                  r="98"
                  fill="none"
                  stroke="rgba(118,183,47,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />

                {/* Flechas direccionales en los puntos medios (45°, 135°, 225°, 315°) */}
                {[
                  { angle: -45, activeAt: 1 },
                  { angle: 45, activeAt: 2 },
                  { angle: 135, activeAt: 3 },
                  { angle: 225, activeAt: 0 },
                ].map((arrow, idx) => {
                  const rad = (arrow.angle * Math.PI) / 180;
                  const x = 200 + ORBIT_RADIUS * Math.cos(rad);
                  const y = 200 + ORBIT_RADIUS * Math.sin(rad);
                  const tangentDeg = arrow.angle + 90;
                  const isArrowActive = activeStep === arrow.activeAt;
                  return (
                    <g
                      key={idx}
                      transform={`translate(${x}, ${y}) rotate(${tangentDeg})`}
                    >
                      <path
                        d="M -4 -4.5 L 2.5 0 L -4 4.5"
                        fill="none"
                        stroke={isArrowActive ? '#a6e65d' : 'rgba(118, 183, 47, 0.55)'}
                        strokeWidth={isArrowActive ? '2.2' : '1.6'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  );
                })}

                {/* Arco animado sincronizado hacia el nodo activo */}
                <g transform={`rotate(${currentStepData.arcRotation} 200 200)`}>
                  <motion.circle
                    key={activeStep}
                    cx="200"
                    cy="200"
                    r={ORBIT_RADIUS}
                    fill="none"
                    stroke="url(#caeActiveArcGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#caeArcGlow)"
                    strokeDasharray={`${QUADRANT_ARC_LENGTH} ${QUADRANT_ARC_LENGTH * 4}`}
                    initial={
                      shouldReduceMotion
                        ? { strokeDashoffset: 0 }
                        : { strokeDashoffset: QUADRANT_ARC_LENGTH }
                    }
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  />
                </g>
              </svg>

              {/* Núcleo Central: Tu vivienda / No pagas nada */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] h-[38%] rounded-full bg-gradient-to-b from-[#0d2219] to-[#08150f] border border-white/15 shadow-[0_0_50px_rgba(2,67,39,0.55)] flex flex-col items-center justify-center text-center px-3">
                <Home className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 mb-1.5" strokeWidth={1.75} />
                <span className="text-xs sm:text-sm font-bold text-white leading-tight font-['Outfit']">
                  Tu vivienda
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-[#8fd93f] mt-0.5 leading-tight">
                  No pagas nada
                </span>
              </div>

              {/* 4 Nodos interactivos alrededor del círculo */}
              {CAE_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelectStep(index)}
                    aria-pressed={isActive}
                    aria-label={`Paso ${step.number}: ${step.nodeLabel}`}
                    className={`absolute ${step.positionClass} group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8fd93f] rounded-full cursor-pointer z-10`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Halo de nodo activo */}
                      {isActive && (
                        <motion.span
                          layoutId="cae-node-halo"
                          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                          className="absolute -inset-2 sm:-inset-2.5 rounded-full bg-[#76b72f]/20 border border-[#76b72f]/50 shadow-[0_0_24px_rgba(118,183,47,0.45)]"
                        />
                      )}

                      {/* Círculo de icono (min 44px touch target) */}
                      <div
                        className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-200 border ${
                          isActive
                            ? 'bg-[#0c2d1d] border-[#8fd93f] text-[#a6e65d] scale-105 shadow-[0_0_16px_rgba(118,183,47,0.35)]'
                            : 'bg-[#0d1914] border-white/15 text-slate-400 group-hover:border-[#76b72f]/60 group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={1.85} />
                      </div>
                    </div>

                    {/* Etiqueta del nodo */}
                    <span
                      className={`absolute ${step.labelPositionClass} whitespace-nowrap text-[11px] sm:text-xs font-semibold tracking-tight transition-colors duration-200 pointer-events-none ${
                        isActive ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {step.nodeLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Columna Derecha: 4 Tarjetas Informativas Sincronizadas */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">
            {CAE_STEPS.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <motion.button
                  key={step.id}
                  type="button"
                  onClick={() => handleSelectStep(index)}
                  aria-pressed={isActive}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : index * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative w-full text-left rounded-[12px] p-5 sm:p-6 transition-all duration-200 overflow-hidden cursor-pointer border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8fd93f] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0d241a] to-[#0a1913] border-[#76b72f]/70 shadow-[0_8px_30px_rgba(2,67,39,0.35)]'
                      : 'bg-[#0b1511]/85 border-white/10 hover:border-white/25 hover:bg-[#0f1d17]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Número del paso */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold tabular-nums flex-shrink-0 transition-colors duration-200 border ${
                        isActive
                          ? 'bg-[#76b72f]/20 border-[#8fd93f] text-[#a6e65d]'
                          : 'bg-white/5 border-white/15 text-slate-400'
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Título y descripción */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-base sm:text-lg font-bold font-['Outfit'] tracking-tight transition-colors duration-200 ${
                          isActive ? 'text-white' : 'text-slate-100'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed mt-1.5 transition-colors duration-200 ${
                          isActive ? 'text-slate-200' : 'text-slate-400'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Barra inferior de progreso sincronizada (solo en la tarjeta activa) */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10">
                      {shouldReduceMotion || isPaused ? (
                        <div className="h-full w-full bg-gradient-to-r from-[#76b72f] to-[#a6e65d]" />
                      ) : (
                        <motion.div
                          key={`progress-${activeStep}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                          className="h-full w-full origin-left bg-gradient-to-r from-[#76b72f] to-[#a6e65d]"
                        />
                      )}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
