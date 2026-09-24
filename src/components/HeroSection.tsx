import React, { useState, useEffect, useRef } from 'react';
import { Shield, Sparkles, TrendingDown, Award, CheckCircle } from 'lucide-react';
import FunnelForm from './FunnelForm';
import FloatingScrollButton from './FloatingScrollButton';
import { APP_CONFIG } from '../config';

interface HeroSectionProps {
  desktopVideoUrl?: string;
  mobileVideoUrl?: string;
  posterUrl?: string;
}

export default function HeroSection({
  desktopVideoUrl = APP_CONFIG.desktopVideoUrl,
  mobileVideoUrl = APP_CONFIG.mobileVideoUrl,
  posterUrl = APP_CONFIG.fallbackPosterUrl,
}: HeroSectionProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Detección reactiva de vista PC vs Celular para conmutar la URL del video
  useEffect(() => {
    const checkIsMobile = () => {
      const mobileQuery = window.matchMedia('(max-width: 767px)').matches;
      setIsMobile(mobileQuery);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Seleccionar la URL del video según la pantalla (PC vs Celular)
  const activeVideoUrl = isMobile ? mobileVideoUrl : desktopVideoUrl;

  // Intentar autoreproducir el video silencioso
  useEffect(() => {
    setVideoLoaded(false);
    setVideoError(false);

    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay silenciado fue pausado por política de ahorro del navegador
          console.debug('Autoplay restringido por el navegador, mostrando fallback de video');
        });
      }
    }
  }, [activeVideoUrl]);

  return (
    <section id="hero-section" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-12 lg:py-16">
      {/* 1. CAPA DE VIDEO EN LOOP (PC vs CELULAR) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#024327]">
        {/* Imagen póster de respaldo en caso de carga o ahorro de datos */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${posterUrl})`,
            opacity: videoLoaded ? 0.3 : 1,
          }}
        />

        {/* Video en loop conmutado por URL (PC / Celular) */}
        {!videoError && (
          <video
            ref={videoRef}
            key={isMobile ? 'mobile-video' : 'desktop-video'}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src={activeVideoUrl} type="video/mp4" />
          </video>
        )}

        {/* 2. GRADIENTE DELANTE DEL VIDEO (Toque empresarial y contraste perfecto) */}
        {/* Usamos Verde Oscuro #024327 con transiciones suaves para alta legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#024327]/90 via-[#024327]/82 to-[#012616]/95 backdrop-blur-[1px]" />
        
        {/* Toque de luz verde claro #76b72f ambiental en esquinas */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#76b72f]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#76b72f]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 3. CONTENIDO HERO: TEXTOS PERSUASIVOS + FORMULARIO CARD */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Columna Izquierda: Mensajes de alto impacto y propuesta de valor */}
          <div className="lg:col-span-6 text-white space-y-6 text-center lg:text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#a3e658] text-xs sm:text-sm font-semibold shadow-sm">
              
              <span>Aislamiento termico de Alta Eficiencia</span>
            </div>

            {/* Titular Principal */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] font-['Outfit']">
             Solicita el aislamiento de tu buhardilla{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6e65d] to-[#76b72f]">
                100% subvencionado
              </span>{' '}
              por CAEs
            </h1>

            {/* Descripción */}
            <p className="text-base sm:text-lg text-emerald-100/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Ahorra en tus facturas de energía, mejora el confort de tu vivienda y aumenta su valor gracias a un mejor aislamiento. Además, podrás obtener tu Certificado de Ahorro Energético (CAE).
            </p>

            {/* Puntos destacados con verificación */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-2.5 bg-white/5 backdrop-blur-sm p-3 rounded-[12px] border border-white/10">
                <CheckCircle className="w-5 h-5 text-[#76b72f] flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="block text-white font-bold">Instalación Rapida</strong>
                  <span className="text-emerald-200/80 text-xs">Instalación profesional y segura en pocos días</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white/5 backdrop-blur-sm p-3 rounded-[12px] border border-white/10">
                <TrendingDown className="w-5 h-5 text-[#76b72f] flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="block text-white font-bold">Ahorra en tu recibo de luz</strong>
                  <span className="text-emerald-200/80 text-xs">Reduce el consumo energético de la calefacción y el aire acondicionado </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white/5 backdrop-blur-sm p-3 rounded-[12px] border border-white/10">
                <Award className="w-5 h-5 text-[#76b72f] flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="block text-white font-bold">Te entregamos tu Certificado CAE</strong>
                  <span className="text-emerald-200/80 text-xs">Revalorice su propiedad y aumenta su valor</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white/5 backdrop-blur-sm p-3 rounded-[12px] border border-white/10">
                <Shield className="w-5 h-5 text-[#76b72f] flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="block text-white font-bold">Confort térmico todo el año</strong>
                  <span className="text-emerald-200/80 text-xs">Despídete del frío en invierno y del calor en verano.</span>
                </div>
              </div>
            </div>

            {/* Indicador de vista de video para el usuario */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-emerald-200/60 pt-2">
              <span className="w-2 h-2 rounded-full bg-[#76b72f] animate-pulse" />
              <span>UN AISLAMIENTO TÉRMICO INTERIOR DE ALTA EFICIENCIA </span>
            </div>
          </div>

          {/* Columna Derecha: Formulario por Pasos (Funnel Card) */}
          <div id="formulario-solicitud" className="lg:col-span-6 w-full flex justify-center scroll-mt-6 sm:scroll-mt-10">
            <FunnelForm />
          </div>

        </div>
      </div>

      {/* Botón flotante exclusivo para vista de celular */}
      <FloatingScrollButton />
    </section>
  );
}
