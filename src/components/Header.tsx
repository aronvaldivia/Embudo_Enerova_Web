import { useState } from 'react';
import { APP_CONFIG } from '../config';

export default function Header() {
  const [imgError, setImgError] = useState(false);
  const currentLogo = APP_CONFIG.headerLogoUrl;
  const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    APP_CONFIG.whatsappMessage
  )}`;

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 w-full shadow-md bg-gradient-to-r from-[#024327] via-[#035431] to-[#012f1b] border-b border-[#76b72f]/20"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2">
        {/* Solo la imagen del logo, sin marcos, sin bordes, sin textos */}
        <div className="flex items-center flex-shrink-0">
          {!imgError ? (
            <img
              src={currentLogo}
              alt={APP_CONFIG.brandName}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-14 sm:h-18 max-w-[130px] sm:max-w-none w-auto object-contain"
            />
          ) : (
            <span className="text-white text-lg sm:text-xl font-bold font-['Outfit']">
              {APP_CONFIG.brandName}
            </span>
          )}
        </div>

        {/* Botón WhatsApp de contacto directo */}
        <div className="flex items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-header-whatsapp"
            aria-label="Consultar por WhatsApp al +34 637 75 77 69"
            className="group flex items-center gap-1.5 sm:gap-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 border border-white/25 flex-shrink-0"
          >
            <img
              src={APP_CONFIG.whatsappIconUrl}
              alt="WhatsApp"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0 transition-transform group-hover:scale-110"
            />
            <span className="font-['Outfit'] tracking-tight whitespace-nowrap">
              Consultar por WhatsApp
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
