import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MessageCircle, 
  Tag, 
  Truck, 
  Check,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartItemQuantity, 
    removeFromCart, 
    subtotal, 
    discountAmount, 
    shippingFee, 
    totalAmount, 
    freeShippingProgress,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    openWhatsAppWithCart
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
    if (res.success) {
      setCouponCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-800" />
            <h3 className="font-display font-bold text-lg text-stone-900">
              Sua Sacola
            </h3>
            <span className="text-xs text-stone-500 font-semibold">
              ({cart.reduce((a, b) => a + b.quantity, 0)} itens)
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition-colors"
            aria-label="Fechar sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Free Shipping Progress Bar */}
        <div className="bg-stone-100/80 px-5 py-3 border-b border-stone-200/70">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-stone-700">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-stone-600" />
              {freeShippingProgress.isEligible ? (
                <strong className="text-emerald-700">Parabéns! Você ganhou Frete Grátis ☀️</strong>
              ) : (
                <span>
                  Faltam <strong>R$ {freeShippingProgress.remaining.toFixed(2).replace('.', ',')}</strong> para Frete Grátis
                </span>
              )}
            </span>
            <span className="font-bold tabular-nums text-stone-500">{freeShippingProgress.percentage}%</span>
          </div>

          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                freeShippingProgress.isEligible ? 'bg-emerald-600' : 'bg-black'
              }`}
              style={{ width: `${freeShippingProgress.percentage}%` }}
            />
          </div>
        </div>

        {/* 3. Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-display font-bold text-lg text-stone-800">
                Sua sacola está vazia
              </p>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                Descubra nossos óculos com proteção UV400 e armações de grau inspiradas no Rio.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 bg-[#121212] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-stone-800 transition-colors"
              >
                Explorar Coleção
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemSinglePrice = item.product.price + item.additionalLensPrice;
              const itemTotalPrice = itemSinglePrice * item.quantity;

              return (
                <div 
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-0.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-black/20" 
                          style={{ backgroundColor: item.selectedColor.hex }} 
                        />
                        <span>{item.selectedColor.name}</span>
                        <span>·</span>
                        <span className="truncate max-w-[140px]">{item.lensTypeLabel}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-md bg-white">
                        <button
                          type="button"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-black"
                          aria-label="Diminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold tabular-nums text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-black"
                          aria-label="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="font-display font-bold text-sm text-stone-900 tabular-nums">
                        R$ {itemTotalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 4. Footer & Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-white space-y-3.5">
            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cupom <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Cupom de desconto (ex: CARIOCA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="w-full text-xs uppercase tracking-wider border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-black"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-stone-900 hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
              )}

              {couponFeedback && !appliedCoupon && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{couponFeedback.message}</span>
                </p>
              )}
            </div>

            {/* Price Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-stone-900">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Desconto cupom</span>
                  <span className="tabular-nums font-semibold">
                    - R$ {discountAmount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Frete</span>
                <span className="tabular-nums font-medium text-stone-900">
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700">GRÁTIS</strong>
                  ) : (
                    `R$ ${shippingFee.toFixed(2).replace('.', ',')}`
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-base font-display font-extrabold text-stone-950">
                <span>Total</span>
                <span className="text-xl tabular-nums">
                  R$ {totalAmount.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full bg-[#121212] hover:bg-black text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <span>Finalizar Compra Segura</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={openWhatsAppWithCart}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Fechar Pedido via WhatsApp</span>
              </button>
            </div>

            <p className="text-[10px] text-center text-stone-400">
              🔒 Ambiente seguro com criptografia e garantia de entrega Do Rio.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
