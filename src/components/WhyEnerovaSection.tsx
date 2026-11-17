import { useState } from 'react';
import { ArrowRight, ShieldCheck, Wallet, Zap, Star, VideoOff } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { APP_CONFIG } from '../config';

const TRUST_METRICS = [
  {
    value: '4.500+',
    label: 'instalaciones',
    sublabel: 'en toda España',
    hasStar: false,
  },
  {
    value: '2025',
    label: 'sociedad',
    sublabel: 'constituida',
    hasStar: false,
  },
  {
    value: '4,9',
    label: 'Google Maps',
    sublabel: '1.800+ opiniones',
    hasStar: true,
  },
];

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Programa regulado',
    description:
      'Programa CAE 100 % regulado, con verificación independiente del expediente en cada instalación.',
  },
  {
    icon: Wallet,
    title: 'Sin adelantar nada',
    description:
      'Las energéticas financian el 100 % de la instalación. Tú no pones dinero ni firmas ningún préstamo.',
  },
  {
    icon: Zap,
    title: 'Instalación en 2 horas',
    description:
      'Sin obras, sin requisitos de ingresos y sin trámites: nosotros gestionamos toda la documentación.',
  },
];

export default function WhyEnerovaSection() {
  const [videoError, setVideoError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    APP_CONFIG.whatsappMessage
  )}`;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="por-que-enerova"
      aria-labelledby="why-enerova-heading"
      className="relative w-full bg-[#f8faf7] text-slate-900 py-16 sm:py-24 border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bloque superior: Columna de texto y métricas + Video vertical 1080x1920 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Columna Izquierda */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {/* Eyebrow kicker con línea */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] bg-[#024327]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#024327]">
                ¿Por qué Enerova?
              </span>
            </div>

            {/* Titular principal */}
            <h2
              id="why-enerova-heading"
              className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-950 tracking-tight leading-[1.12] font-['Outfit'] text-balance max-w-xl"
            >
              La empresa en la que{' '}
              <span className="text-[#26731f]">miles de hogares</span> ya confían
            </h2>

            {/* Párrafo descriptivo */}
            <p className="text-slate-600 text-base sm:text-[17px] leading-relaxed mt-5 max-w-xl">
              Empresa registrada, expediente auditado de forma independiente y miles de
              instalaciones reales en toda España. Esto es lo que nos respalda.
            </p>

            {/* 3 Tarjetas de métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-7 max-w-xl">
              {TRUST_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-[12px] p-4 shadow-xs"
                >
                  <div className="flex items-center gap-1 text-2xl sm:text-[28px] font-extrabold text-[#024327] font-['Outfit'] tabular-nums leading-none">
                    <span>{metric.value}</span>
                    {metric.hasStar && (
                      <Star
                        className="w-5 h-5 text-[#76b72f] fill-[#76b72f] inline-block -mt-0.5"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-2">{metric.label}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{metric.sublabel}</p>
                </div>
              ))}
            </div>

            {/* Nota de respaldo normativa */}
            <p className="text-xs text-slate-500 mt-5">
              Instalaciones homologadas conforme a la normativa oficial del Sistema CAE en España.
            </p>

            {/* Enlaces rápidos de navegación */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 mt-4">
              <button
                type="button"
                onClick={() => scrollToSection('como-funciona-cae')}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#024327] hover:text-[#26731f] transition-colors cursor-pointer group"
              >
                <span>¿Cómo funciona el CAE?</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('formulario-solicitud')}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#024327] hover:text-[#26731f] transition-colors cursor-pointer group"
              >
                <span>Solicitar evaluación</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('main-footer')}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#024327] hover:text-[#26731f] transition-colors cursor-pointer group"
              >
                <span>Ventajas Enerova</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#024327] hover:text-[#26731f] transition-colors group"
              >
                <span>Consultar por WhatsApp</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Columna Derecha: Video vertical 1080 x 1920 (9:16) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[330px] lg:max-w-[345px] aspect-[9/16] rounded-[16px] overflow-hidden bg-[#024327] border border-slate-200 shadow-[0_20px_50px_rgba(2,67,39,0.16)]">
              {APP_CONFIG.trustVideoUrl && !videoError ? (
                <video
                  src={APP_CONFIG.trustVideoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  onError={() => setVideoError(true)}
                  aria-label="Video explicativo sobre las instalaciones de Enerova"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#024327] to-[#012817] text-white">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                    <VideoOff className="w-6 h-6 text-[#a6e65d]" />
                  </div>
                  <p className="text-sm font-bold font-['Outfit']">
                    Video vertical 1080 × 1920
                  </p>
                  <p className="text-xs text-emerald-100/80 mt-1">
                    Configura la URL en <code className="font-mono">trustVideoUrl</code> dentro de{' '}
                    <code className="font-mono">src/config.ts</code>.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Fila inferior: 3 tarjetas informativas de garantías */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-14 sm:mt-16">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white border border-slate-200/90 rounded-[12px] p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#76b72f]/60 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-[10px] bg-[#76b72f]/15 text-[#024327] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" strokeWidth={1.85} />
                </div>
                <h3 className="text-lg font-bold text-[#024327] font-['Outfit'] tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
