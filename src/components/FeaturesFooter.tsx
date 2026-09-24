import { PiggyBank, Building, TrendingUp, Mail, Phone, Clock, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from '../config';

export default function FeaturesFooter() {
  return (
    <footer id="main-footer" className="w-full bg-[#f1f6ef] border-t border-slate-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la Sección de Características */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#024327] font-bold text-xs uppercase tracking-widest bg-[#76b72f]/20 px-3 py-1 rounded-full border border-[#76b72f]/30">
            ¿Por qué aislar con Enerova?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#024327] mt-3 font-['Outfit']">
            Ventajas del Aislamiento Térmico de Alta Eficiencia
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            La forma más inteligente, económica y limpia de confort térmico para su hogar sin obras complejas.
          </p>
        </div>

        {/* 3 CARACTERÍSTICAS OBLIGATORIAS ESPECIFICADAS POR EL USUARIO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          
          {/* CARACTERÍSTICA 1: REDUZCA SUS FACTURAS */}
          <div
            id="card-reduzca-facturas"
            className="bg-white rounded-[12px] p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-[12px] bg-emerald-50 text-[#024327] flex items-center justify-center mb-5 group-hover:bg-[#76b72f] group-hover:text-white transition-colors duration-300">
                <PiggyBank className="w-7 h-7 text-[#024327] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#024327] mb-3 font-['Outfit'] uppercase tracking-wide">
                REDUZCA SUS FACTURAS
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ahorre hasta un 25% en sus facturas de energía gracias a un aislamiento interior de alta eficiencia.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#024327]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#76b72f] mr-2" />
              Retorno de inversión garantizado
            </div>
          </div>

          {/* CARACTERÍSTICA 2: SOLUCIÓN ADAPTADA */}
          <div
            id="card-solucion-adaptada"
            className="bg-white rounded-[12px] p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-[12px] bg-emerald-50 text-[#024327] flex items-center justify-center mb-5 group-hover:bg-[#76b72f] group-hover:text-white transition-colors duration-300">
                <Building className="w-7 h-7 text-[#024327] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#024327] mb-3 font-['Outfit'] uppercase tracking-wide">
                SOLUCIÓN ADAPTADA
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Un buen aislamiento ayuda a mantener una temperatura más estable y a reducir el gasto energético en invierno y verano.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#024327]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#76b72f] mr-2" />
              Aumenta el valor de tu inmueble 
            </div>
          </div>

          {/* CARACTERÍSTICA 3: VALORICE SU INMUEBLE */}
          <div
            id="card-valorice-inmueble"
            className="bg-white rounded-[12px] p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-[12px] bg-emerald-50 text-[#024327] flex items-center justify-center mb-5 group-hover:bg-[#76b72f] group-hover:text-white transition-colors duration-300">
                <TrendingUp className="w-7 h-7 text-[#024327] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#024327] mb-3 font-['Outfit'] uppercase tracking-wide">
                VALORICE SU INMUEBLE
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mejore su certificado energético y aumente el valor de su inmueble.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#024327]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#76b72f] mr-2" />
              Mayor tasación y confort inmediato
            </div>
          </div>

        </div>

        {/* Separador */}
        <hr className="border-slate-200 mb-10" />

        {/* Bloque Corporativo & Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-[#024327] font-['Outfit'] tracking-tight">
                {APP_CONFIG.brandName}
              </span>
              <span className="text-xs bg-[#76b72f]/20 text-[#024327] font-bold px-2 py-0.5 rounded-full">
                Energía Limpia
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Especialistas en soluciones de aislamiento térmico de alta densidad para hogares y comunidades. Confort térmico, ahorro energético y gestión integral de ayudas.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#76b72f]" />
              <span>Instaladores oficiales homologados • Materiales 100% ignífugos y sostenibles</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#024327] uppercase tracking-wider mb-3">
              Contacto Directo
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li>
                <a
                  href={`mailto:${APP_CONFIG.adminEmail}`}
                  className="hover:text-[#024327] font-medium flex items-center gap-2 text-[#024327]"
                >
                  <Mail className="w-4 h-4 text-[#76b72f]" />
                  <span>{APP_CONFIG.adminEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${APP_CONFIG.supportPhone.replace(/\s+/g, '')}`}
                  className="hover:text-[#024327] font-medium flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#76b72f]" />
                  <span>{APP_CONFIG.supportPhone}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <Clock className="w-4 h-4 text-[#76b72f]" />
                <span>{APP_CONFIG.supportHours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#024327] uppercase tracking-wider mb-3">
              Garantía y Confianza
            </h4>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Instalaciones homologadas con certificación oficial, materiales de máxima calidad y tramitación de subvenciones de eficiencia energética.
            </p>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {APP_CONFIG.brandName}. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span className="hover:text-[#024327] cursor-pointer">Aviso Legal</span>
            <span className="hover:text-[#024327] cursor-pointer">Política de Privacidad</span>
            <span className="hover:text-[#024327] cursor-pointer">Cookies</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
