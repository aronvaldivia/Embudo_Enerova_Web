import { useState } from 'react';
import { Phone, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from '../config';

export default function Header() {
  const [imgError, setImgError] = useState(false);
  const currentLogo = APP_CONFIG.headerLogoUrl;

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 w-full shadow-md bg-gradient-to-r from-[#024327] via-[#035431] to-[#012f1b] border-b border-[#76b72f]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Solo la imagen del logo, sin marcos, sin bordes, sin textos */}
        <div className="flex items-center">
          {!imgError ? (
            <img
              src={currentLogo}
              alt={APP_CONFIG.brandName}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-24 sm:h-24 w-auto object-contain"
            />
          ) : (
            <span className="text-white text-xl font-bold font-['Outfit']">
              {APP_CONFIG.brandName}
            </span>
          )}
        </div>

        {/* Right side contact */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex flex-col items-end text-right">
            <span className="text-emerald-200 text-xs uppercase tracking-wider font-semibold">
              Solicita tu Evaluacion
            </span>
            <a
              href={`tel:${APP_CONFIG.supportPhone.replace(/\s+/g, '')}`}
              className="text-white font-bold text-sm sm:text-base hover:text-[#76b72f] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-[#76b72f]" />
              {APP_CONFIG.supportPhone}
            </a>
          </div>

          {/* Quick Contact CTA for Mobile / Desktop */}
          <a
            href={`tel:${APP_CONFIG.supportPhone.replace(/\s+/g, '')}`}
            className="md:hidden p-2.5 rounded-[10px] bg-white/10 text-white hover:bg-white/20 border border-white/10 transition"
            aria-label="Llamar"
          >
            <Phone className="w-4 h-4 text-[#76b72f]" />
          </a>
        </div>
      </div>
    </header>
  );
}
