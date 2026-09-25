import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Ruler, 
  Star,
  Check,
  Info
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LensTypeOption, ProductColor } from '../types';
import { LENS_TYPE_OPTIONS } from '../data/initialProducts';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    openWhatsAppDirectProduct
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedLensType, setSelectedLensType] = useState<LensTypeOption>('solar_original');
  const [cepInput, setCepInput] = useState('');
  const [shippingResult, setShippingResult] = useState<{ days: string; price: string } | null>(null);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  if (!selectedProduct) return null;

  const currentColor = selectedColor || selectedProduct.colors[0];
  const isWishlisted = wishlist.includes(selectedProduct.id);

  const activeLensOption = LENS_TYPE_OPTIONS.find(l => l.id === selectedLensType) || LENS_TYPE_OPTIONS[0];
  const currentTotalPrice = selectedProduct.price + activeLensOption.price;

  const handleAddToCart = () => {
    addToCart(selectedProduct, currentColor, selectedLensType, 1);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      setSelectedProduct(null);
    }, 600);
  };

  const handleWhatsAppBuy = () => {
    openWhatsAppDirectProduct(selectedProduct, currentColor);
  };

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cepInput || cepInput.length < 8) return;
    // Fast mock for Brazilian CEP shipping simulation
    setShippingResult({
      days: '2 a 5 dias úteis',
      price: currentTotalPrice >= 199 ? 'GRÁTIS' : 'R$ 24,90'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto"
      onClick={() => setSelectedProduct(null)}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-black flex items-center justify-center shadow-md transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 2-Column Contiguous Purchase Module Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          
          {/* Left Column: Media Gallery */}
          <div className="p-6 sm:p-8 bg-stone-100/60 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div>
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-sm flex items-center justify-center">
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Wishlist toggle */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-stone-600 hover:text-black transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-2 mt-3">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-black ring-1 ring-black' : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Frame Dimensions Callout */}
            <div className="mt-6 pt-4 border-t border-stone-200/80 bg-white/70 rounded-xl p-3.5 text-xs text-stone-700">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-stone-900 mb-2">
                <Ruler className="w-3.5 h-3.5 text-stone-600" />
                <span>Medidas da Armação:</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-stone-50 p-1.5 rounded">
                  <span className="text-[10px] text-stone-400 block">Lente</span>
                  <span className="font-semibold">{selectedProduct.dimensions.lensWidth} mm</span>
                </div>
                <div className="bg-stone-50 p-1.5 rounded">
                  <span className="text-[10px] text-stone-400 block">Ponte</span>
                  <span className="font-semibold">{selectedProduct.dimensions.bridgeWidth} mm</span>
                </div>
                <div className="bg-stone-50 p-1.5 rounded">
                  <span className="text-[10px] text-stone-400 block">Haste</span>
                  <span className="font-semibold">{selectedProduct.dimensions.templeLength} mm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold tracking-wider uppercase mb-1">
                <span>{selectedProduct.categoryLabel} · {selectedProduct.material}</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Em estoque ({selectedProduct.stock} un.)</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
                {selectedProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-600">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="font-bold text-stone-900 tabular-nums">{selectedProduct.rating.toFixed(1)}</span>
                <span>·</span>
                <span>{selectedProduct.reviewCount} avaliações de clientes</span>
              </div>

              {/* Price display */}
              <div className="mt-4 p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-extrabold text-2xl text-stone-950 tabular-nums">
                    R$ {currentTotalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      R$ {selectedProduct.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  ou 3x de R$ {(currentTotalPrice / 3).toFixed(2).replace('.', ',')} sem juros no cartão
                </p>
              </div>

              {/* Color Selection */}
              <div className="mt-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Cor da Armação: <span className="font-normal text-stone-900">{currentColor.name}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`relative px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition-all ${
                        currentColor.name === color.name
                          ? 'border-black bg-stone-100 text-black shadow-xs font-bold'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lens Type Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Tipo de Lente:
                  </label>
                  <span className="text-[11px] text-amber-700 flex items-center gap-1 font-medium">
                    <Info className="w-3 h-3" />
                    <span>Grau sob medida</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {LENS_TYPE_OPTIONS.map((lens) => (
                    <div
                      key={lens.id}
                      onClick={() => setSelectedLensType(lens.id as LensTypeOption)}
                      className={`cursor-pointer p-2.5 rounded-xl border text-xs transition-all flex items-start justify-between gap-3 ${
                        selectedLensType === lens.id
                          ? 'border-black bg-stone-50 ring-1 ring-black'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <input
                          type="radio"
                          name="lensType"
                          checked={selectedLensType === lens.id}
                          onChange={() => setSelectedLensType(lens.id as LensTypeOption)}
                          className="mt-0.5 accent-black"
                        />
                        <div>
                          <p className="font-bold text-stone-900">{lens.name}</p>
                          <p className="text-[11px] text-stone-500">{lens.description}</p>
                        </div>
                      </div>
                      <span className="font-bold tabular-nums shrink-0 text-stone-900">
                        {lens.price === 0 ? 'Incluso' : `+ R$ ${lens.price.toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="mt-5 space-y-1.5 text-xs text-stone-600">
                {selectedProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs and Shipping Section */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
                    isAddedFeedback 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-[#121212] hover:bg-black text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAddedFeedback ? 'Adicionado com Sucesso!' : 'Adicionar à Sacola'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBuy}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Comprar via WhatsApp</span>
                </button>
              </div>

              {/* CEP Simulator */}
              <form onSubmit={handleCalculateShipping} className="pt-2 flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Calcular Frete (CEP: 00000-000)"
                    value={cepInput}
                    onChange={(e) => setCepInput(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Calcular
                </button>
              </form>

              {shippingResult && (
                <div className="text-xs bg-emerald-50 text-emerald-900 border border-emerald-200 p-2.5 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>Prazo estimado: <strong>{shippingResult.days}</strong></span>
                  </div>
                  <span className="font-bold">{shippingResult.price}</span>
                </div>
              )}

              {/* Trust Badges */}
              <div className="pt-2 grid grid-cols-3 gap-2 text-center text-[10px] text-stone-500">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Garantia 1 Ano</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
                  <span>Troca em 30 Dias</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Envio Rastreado</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
