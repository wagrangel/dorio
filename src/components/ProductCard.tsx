import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    setSelectedProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    openWhatsAppDirectProduct
  } = useStore();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const isWishlisted = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, currentColor, 'solar_original', 1);
  };

  const handleWhatsAppBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsAppDirectProduct(product, currentColor);
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white border border-stone-200/80 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* 1. Image Container (takes generous 68% visual weight) */}
      <div className="relative aspect-[4/3] bg-stone-100/70 overflow-hidden flex items-center justify-center p-4">
        
        {/* Subtle Status tags (zero pill slop, clean text tag) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="bg-black/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Mais Vendido
            </span>
          )}
          {product.isNew && (
            <span className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Lançamento
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-black flex items-center justify-center shadow-xs transition-transform active:scale-90"
          aria-label="Adicionar aos favoritos"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Product Image with smooth hover zoom */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 bg-[#121212] hover:bg-black text-white text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all"
            title="Adicionar à sacola"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Adicionar</span>
          </button>
          
          <button
            type="button"
            onClick={handleWhatsAppBuy}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-lg shadow-md transition-colors"
            title="Comprar direto pelo WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="bg-white hover:bg-stone-100 text-stone-800 p-2.5 rounded-lg shadow-md transition-colors"
            title="Visualização rápida"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Category & Material (unboxed clean text) */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium tracking-wide uppercase mb-1">
            <span>{product.categoryLabel}</span>
            <span>·</span>
            <span>{product.material.split('&')[0]}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1 text-xs text-stone-600">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-semibold text-stone-800 tabular-nums">{product.rating.toFixed(1)}</span>
            <span className="text-stone-400">({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100">
          {/* Color Switcher */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIndex(idx);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColorIndex === idx 
                      ? 'ring-2 ring-stone-900 ring-offset-1 scale-110' 
                      : 'border-stone-300 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            <span className="text-[11px] text-stone-500 font-normal truncate max-w-[120px]">
              {currentColor.name}
            </span>
          </div>

          {/* Price & Installments (Tabular discipline) */}
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-lg sm:text-xl text-stone-950 tabular-nums">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through tabular-nums">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                {product.installments}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
