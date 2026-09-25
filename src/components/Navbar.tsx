import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  Settings, 
  Menu, 
  X, 
  Sparkles,
  Sun
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const { 
    cart, 
    setIsCartOpen, 
    wishlist, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    setIsAdminOpen,
    setIsFaceGuideOpen,
    settings
  } = useStore();

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCategoryClick = (category: ProductCategory | 'todos') => {
    setActiveCategory(category);
    setIsMobileMenuOpen(false);
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* 1. Slim Announcement Bar */}
      <aside aria-label="Aviso da Loja" className="bg-[#121212] text-[#F5F5F4] text-[11px] font-medium tracking-wider uppercase py-2 px-4 text-center flex items-center justify-center gap-2">
        <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="truncate">{settings.announcementText}</span>
      </aside>

      {/* 2. Top Bar Contract: Zone 1, Zone 2, Zone 3 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-black focus-visible:outline-none"
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <button
            type="button"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="p-2 text-stone-700 hover:text-black focus-visible:outline-none"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleCategoryClick('todos');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display font-extrabold text-xl sm:text-2xl tracking-[0.18em] text-[#121212] uppercase hover:opacity-85 transition-opacity"
        >
          DO RIO SUNGLESS
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold tracking-wider uppercase text-stone-700">
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveCategory('todos');
            }}
            className={`transition-colors py-1 hover:text-black ${activeCategory === 'todos' ? 'text-black border-b-2 border-black' : ''}`}
          >
            Início
          </button>
          <button
            type="button"
            onClick={() => handleCategoryClick('solar')}
            className={`transition-colors py-1 hover:text-black ${activeCategory === 'solar' ? 'text-black border-b-2 border-black' : ''}`}
          >
            Óculos de Sol
          </button>
          <button
            type="button"
            onClick={() => handleCategoryClick('grau')}
            className={`transition-colors py-1 hover:text-black ${activeCategory === 'grau' ? 'text-black border-b-2 border-black' : ''}`}
          >
            Óculos de Grau
          </button>
          <button
            type="button"
            onClick={() => handleCategoryClick('lancamento')}
            className={`transition-colors py-1 hover:text-black ${activeCategory === 'lancamento' ? 'text-black border-b-2 border-black' : ''}`}
          >
            Lançamentos
          </button>
          <button
            type="button"
            onClick={() => {
              handleCategoryClick('todos');
            }}
            className="transition-colors py-1 hover:text-black"
          >
            Mais Vendidos
          </button>
          <button
            type="button"
            onClick={() => setIsFaceGuideOpen(true)}
            className="flex items-center gap-1.5 text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full transition-colors font-medium text-xs normal-case"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Guia de Rosto</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Desktop Search trigger / input */}
          <div className="relative hidden md:block">
            {isSearchVisible ? (
              <div className="flex items-center border border-stone-300 rounded-full px-3 py-1 bg-stone-50">
                <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar modelo ou cor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-stone-900 focus:outline-none w-44"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchVisible(false);
                  }}
                  className="text-stone-400 hover:text-stone-600 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsSearchVisible(true)}
                className="p-2 text-stone-700 hover:text-black transition-colors rounded-full hover:bg-stone-100"
                aria-label="Buscar produtos"
                title="Buscar no catálogo"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Indicator */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('catalogo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative p-2 text-stone-700 hover:text-black transition-colors rounded-full hover:bg-stone-100"
            aria-label="Favoritos"
            title={`${wishlist.length} favoritos`}
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-[#121212] text-white px-3.5 py-2 rounded-full hover:bg-stone-800 transition-colors shadow-sm"
            aria-label="Sacola de compras"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wider tabular-nums">
              {cartTotalItems}
            </span>
          </button>

          {/* Store Admin portal trigger */}
          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            className="p-2 text-stone-400 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-100 hidden sm:flex"
            title="Painel Administrativo da Loja"
            aria-label="Admin"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Search input bar if open */}
      {isSearchVisible && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-stone-100 bg-white">
          <div className="flex items-center border border-stone-300 rounded-lg px-3 py-2 bg-stone-50">
            <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Buscar por modelo, cor ou estilo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-stone-900 focus:outline-none w-full"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-stone-400 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-semibold text-stone-800 text-sm tracking-wide uppercase">
            <button
              type="button"
              onClick={() => handleCategoryClick('todos')}
              className="text-left py-2 border-b border-stone-100"
            >
              Todos os Modelos
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick('solar')}
              className="text-left py-2 border-b border-stone-100"
            >
              Óculos de Sol (UV400)
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick('grau')}
              className="text-left py-2 border-b border-stone-100"
            >
              Óculos de Grau
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick('lancamento')}
              className="text-left py-2 border-b border-stone-100"
            >
              Lançamentos Exclusivos
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick('acessorio')}
              className="text-left py-2 border-b border-stone-100"
            >
              Cases & Acessórios
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsFaceGuideOpen(true);
              }}
              className="text-left py-2 flex items-center justify-between text-amber-700 normal-case"
            >
              <span>Provador Virtual / Guia de Rosto</span>
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="text-left py-2 flex items-center justify-between text-stone-500 normal-case"
            >
              <span>Acesso Administrador</span>
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
