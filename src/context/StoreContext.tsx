import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Product, 
  ProductCategory, 
  FaceShape, 
  CartItem, 
  Order, 
  OrderStatus, 
  StoreSettings, 
  Coupon, 
  ProductColor, 
  LensTypeOption 
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, LENS_TYPE_OPTIONS } from '../data/initialProducts';

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, lensType?: LensTypeOption, quantity?: number) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;

  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  freeShippingProgress: {
    remaining: number;
    percentage: number;
    isEligible: boolean;
  };

  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'code' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // UI Modals & Navigation
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isFaceGuideOpen: boolean;
  setIsFaceGuideOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  activeCategory: ProductCategory | 'todos';
  setActiveCategory: (cat: ProductCategory | 'todos') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFaceShape: FaceShape;
  setSelectedFaceShape: (shape: FaceShape) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  openWhatsAppWithCart: () => void;
  openWhatsAppDirectProduct: (product: Product, color?: ProductColor) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const COUPONS_DATABASE: Coupon[] = [
  { code: 'CARIOCA10', discountPercent: 10, minAmount: 100 },
  { code: 'BEMVINDO', discountPercent: 15, minAmount: 150 },
  { code: 'DORIO5', discountPercent: 5, minAmount: 50 },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dorio_products_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('dorio_products_v1', JSON.stringify(products));
  }, [products]);

  // 2. Settings State
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('dorio_settings_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('dorio_settings_v1', JSON.stringify(settings));
  }, [settings]);

  // 3. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dorio_cart_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('dorio_cart_v1', JSON.stringify(cart));
  }, [cart]);

  // 4. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('dorio_orders_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'ord-demo-1',
        code: 'DRS-9021',
        createdAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
        items: [
          {
            id: 'c-1',
            product: INITIAL_PRODUCTS[0],
            selectedColor: INITIAL_PRODUCTS[0].colors[0],
            selectedLensType: 'solar_original',
            lensTypeLabel: 'Lentes Originais UV400',
            additionalLensPrice: 0,
            quantity: 1,
          }
        ],
        subtotal: 159.90,
        discount: 15.99,
        shipping: 0,
        total: 143.91,
        customer: {
          name: 'Mariana Silveira',
          phone: '(21) 98877-6655',
          email: 'mariana.rio@gmail.com',
          cpf: '123.456.789-00',
          cep: '22410-003',
          street: 'Rua Garcia d\'Avila',
          number: '142',
          neighborhood: 'Ipanema',
          city: 'Rio de Janeiro',
          state: 'RJ',
        },
        paymentMethod: 'pix',
        status: 'pago',
        trackingCode: 'BR-98471203',
        notes: 'Entregar na portaria social.'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('dorio_orders_v1', JSON.stringify(orders));
  }, [orders]);

  // 5. Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('dorio_wishlist_v1');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dorio_wishlist_v1', JSON.stringify(wishlist));
  }, [wishlist]);

  // 6. Navigation and Filters
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaceShape, setSelectedFaceShape] = useState<FaceShape>('todos');

  // 7. Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFaceGuideOpen, setIsFaceGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 8. Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Cart Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const itemPrice = item.product.price + item.additionalLensPrice;
      return acc + itemPrice * item.quantity;
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (subtotal < appliedCoupon.minAmount) return 0;
    return Number(((subtotal * appliedCoupon.discountPercent) / 100).toFixed(2));
  }, [appliedCoupon, subtotal]);

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= settings.freeShippingThreshold ? 0 : 24.90;
  }, [subtotal, settings.freeShippingThreshold]);

  const totalAmount = useMemo(() => {
    const total = subtotal - discountAmount + shippingFee;
    return Math.max(0, Number(total.toFixed(2)));
  }, [subtotal, discountAmount, shippingFee]);

  const freeShippingProgress = useMemo(() => {
    const threshold = settings.freeShippingThreshold;
    const isEligible = subtotal >= threshold;
    const remaining = Math.max(0, threshold - subtotal);
    const percentage = Math.min(100, Math.round((subtotal / threshold) * 100));
    return { remaining, percentage, isEligible };
  }, [subtotal, settings.freeShippingThreshold]);

  // Actions
  const addToCart = (
    product: Product, 
    color: ProductColor, 
    lensType: LensTypeOption = 'solar_original', 
    quantity: number = 1
  ) => {
    const lensConfig = LENS_TYPE_OPTIONS.find(l => l.id === lensType) || LENS_TYPE_OPTIONS[0];

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && 
                item.selectedColor.name === color.name && 
                item.selectedLensType === lensType
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${color.name}-${lensType}-${Date.now()}`,
          product,
          selectedColor: color,
          selectedLensType: lensType,
          lensTypeLabel: lensConfig.name,
          additionalLensPrice: lensConfig.price,
          quantity,
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = COUPONS_DATABASE.find(c => c.code === normalized);
    if (!found) {
      return { success: false, message: 'Cupom inválido ou expirado.' };
    }
    if (subtotal < found.minAmount) {
      return { 
        success: false, 
        message: `Este cupom exige compra mínima de R$ ${found.minAmount.toFixed(2).replace('.', ',')}.` 
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Cupom ${found.code} aplicado com sucesso! -${found.discountPercent}% OFF` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Product Admin Operations
  const addProduct = (newProductData: Omit<Product, 'id'>) => {
    const newId = `drs-${Date.now().toString().slice(-4)}`;
    const product: Product = {
      ...newProductData,
      id: newId,
      rating: 5.0,
      reviewCount: 0,
    };
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(c => c.product.id !== id));
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('dorio_products_v1');
  };

  // Orders Admin Operations
  const createOrder = (orderData: Omit<Order, 'id' | 'code' | 'createdAt'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      code: `DRS-${randomSuffix}`,
      createdAt: new Date().toISOString(),
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // WhatsApp Checkout Helper
  const openWhatsAppWithCart = () => {
    if (cart.length === 0) return;
    const phone = settings.whatsappNumber.replace(/\D/g, '');
    let msg = `☀️ *NOVO PEDIDO - DO RIO SUNGLESS*\n\n`;
    msg += `Olá! Gostaria de fechar meu pedido diretamente por aqui:\n\n`;

    cart.forEach((item, index) => {
      const itemTotal = (item.product.price + item.additionalLensPrice) * item.quantity;
      msg += `*${index + 1}. ${item.product.name}*\n`;
      msg += `   • Cor: ${item.selectedColor.name}\n`;
      msg += `   • Lentes: ${item.lensTypeLabel}\n`;
      msg += `   • Quantidade: ${item.quantity}x\n`;
      msg += `   • Valor: R$ ${itemTotal.toFixed(2).replace('.', ',')}\n\n`;
    });

    msg += `--------------------------\n`;
    msg += `*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    if (discountAmount > 0) {
      msg += `*Desconto (${appliedCoupon?.code}):* -R$ ${discountAmount.toFixed(2).replace('.', ',')}\n`;
    }
    msg += `*Frete:* ${shippingFee === 0 ? 'GRÁTIS' : `R$ ${shippingFee.toFixed(2).replace('.', ',')}`}\n`;
    msg += `*TOTAL DO PEDIDO:* R$ ${totalAmount.toFixed(2).replace('.', ',')}\n\n`;
    msg += `Aguardo instruções para pagamento (PIX ou Cartão) e envio! 🌊`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openWhatsAppDirectProduct = (product: Product, color?: ProductColor) => {
    const phone = settings.whatsappNumber.replace(/\D/g, '');
    const chosenColor = color ? color.name : product.colors[0].name;
    const msg = `☀️ Olá, equipe Do Rio Sungless! Gostaria de comprar o modelo *${product.name}* (Cor: ${chosenColor}) por R$ ${product.price.toFixed(2).replace('.', ',')}. Como podemos finalizar?`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        cart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        freeShippingProgress,
        orders,
        createOrder,
        updateOrderStatus,
        settings,
        updateSettings,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminOpen,
        setIsAdminOpen,
        isFaceGuideOpen,
        setIsFaceGuideOpen,
        selectedProduct,
        setSelectedProduct,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedFaceShape,
        setSelectedFaceShape,
        wishlist,
        toggleWishlist,
        openWhatsAppWithCart,
        openWhatsAppDirectProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
