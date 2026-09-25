import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductCategory, FaceShape } from '../types';
import { Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { 
    products, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    selectedFaceShape,
    setSelectedFaceShape,
    setIsFaceGuideOpen
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (activeCategory !== 'todos' && product.category !== activeCategory) {
        return false;
      }

      // Face shape filter
      if (selectedFaceShape !== 'todos') {
        if (!product.recommendedFaceShapes.includes(selectedFaceShape) && !product.recommendedFaceShapes.includes('todos')) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesMaterial = product.material.toLowerCase().includes(query);
        const matchesColor = product.colors.some(c => c.name.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesMaterial && !matchesColor) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first, then bestsellers
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeCategory, selectedFaceShape, searchQuery, sortBy]);

  const categories: { id: ProductCategory | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todos os Modelos' },
    { id: 'solar', label: 'Óculos de Sol' },
    { id: 'grau', label: 'Óculos de Grau' },
    { id: 'lancamento', label: 'Lançamentos' },
    { id: 'acessorio', label: 'Cases & Acessórios' },
  ];

  const faceShapes: { id: FaceShape; label: string }[] = [
    { id: 'todos', label: 'Todos os Rostos' },
    { id: 'oval', label: 'Rosto Oval' },
    { id: 'redondo', label: 'Rosto Redondo' },
    { id: 'quadrado', label: 'Rosto Quadrado' },
    { id: 'coracao', label: 'Rosto Coração' },
  ];

  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
            Coleção Oficial Do Rio
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#121212] tracking-tight mt-1">
            SEU PRÓXIMO ÓCULOS
          </h2>
          <p className="text-stone-600 text-sm mt-3">
            Escolha entre solares com proteção UV400 ou armações leves para lentes de grau.
          </p>
        </div>

        {/* Category Segmented Controls (Interactive Filter buttons as per constitution) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#121212] text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter Bar: Face Shape & Sort & Search Alert */}
        <div className="bg-stone-50 rounded-2xl p-4 mb-10 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Face Shape Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Rosto:</span>
            </span>
            {faceShapes.map((shape) => (
              <button
                key={shape.id}
                type="button"
                onClick={() => setSelectedFaceShape(shape.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedFaceShape === shape.id
                    ? 'bg-white text-stone-950 font-bold shadow-xs border border-stone-300'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/60'
                }`}
              >
                {shape.label}
              </button>
            ))}
          </div>

          {/* Right actions: Guia de Rosto link + Sort dropdown */}
          <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-stone-200">
            <button
              type="button"
              onClick={() => setIsFaceGuideOpen(true)}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dúvida no formato? Use o Guia</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 hidden sm:inline">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
              >
                <option value="featured">Destaques</option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
                <option value="rating">Mais Avaliados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active search filter feedback */}
        {(searchQuery || selectedFaceShape !== 'todos' || activeCategory !== 'todos') && (
          <div className="mb-6 flex items-center justify-between text-xs text-stone-600 bg-stone-100/70 px-4 py-2 rounded-lg">
            <div>
              <span>Exibindo <strong>{filteredProducts.length}</strong> modelo(s)</span>
              {searchQuery && <span> para "{searchQuery}"</span>}
              {selectedFaceShape !== 'todos' && <span> · Formato: {selectedFaceShape}</span>}
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
                setSelectedFaceShape('todos');
              }}
              className="text-stone-800 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpar filtros</span>
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-base font-medium mb-3">
              Nenhum modelo encontrado com os filtros selecionados.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
                setSelectedFaceShape('todos');
              }}
              className="bg-[#121212] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-stone-800 transition-colors"
            >
              Ver todos os modelos
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
