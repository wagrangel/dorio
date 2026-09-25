import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingActions: React.FC = () => {
  const { cart, setIsCartOpen, settings } = useStore();
  const [showTooltip, setShowTooltip] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleWhatsAppChat = () => {
    const phone = settings.whatsappNumber.replace(/\D/g, '');
    const msg = `☀️ Olá, equipe Do Rio Sungless! Estou navegando na loja virtual e gostaria de tirar uma dúvida sobre os modelos e lentes de grau.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* WhatsApp Quick Assistance Floating Button */}
      <div className="pointer-events-auto flex items-center gap-2">
        {showTooltip && (
          <div className="bg-stone-900 text-white text-xs py-1.5 px-3 rounded-xl shadow-lg border border-stone-700 animate-fade-in flex items-center gap-2">
            <span>Dúvidas? Fale com a gente no WhatsApp</span>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleWhatsAppChat}
          onMouseEnter={() => setShowTooltip(true)}
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
          aria-label="Atendimento pelo WhatsApp"
          title="Fale conosco no WhatsApp"
        >
          <MessageCircle className="w-6 h-6 group-hover:rotate-6 transition-transform" />
        </button>
      </div>

      {/* Floating Cart Button (Visible especially when items are in cart) */}
      {totalItems > 0 && (
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-[#121212] hover:bg-black text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border border-stone-800"
            aria-label="Ver sacola de compras"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-2 bg-amber-500 text-stone-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span className="text-xs font-bold tracking-wider uppercase pr-1">
              Ver Sacola
            </span>
          </button>
        </div>
      )}

    </div>
  );
};
