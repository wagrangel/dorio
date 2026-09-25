import React from 'react';
import { ArrowRight, Compass, Shield, HeartHandshake } from 'lucide-react';
import conceptImg from '../assets/images/concept_carioca_lifestyle_1790351534780.jpg';

export const BrandConcept: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#121212] text-white relative overflow-hidden">
      {/* Subtle ocean decorative glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with natural warm sunlight & Rio lifestyle */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
              <img
                src={conceptImg}
                alt="Estilo de vida Do Rio Sungless nas praias cariocas"
                className="w-full aspect-[4/3] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
                  Ipanema · Arpoador · Leblon
                </p>
                <p className="text-stone-200 text-sm font-light italic">
                  "Onde o sol se põe com aplausos e cada olhar conta uma história."
                </p>
              </div>
            </div>

            {/* Decorative offset card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-stone-900/90 backdrop-blur-md border border-stone-700 p-4 rounded-xl shadow-xl max-w-xs">
              <div className="flex items-center gap-3">
                <span className="text-2xl">☀️</span>
                <div>
                  <p className="text-xs font-bold text-white tracking-wide uppercase">Autenticidade Carioca</p>
                  <p className="text-[11px] text-stone-400">Projetado sob a luz mais intensa do Brasil.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Brand Manifesto */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-amber-400 uppercase">
              <span>Manifesto da Marca</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              100% CARIOCA. <br />
              <span className="text-stone-400">FEITO PARA O MUNDO.</span>
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              A <strong>Do Rio Sungless</strong> nasceu para quem enxerga a vida de um jeito diferente. 
              Para quem não abre mão da elegância descontraída, da luz natural do dia e daquela sensação 
              única de pés na areia e brisa do mar.
            </p>

            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Combinamos acetato nobre de alto padrão, lentes polarizadas com proteção total UV400 e armações de grau anatômicas. Estilo, atitude e aquele toque carioca que combina com qualquer lugar do planeta.
            </p>

            {/* 3 Pillars */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-400">
                  <Compass className="w-4 h-4" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Design Autoral</span>
                </div>
                <p className="text-stone-400 text-xs">Modelos ergonômicos desenhados para não pesar no rosto.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sky-400">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Óptica Superior</span>
                </div>
                <p className="text-stone-400 text-xs">Lentes certificadas que anulam o brilho intenso da água.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400">
                  <HeartHandshake className="w-4 h-4" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Atendimento Rio</span>
                </div>
                <p className="text-stone-400 text-xs">Suporte direto pelo WhatsApp com o time da marca.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-3 bg-white text-stone-950 font-bold px-8 py-3.5 rounded-full hover:bg-stone-200 transition-colors text-xs tracking-wider uppercase"
              >
                <span>Conheça a Coleção Completa</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
