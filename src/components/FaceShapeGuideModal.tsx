import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Glasses } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FaceShape } from '../types';

type SpecificFaceShape = 'oval' | 'redondo' | 'quadrado' | 'coracao';

export const FaceShapeGuideModal: React.FC = () => {
  const { 
    isFaceGuideOpen, 
    setIsFaceGuideOpen, 
    setSelectedFaceShape,
    setActiveCategory,
    products,
    setSelectedProduct
  } = useStore();

  const [activeTab, setActiveTab] = useState<SpecificFaceShape>('oval');

  if (!isFaceGuideOpen) return null;

  const shapeGuides: Record<Exclude<FaceShape, 'todos'>, {
    title: string;
    description: string;
    idealFrames: string;
    avoidFrames: string;
    icon: string;
  }> = {
    oval: {
      title: 'Rosto Oval',
      description: 'Proporções equilibradas com maçãs do rosto ligeiramente mais largas e queixo suave.',
      idealFrames: 'Quase todos os formatos! Quadrados, geométricos e aviadores ficam perfeitos.',
      avoidFrames: 'Armações excessivamente grandes que ultrapassem muito a largura da têmpora.',
      icon: '📐',
    },
    redondo: {
      title: 'Rosto Redondo',
      description: 'Largura e comprimento similares, com ângulos suaves e queixo arredondado.',
      idealFrames: 'Armações quadradas, retangulares e com linhas retas para contrastar e alongar.',
      avoidFrames: 'Modelos redondos pequenos que acentuam a circularidade da face.',
      icon: '⭕',
    },
    quadrado: {
      title: 'Rosto Quadrado',
      description: 'Mandíbula bem definida, testa larga e proporções angulares marcantes.',
      idealFrames: 'Modelos redondos, ovais e aviador com hastes finas para suavizar os traços fortes.',
      avoidFrames: 'Modelos estritamente retangulares ou com ângulos retos muito pesados.',
      icon: '⏹️',
    },
    coracao: {
      title: 'Rosto Coração / Triangular',
      description: 'Testa mais larga com queixo fino ou pontiagudo estilo coração.',
      idealFrames: 'Aviadores, redondos sutis e armações com detalhes na parte inferior.',
      avoidFrames: 'Armações com topos muito pesados ou ornamentos volumosos na parte superior.',
      icon: '🤍',
    },
  };

  const handleApplyFilter = (shape: FaceShape) => {
    setSelectedFaceShape(shape);
    setActiveCategory('todos');
    setIsFaceGuideOpen(false);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Find products recommended for activeTab
  const recommendedModels = products.filter(
    p => p.recommendedFaceShapes.includes(activeTab) || p.recommendedFaceShapes.includes('todos')
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-stone-900">
                Guia de Estilo & Formato de Rosto
              </h3>
              <p className="text-xs text-stone-500">
                Descubra qual armação Do Rio valoriza melhor seus traços
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFaceGuideOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Face selector tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['oval', 'redondo', 'quadrado', 'coracao'] as const).map((shape) => (
              <button
                key={shape}
                type="button"
                onClick={() => setActiveTab(shape)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  activeTab === shape
                    ? 'border-black bg-stone-900 text-white shadow-sm'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div className="text-xl mb-1">{shapeGuides[shape].icon}</div>
                <div className="text-xs font-bold capitalize">{shapeGuides[shape].title}</div>
              </button>
            ))}
          </div>

          {/* Detailed Info Card */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3">
            <h4 className="font-display font-bold text-stone-900 text-base flex items-center gap-2">
              <span>{shapeGuides[activeTab].title}</span>
              <span className="text-xs font-normal text-stone-500">· Características</span>
            </h4>

            <p className="text-stone-600 text-sm leading-relaxed">
              {shapeGuides[activeTab].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-emerald-50 border border-emerald-200/60 p-3 rounded-lg text-emerald-900">
                <span className="font-bold flex items-center gap-1 mb-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Modelos Recomendados:
                </span>
                <p>{shapeGuides[activeTab].idealFrames}</p>
              </div>

              <div className="bg-amber-50 border border-amber-200/60 p-3 rounded-lg text-amber-900">
                <span className="font-bold flex items-center gap-1 mb-1">
                  <Glasses className="w-3.5 h-3.5 text-amber-600" />
                  Dica de Proporção:
                </span>
                <p>{shapeGuides[activeTab].avoidFrames}</p>
              </div>
            </div>
          </div>

          {/* Recommended Models from store */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-3">
              Modelos Do Rio perfeitos para este formato:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recommendedModels.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    setIsFaceGuideOpen(false);
                    setSelectedProduct(prod);
                  }}
                  className="group cursor-pointer border border-stone-200 rounded-xl p-3 bg-white hover:border-stone-400 transition-all flex items-center gap-3 sm:flex-col sm:text-center"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-16 h-12 sm:w-full sm:h-24 object-cover rounded-lg bg-stone-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-xs text-stone-900 line-clamp-1 group-hover:text-amber-800">
                      {prod.name}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      R$ {prod.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA: Filter store with this shape */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleApplyFilter(activeTab)}
              className="w-full bg-[#121212] hover:bg-black text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <span>Ver todos os modelos para {shapeGuides[activeTab].title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
