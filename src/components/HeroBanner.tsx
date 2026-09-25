import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, SunMedium } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import heroImg from '../assets/images/hero_dorio_lifestyle_1790351481346.jpg';

export const HeroBanner: React.FC = () => {
  const { setActiveCategory } = useStore();

  const scrollToCatalog = (category: 'todos' | 'solar' | 'grau') => {
    setActiveCategory(category);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-stone-900 text-white">
      {/* Background Image Container with Measured Contrast Scrim */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
        <img
          src={heroImg}
          alt="Campanha Do Rio Sungless na praia de Ipanema"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
          loading="eager"
        />

        {/* Cinematic Gradient Scrim (WCAG AA compliant contrast) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Editorial Tagline */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-amber-300">
              <SunMedium className="w-4 h-4 text-amber-400" />
              <span>Conceito 100% Carioca · Coleção 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance">
              SEU ESTILO. <br />
              <span className="text-stone-300">SEU OLHAR.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-stone-200 font-light leading-relaxed max-w-xl">
              Óculos com personalidade, lentes polarizadas e design autoral direto das praias do Rio de Janeiro para você.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToCatalog('solar')}
                className="inline-flex items-center justify-center gap-3 bg-white text-stone-950 font-bold px-8 py-4 rounded-full hover:bg-stone-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm tracking-wider uppercase"
              >
                <span>Comprar Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToCatalog('grau')}
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-medium border border-white/40 px-6 py-4 rounded-full transition-colors text-sm tracking-wide"
              >
                <span>Conhecer Óculos de Grau</span>
              </button>
            </div>

            {/* Social community badge */}
            <div className="pt-2 text-xs text-stone-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Mais de <strong>7.400 cariocas</strong> e apaixonados pelo sol usam @doriosungless</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Pillars Ribbon */}
      <div className="bg-[#121212] border-t border-stone-800 text-stone-300 text-xs py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white text-sm">100% UV400</p>
              <p className="text-[11px] text-stone-400">Proteção máxima contra raios solares</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Truck className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <p className="font-semibold text-white text-sm">Entrega em Casa</p>
              <p className="text-[11px] text-stone-400">Frete grátis para todo o Brasil &gt; R$199</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <RefreshCw className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-white text-sm">Troca Descomplicada</p>
              <p className="text-[11px] text-stone-400">Até 30 dias para troca sem burocracia</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <span className="text-xl">🌊</span>
            <div>
              <p className="font-semibold text-white text-sm">Conceito 100% Carioca</p>
              <p className="text-[11px] text-stone-400">Estilo de vida, praia e atitude</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
