export type ProductCategory = 'solar' | 'grau' | 'lancamento' | 'acessorio';

export type FaceShape = 'oval' | 'redondo' | 'quadrado' | 'coracao' | 'todos';

export type FrameShape = 'quadrado' | 'redondo' | 'aviador' | 'gatinho' | 'retangular' | 'geometrico';

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  installments: string;
  images: string[];
  description: string;
  features: string[];
  dimensions: {
    lensWidth: number;   // mm
    bridgeWidth: number; // mm
    templeLength: number;// mm
  };
  material: string;
  colors: ProductColor[];
  stock: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  frameShape: FrameShape;
  recommendedFaceShapes: FaceShape[];
  rating: number;
  reviewCount: number;
}

export type LensTypeOption = 
  | 'solar_original' 
  | 'grau_monofocal' 
  | 'grau_multifocal' 
  | 'blue_uv_filter';

export interface CartItem {
  id: string; // unique item cart row id
  product: Product;
  selectedColor: ProductColor;
  selectedLensType: LensTypeOption;
  lensTypeLabel: string;
  additionalLensPrice: number;
  quantity: number;
}

export type PaymentMethod = 'pix' | 'credit_card' | 'whatsapp';

export type OrderStatus = 'pendente' | 'pago' | 'enviado' | 'entregue' | 'cancelado';

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  code: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: OrderCustomer;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  pixCode?: string;
  trackingCode?: string;
  notes?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minAmount: number;
}

export interface StoreSettings {
  whatsappNumber: string;
  announcementText: string;
  freeShippingThreshold: number;
  instagramHandle: string;
  instagramFollowers: string;
}
