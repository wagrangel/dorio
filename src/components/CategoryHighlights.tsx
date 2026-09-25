import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

import ipanemaImg from '../assets/images/product_sunglasses_ipanema_1790351493362.jpg';
import leblonImg from '../assets/images/product_optical_leblon_1790351518971.jpg';
import arpoadorImg from '../assets/images/product_sunglasses_arpoador_1790351507544.jpg';

export const CategoryHighlights: React.FC = () => {
  const { setActiveCategory } = useStore();

  const handleSelect = (category: ProductCategory) => {
    setActiveCategory(category);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    {
      id: 'solar' as ProductCategory,
      title: 'Óculos de Sol',
      subtitle: 'Lentes polarizadas com proteção UV400 para curtir a orla.',
      image: ipanemaImg,
      badge: 'Mais Desejados',
    },
    {
      id: 'grau' as ProductCategory,
      title: 'Óculos de Grau',
      subtitle: 'Armações anatômicas leves em TR90 e acetato para sua receita.',
      image: leblonImg,
      badge: 'Conforto & Estilo',
    },
    {
      id: 'lancamento' as ProductCategory,
      title: 'Lançamentos',
      subtitle: 'Edições limitadas com paleta inspirada no verão carioca.',
      image: arpoadorImg,
      badge: 'Nova Coleção',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase block mb-2">
              Encontre Seu Estilo
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#121212] tracking-tight">
              CATEGORIAS EM DESTAQUE
            </h2>
          </div>
          <p className="text-stone-600 text-sm max-w-md mt-3 md:mt-0">
            Armações pensadas para acompanhar o ritmo da praia ao happy hour com design leve e duradouro.
          </p>
        </div>

        {/* 3 Categories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-stone-100 border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-end min-h-[380px] sm:min-h-[420px]"
            >
              {/* Product/Category Photography */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Gradient scrim for readable text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              {/* Content Box */}
              <div className="relative p-6 sm:p-8 z-10 text-white flex flex-col justify-end">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-300 mb-1">
                  {cat.badge}
                </span>

                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-stone-200 transition-colors">
                    {cat.title}
                  </h3>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-stone-300 text-xs mt-2 line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-white/20 text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1 group-hover:text-white">
                  <span>Explorar Coleção</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
