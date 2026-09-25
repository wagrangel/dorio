import React from 'react';
import { Instagram, MessageCircle, ShieldCheck, SunMedium, Settings } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { setActiveCategory, setIsFaceGuideOpen, setIsAdminOpen, settings } = useStore();

  const handleCategoryClick = (category: ProductCategory | 'todos') => {
    setActiveCategory(category);
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-display font-extrabold text-2xl tracking-[0.16em] text-white uppercase block">
              DO RIO SUNGLESS
            </span>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Conceito 100% carioca. Nascemos para quem enxerga a vida com atitude, leveza e aquele toque de praia que combina com qualquer lugar do mundo.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/doriosungless"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition-colors"
                aria-label="Instagram da Do Rio Sungless"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp Do Rio Sungless"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-stone-500">
              <span>Comunidade: <strong>{settings.instagramFollowers} seguidores</strong> no Instagram</span>
            </div>
          </div>

          {/* Col 2: Coleções */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Coleções
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('solar')}
                  className="hover:text-white transition-colors"
                >
                  Óculos de Sol (UV400)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('grau')}
                  className="hover:text-white transition-colors"
                >
                  Óculos de Grau
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('lancamento')}
                  className="hover:text-white transition-colors"
                >
                  Lançamentos 2026
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('acessorio')}
                  className="hover:text-white transition-colors"
                >
                  Cases & Cordões
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsFaceGuideOpen(true)}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  Guia de Formato de Rosto
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Atendimento & Segurança */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Atendimento
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Vendas & Suporte</span>
                </a>
              </li>
              <li>
                <span className="text-stone-400">Envio para todo o Brasil</span>
              </li>
              <li>
                <span className="text-stone-400">Troca fácil até 30 dias</span>
              </li>
              <li>
                <span className="text-stone-400">Garantia de 1 ano</span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsAdminOpen(true)}
                  className="text-stone-500 hover:text-stone-300 flex items-center gap-1 text-[11px] pt-2"
                >
                  <Settings className="w-3 h-3" />
                  <span>Gerenciador da Loja</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Pagamento & Selo Rio */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Pagamento & Segurança
            </h4>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-center gap-2 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Compra Segura com PIX ou Cartão em até 3x</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <SunMedium className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lentes Certificadas UV400</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-500">
              <p>Rio de Janeiro - RJ · Brasil</p>
              <p className="mt-1">Feito com paixão pela cultura praiana.</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {currentYear} Do Rio Sungless. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Privacidade</span>
            <span>·</span>
            <span>Termos de Uso</span>
            <span>·</span>
            <span>Trocas e Devoluções</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
