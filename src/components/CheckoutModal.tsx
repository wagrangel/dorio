import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  MessageCircle, 
  Copy, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  Check,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    subtotal, 
    discountAmount, 
    shippingFee, 
    totalAmount, 
    createOrder,
    settings
  } = useStore();

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('RJ');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');

  // Credit card inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState('1');

  // Completed Order State
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isCopiedPix, setIsCopiedPix] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  // Auto-fill address mock when CEP is entered
  const handleCepChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 8);
    setCep(clean);
    if (clean.length === 8) {
      // Simulate address lookup (e.g. Rio de Janeiro default for demo)
      if (!street) setStreet('Av. Vieira Souto');
      if (!neighborhood) setNeighborhood('Ipanema');
      if (!city) setCity('Rio de Janeiro');
      if (!state) setState('RJ');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !street || !number) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const pixCode = `00020126580014br.gov.bcb.pix0136dorio-sungless-pix@doriosungless.com.br520400005303986540${totalAmount.toFixed(2)}5802BR5925DO RIO SUNGLESS RJ6014RIO DE JANEIRO62070503***6304`;

      const order = createOrder({
        items: cart,
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: totalAmount,
        customer: {
          name,
          phone,
          email,
          cpf,
          cep,
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
        },
        paymentMethod,
        status: paymentMethod === 'whatsapp' ? 'pendente' : 'pago',
        pixCode,
        trackingCode: `DR-${Math.floor(100000 + Math.random() * 900000)}`,
        notes: paymentMethod === 'whatsapp' ? 'Pedido para acompanhamento no WhatsApp' : 'Pagamento processado'
      });

      setCompletedOrder(order);
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopyPix = () => {
    if (completedOrder?.pixCode) {
      navigator.clipboard.writeText(completedOrder.pixCode);
      setIsCopiedPix(true);
      setTimeout(() => setIsCopiedPix(false), 2500);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  const handleOpenWhatsAppConfirmation = () => {
    if (!completedOrder) return;
    const phoneNum = settings.whatsappNumber.replace(/\D/g, '');
    const msg = `☀️ Olá! Acabei de realizar o pedido *#${completedOrder.code}* no site da Do Rio Sungless no valor de R$ ${completedOrder.total.toFixed(2).replace('.', ',')}. Gostaria de confirmar e acompanhar o envio! Meu nome é ${completedOrder.customer.name}.`;
    window.open(`https://wa.me/${phoneNum}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="font-display font-bold text-xl text-stone-900">
              {completedOrder ? 'Pedido Confirmado com Sucesso!' : 'Finalizar Pedido'}
            </h3>
            <p className="text-xs text-stone-500">
              {completedOrder ? `Código do Pedido: ${completedOrder.code}` : 'Preencha seus dados para entrega rápida'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {completedOrder ? (
          /* ================= ORDER CONFIRMATION SCREEN ================= */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">
                Obrigado pelo seu pedido, {completedOrder.customer.name.split(' ')[0]}!
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                Seus óculos Do Rio já estão sendo preparados.
              </h2>
              <p className="text-xs text-stone-500 mt-2 max-w-md mx-auto">
                Enviamos os detalhes da compra para <strong>{completedOrder.customer.email}</strong> e notificaremos cada etapa da entrega no WhatsApp.
              </p>
            </div>

            {/* If PIX was selected, display instant QR code and Copia e Cola */}
            {completedOrder.paymentMethod === 'pix' && (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 max-w-md mx-auto text-left space-y-4">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-sm text-stone-900">Pagamento via PIX Instantâneo</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col items-center justify-center">
                  <div className="w-44 h-44 bg-stone-100 rounded-lg flex items-center justify-center border border-stone-300 relative overflow-hidden">
                    {/* Simulated visual QR Code SVG */}
                    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M10 10h30v30H10zM15 15v20h20V15zm45-5h30v30H60zM65 15v20h20V15zm-55 45h30v30H10zM15 65v20h20V65zm45 10h10v10H60zm10 10h10v10H70zm10-10h10v10H80zm-10-15h20v5H70zm-20 0h5v15h-5zm0-20h15v5H50zm35 0h5v15h-5zM20 20h10v10H20zm50 0h10v10H70zM20 70h10v10H20z" />
                    </svg>
                  </div>
                  <span className="text-[11px] text-stone-500 mt-2">
                    Abra o app do seu banco e aponte a câmera
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Código Pix Copia e Cola:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={completedOrder.pixCode}
                      className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-[11px] text-stone-700 font-mono w-full truncate"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
                    >
                      {isCopiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopiedPix ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between font-bold text-stone-800 border-b border-stone-200 pb-2">
                <span>Resumo da Compra</span>
                <span>R$ {completedOrder.total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="text-stone-600 space-y-1">
                <p><strong>Destinatário:</strong> {completedOrder.customer.name}</p>
                <p><strong>Endereço:</strong> {completedOrder.customer.street}, {completedOrder.customer.number} - {completedOrder.customer.neighborhood}, {completedOrder.customer.city}/{completedOrder.customer.state}</p>
                <p><strong>Envio:</strong> Código de Rastreio {completedOrder.trackingCode}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
              <button
                type="button"
                onClick={handleOpenWhatsAppConfirmation}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Acompanhar no WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="bg-stone-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Continuar na Loja
              </button>
            </div>
          </div>
        ) : (
          /* ================= CHECKOUT FORM ================= */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-8">
            
            {/* Step 1: Customer Info */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-mono">1</span>
                <span>Seus Dados Pessoais</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Wagner Rangel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp / Celular *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(21) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    E-mail para Confirmação *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    CPF (para emissão de nota) *
                  </label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-mono">2</span>
                <span>Endereço de Entrega</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    CEP *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="22000-000"
                    value={cep}
                    onChange={(e) => handleCepChange(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Rua / Avenida *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Av. Atlântica"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Número *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="100"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Complemento
                  </label>
                  <input
                    type="text"
                    placeholder="Apto 302"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Copacabana"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rio de Janeiro"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Estado (UF) *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-black bg-white"
                  >
                    <option value="RJ">RJ</option>
                    <option value="SP">SP</option>
                    <option value="MG">MG</option>
                    <option value="ES">ES</option>
                    <option value="RS">RS</option>
                    <option value="PR">PR</option>
                    <option value="SC">SC</option>
                    <option value="BA">BA</option>
                    <option value="DF">DF</option>
                    <option value="GO">GO</option>
                    <option value="PE">PE</option>
                    <option value="CE">CE</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-mono">3</span>
                <span>Forma de Pagamento</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setPaymentMethod('pix')}
                  className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                    paymentMethod === 'pix'
                      ? 'border-black bg-stone-50 ring-1 ring-black shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <QrCode className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                  <p className="font-bold text-xs text-stone-900">PIX Instantâneo</p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">Aprovação Imediata</p>
                </div>

                <div
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'border-black bg-stone-50 ring-1 ring-black shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-stone-800" />
                  <p className="font-bold text-xs text-stone-900">Cartão de Crédito</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Até 3x sem juros</p>
                </div>

                <div
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                    paymentMethod === 'whatsapp'
                      ? 'border-black bg-stone-50 ring-1 ring-black shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <MessageCircle className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                  <p className="font-bold text-xs text-stone-900">Direto via WhatsApp</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Atendimento Carioca</p>
                </div>
              </div>

              {/* Credit Card inputs if selected */}
              {paymentMethod === 'credit_card' && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Nome Impresso no Cartão
                      </label>
                      <input
                        type="text"
                        placeholder="NOME COMO NO CARTAO"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Validade (MM/AA)
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        CVV (Código de segurança)
                      </label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Parcelamento
                      </label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(e.target.value)}
                        className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2 bg-white"
                      >
                        <option value="1">1x de R$ {totalAmount.toFixed(2).replace('.', ',')} sem juros</option>
                        <option value="2">2x de R$ {(totalAmount / 2).toFixed(2).replace('.', ',')} sem juros</option>
                        <option value="3">3x de R$ {(totalAmount / 3).toFixed(2).replace('.', ',')} sem juros</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Total Order Summary */}
            <div className="p-4 bg-stone-100 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Itens ({cart.reduce((a, b) => a + b.quantity, 0)}):</span>
                <span className="tabular-nums font-semibold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Desconto:</span>
                  <span className="tabular-nums font-semibold">- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Frete:</span>
                <span className="tabular-nums font-semibold">{shippingFee === 0 ? 'GRÁTIS' : `R$ ${shippingFee.toFixed(2).replace('.', ',')}`}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-display font-bold text-stone-900">
                <span>Total a Pagar:</span>
                <span className="text-xl tabular-nums">R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#121212] hover:bg-black text-white font-bold py-4 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processando Pedido...</span>
                ) : (
                  <>
                    <span>Confirmar Pedido (R$ {totalAmount.toFixed(2).replace('.', ',')})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
