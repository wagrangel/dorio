import React from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

import heroImg from '../assets/images/hero_dorio_lifestyle_1790351481346.jpg';
import ipanemaImg from '../assets/images/product_sunglasses_ipanema_1790351493362.jpg';
import arpoadorImg from '../assets/images/product_sunglasses_arpoador_1790351507544.jpg';
import leblonImg from '../assets/images/product_optical_leblon_1790351518971.jpg';
import conceptImg from '../assets/images/concept_carioca_lifestyle_1790351534780.jpg';

export const InstagramFeed: React.FC = () => {
  const { settings } = useStore();

  const posts = [
    {
      image: heroImg,
      likes: '482',
      comments: '34',
      caption: 'Golden hour em Ipanema com o clássico Black Polarized. ☀️🌊 #DoRioPeloMundo',
    },
    {
      image: ipanemaImg,
      likes: '319',
      comments: '18',
      caption: 'Detalhes que importam: acetato maciço polido à mão e proteção 100% UV400.',
    },
    {
      image: arpoadorImg,
      likes: '562',
      comments: '41',
      caption: 'Arpoador Sunset Havana. A cor do verão já tem dono. 🔥 #doriosungless',
    },
    {
      image: leblonImg,
      likes: '287',
      comments: '22',
      caption: 'Leveza pura. 19 gramas de design transparente para quem usa óculos de grau.',
    },
    {
      image: conceptImg,
      likes: '694',
      comments: '58',
      caption: 'Viver o Rio é enxergar cada cantinho sob uma nova perspectiva. 🌴',
    },
  ];

  return (
    <section className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-stone-200/70 px-3.5 py-1 rounded-full text-xs font-semibold text-stone-800 mb-3">
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span>{settings.instagramHandle} · {settings.instagramFollowers} seguidores</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#121212] tracking-tight">
            VIVA O ESTILO DO RIO
          </h2>

          <p className="text-stone-600 text-sm mt-3">
            Siga a gente no Instagram e descubra nossos modelos, lançamentos exclusivos e a rotina sob o sol carioca.
          </p>

          <div className="mt-5">
            <a
              href="https://instagram.com/doriosungless"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#121212] hover:bg-black text-white font-semibold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-transform hover:scale-105"
            >
              <span>Seguir no Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Instagram Grid Showcase */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href="https://instagram.com/doriosungless"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-stone-200 shadow-xs hover:shadow-lg transition-all"
            >
              <img
                src={post.image}
                alt="Post instagram Do Rio Sungless"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Hover overlay with likes and comment counts */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-white text-center">
                <div className="flex items-center gap-4 text-xs font-bold mb-2">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>{post.comments}</span>
                  </span>
                </div>
                <p className="text-[10px] text-stone-200 line-clamp-2 italic">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
