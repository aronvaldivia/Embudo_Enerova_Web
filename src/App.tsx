import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhyEnerovaSection from './components/WhyEnerovaSection';
import CaeProcessSection from './components/CaeProcessSection';
import SolutionsBeforeAfterSection from './components/SolutionsBeforeAfterSection';
import FeaturesFooter from './components/FeaturesFooter';
import { APP_CONFIG } from './config';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf7] text-slate-800 selection:bg-[#76b72f]/30 selection:text-[#024327]">
      {/* 1. Header con barra en gradiente y logo */}
      <Header />

      {/* 2. Sección Hero con Video en loop (PC vs Celular), Gradiente frontal y Formulario Funnel por Pasos */}
      <main className="flex-1">
        <HeroSection
          desktopVideoUrl={APP_CONFIG.desktopVideoUrl}
          mobileVideoUrl={APP_CONFIG.mobileVideoUrl}
        />

        {/* 3. Sección clara: ¿Por qué Enerova? con video vertical 1080x1920 */}
        <WhyEnerovaSection />

        {/* 4. Sección interactiva: ¿Cómo funciona el Programa CAE? */}
        <CaeProcessSection />

        {/* 5. Sección comparador Antes y Después del aislamiento */}
        <SolutionsBeforeAfterSection />
      </main>

      {/* 6. Footer con las 3 características obligatorias del servicio e información corporativa */}
      <FeaturesFooter />
    </div>
  );
}
