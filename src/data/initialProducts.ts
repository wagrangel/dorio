import { Product, StoreSettings } from '../types';

import ipanemaImg from '../assets/images/product_sunglasses_ipanema_1790351493362.jpg';
import arpoadorImg from '../assets/images/product_sunglasses_arpoador_1790351507544.jpg';
import leblonImg from '../assets/images/product_optical_leblon_1790351518971.jpg';
import conceptImg from '../assets/images/concept_carioca_lifestyle_1790351534780.jpg';

export const INITIAL_SETTINGS: StoreSettings = {
  whatsappNumber: '5521974712026',
  announcementText: '☀️ FRETE GRÁTIS PARA TODO O BRASIL ACIMA DE R$ 199 | CUPOM: CARIOCA10 (10% OFF)',
  freeShippingThreshold: 199.00,
  instagramHandle: '@doriosungless',
  instagramFollowers: '7.471',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'drs-01',
    name: 'Ipanema Classic Black',
    category: 'solar',
    categoryLabel: 'Óculos de Sol',
    price: 159.90,
    originalPrice: 199.90,
    installments: 'ou 3x de R$ 53,30 sem juros',
    images: [
      ipanemaImg,
      arpoadorImg,
    ],
    description: 'Inspirado na icônica praia de Ipanema. Armação robusta em acetato italiano polido à mão com lentes pretas polarizadas de alta definição UV400. Corte contemporâneo, presença marcante e conforto absoluto sob a luz do Rio.',
    features: [
      '100% Proteção UVA/UVB 400',
      'Lentes Polarizadas TAC antirreflexo marítimo',
      'Acetato nobre italiano com alma metálica reforçada',
      'Acompanha estojo rígido sustentável + flanela de microfibra'
    ],
    dimensions: {
      lensWidth: 53,
      bridgeWidth: 20,
      templeLength: 145,
    },
    material: 'Acetato Nobre Polido',
    colors: [
      { name: 'Preto Ônix', hex: '#111111', inStock: true },
      { name: 'Tartaruga Âmbar', hex: '#5c3317', inStock: true },
      { name: 'Verde Mar Translúcido', hex: '#1d4845', inStock: true }
    ],
    stock: 18,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    frameShape: 'quadrado',
    recommendedFaceShapes: ['oval', 'redondo', 'coracao'],
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'drs-02',
    name: 'Arpoador Sunset Havana',
    category: 'solar',
    categoryLabel: 'Óculos de Sol',
    price: 179.90,
    originalPrice: 229.90,
    installments: 'ou 3x de R$ 59,96 sem juros',
    images: [
      arpoadorImg,
      ipanemaImg
    ],
    description: 'Para assistir ao pôr do sol mais aplaudido do mundo na pedra do Arpoador. Padrão tartaruga clássico em tons terrosos com detalhes em banho dourado fosco e lentes degradê bronze.',
    features: [
      'Lentes degradê bronze polarizadas UV400',
      'Ponte dupla com liga de titânio acetinado',
      'Alta resistência à maresia e calor tropical',
      'Plaquetas hipoalergênicas ajustáveis'
    ],
    dimensions: {
      lensWidth: 54,
      bridgeWidth: 19,
      templeLength: 148,
    },
    material: 'Acetato Italiano & Titânio',
    colors: [
      { name: 'Havana Dourado', hex: '#6d421d', inStock: true },
      { name: 'Caramelo Fosco', hex: '#b3773b', inStock: true },
      { name: 'Preto Matte', hex: '#222222', inStock: true }
    ],
    stock: 12,
    isFeatured: true,
    isBestSeller: true,
    isNew: true,
    frameShape: 'aviador',
    recommendedFaceShapes: ['quadrado', 'oval', 'coracao'],
    rating: 5.0,
    reviewCount: 38
  },
  {
    id: 'drs-03',
    name: 'Leblon Clear Titanium',
    category: 'grau',
    categoryLabel: 'Óculos de Grau',
    price: 169.90,
    originalPrice: 209.90,
    installments: 'ou 3x de R$ 56,63 sem juros',
    images: [
      leblonImg,
      conceptImg
    ],
    description: 'A elegância despretensiosa do Leblon em uma armação transparente cristal com peso pena de apenas 19 gramas. Perfeita para receber qualquer prescrição oftálmica ou lentes com filtro de luz azul para trabalho no computador.',
    features: [
      'Compatível com qualquer graduação oftálmica',
      'Estrutura em TR90 suíço ultra-leve e flexível',
      'Hastes com memória de formato e conforto prolongado',
      'Garantia de 1 ano contra defeitos de fabricação'
    ],
    dimensions: {
      lensWidth: 50,
      bridgeWidth: 18,
      templeLength: 142,
    },
    material: 'TR90 Cristal & Alumínio Aeroespacial',
    colors: [
      { name: 'Cristal Translúcido', hex: '#e4e7eb', inStock: true },
      { name: 'Cinza Fumê', hex: '#64748b', inStock: true },
      { name: 'Rosa Champagne', hex: '#d8b4a6', inStock: true }
    ],
    stock: 24,
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    frameShape: 'redondo',
    recommendedFaceShapes: ['quadrado', 'oval'],
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 'drs-04',
    name: 'Copacabana Calçadão',
    category: 'solar',
    categoryLabel: 'Óculos de Sol',
    price: 149.90,
    originalPrice: 189.90,
    installments: 'ou 3x de R$ 49,97 sem juros',
    images: [
      ipanemaImg,
      conceptImg
    ],
    description: 'Design geométrico inspirado nas curvas modernistas do calçadão de Burle Marx em Copacabana. Armação preta marcante com lentes azuis oceano refletivas de contraste máximo sob o sol tropical.',
    features: [
      'Lentes azuis marinhas polarizadas UV400',
      'Design geométrico unissex exclusivo',
      'Dobradiças reforçadas de 5 pontos em aço',
      'Gravação laser "Do Rio" na haste interna'
    ],
    dimensions: {
      lensWidth: 52,
      bridgeWidth: 21,
      templeLength: 145,
    },
    material: 'Acetato de Alta Densidade',
    colors: [
      { name: 'Preto Piano', hex: '#0f0f10', inStock: true },
      { name: 'Azul Cobalto', hex: '#1e3a8a', inStock: true }
    ],
    stock: 15,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    frameShape: 'geometrico',
    recommendedFaceShapes: ['redondo', 'oval'],
    rating: 4.9,
    reviewCount: 56
  },
  {
    id: 'drs-05',
    name: 'Gávea Minimalist Optical',
    category: 'grau',
    categoryLabel: 'Óculos de Grau',
    price: 159.90,
    originalPrice: 199.90,
    installments: 'ou 3x de R$ 53,30 sem juros',
    images: [
      leblonImg,
      arpoadorImg
    ],
    description: 'Linhas retas e sofisticadas para o ambiente urbano ou acadêmico. Frontal fino em aço cirúrgico preto fosco com ponteiras em acetato ergonômico.',
    features: [
      'Aço cirúrgico anticorrosão resistente a suor e umidade',
      'Apoio nasal anatômico em silicone suave',
      'Pronto para confecção de lentes monofocais ou multifocais',
      'Certificação internacional de segurança óptica'
    ],
    dimensions: {
      lensWidth: 51,
      bridgeWidth: 19,
      templeLength: 144,
    },
    material: 'Aço Cirúrgico & Silicone Soft',
    colors: [
      { name: 'Preto Matte', hex: '#18181b', inStock: true },
      { name: 'Prata Escovado', hex: '#94a3b8', inStock: true },
      { name: 'Dourado Champanhe', hex: '#d4af37', inStock: true }
    ],
    stock: 9,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    frameShape: 'retangular',
    recommendedFaceShapes: ['redondo', 'oval', 'coracao'],
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 'drs-06',
    name: 'Barra Wave Polarized Sport',
    category: 'lancamento',
    categoryLabel: 'Lançamentos',
    price: 189.90,
    originalPrice: 239.90,
    installments: 'ou 3x de R$ 63,30 sem juros',
    images: [
      ipanemaImg,
      arpoadorImg
    ],
    description: 'Edição limitada para quem pratica futevôlei, corrida na orla ou surf na Barra da Tijuca. Encaixe firme com grip emborrachado hidrofóbico nas têmporas e lentes espelhadas esmeralda.',
    features: [
      'Grip emborrachado que não escorrega com suor ou água do mar',
      'Lentes verdes esmeralda polarizadas espelhadas',
      'Campo visual panorâmico sem distorção periférica',
      'Estrutura ultra-resistente a impactos'
    ],
    dimensions: {
      lensWidth: 56,
      bridgeWidth: 17,
      templeLength: 140,
    },
    material: 'Polímero Resistente Grilamid TR90',
    colors: [
      { name: 'Preto & Verde Mar', hex: '#0f766e', inStock: true },
      { name: 'Grafite Fosco', hex: '#334155', inStock: true }
    ],
    stock: 7,
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    frameShape: 'quadrado',
    recommendedFaceShapes: ['oval', 'redondo'],
    rating: 5.0,
    reviewCount: 14
  },
  {
    id: 'drs-07',
    name: 'Santa Teresa Retro Tortoise',
    category: 'grau',
    categoryLabel: 'Óculos de Grau',
    price: 164.90,
    originalPrice: 204.90,
    installments: 'ou 3x de R$ 54,97 sem juros',
    images: [
      arpoadorImg,
      leblonImg
    ],
    description: 'Charme boêmio com espírito de Santa Teresa. Formato arredondado estilo panto clássico, feito para quem tem personalidade criativa e aprecia estética vintage com acabamento de alfaiataria.',
    features: [
      'Design panto clássico dos anos 60 revitalizado',
      'Acetato nobre com brilho profundo polido manualmente',
      'Ideal para rostos com traços marcados',
      'Suporta qualquer graduação e lentes Blue Light'
    ],
    dimensions: {
      lensWidth: 48,
      bridgeWidth: 22,
      templeLength: 145,
    },
    material: 'Acetato Italiano Tartaruga',
    colors: [
      { name: 'Tartaruga Clássico', hex: '#451a03', inStock: true },
      { name: 'Mel Translúcido', hex: '#ca8a04', inStock: true }
    ],
    stock: 14,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    frameShape: 'redondo',
    recommendedFaceShapes: ['quadrado', 'coracao'],
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 'drs-08',
    name: 'Kit Case Couro Vegano & Cordão Carioca',
    category: 'acessorio',
    categoryLabel: 'Acessórios',
    price: 69.90,
    originalPrice: 89.90,
    installments: 'ou 2x de R$ 34,95 sem juros',
    images: [
      conceptImg,
      ipanemaImg
    ],
    description: 'Proteção máxima e estilo praiano. Estojo rígido em couro ecológico caramelo com fecho magnético em latão e cordão exclusivo em corda náutica para você nunca perder seus óculos na praia ou no barco.',
    features: [
      'Couro ecológico resistente à água salgada e areia',
      'Forro interno em veludo macio antirrisco',
      'Cordão ajustável em corda marítima com acabamento emborrachado',
      'Flanela extra grande de limpeza ultra-sônica'
    ],
    dimensions: {
      lensWidth: 0,
      bridgeWidth: 0,
      templeLength: 0,
    },
    material: 'Couro Ecológico Premium & Corda Náutica',
    colors: [
      { name: 'Caramelo Natural', hex: '#92400e', inStock: true },
      { name: 'Preto Matte', hex: '#1c1917', inStock: true }
    ],
    stock: 35,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    frameShape: 'retangular',
    recommendedFaceShapes: ['todos'],
    rating: 5.0,
    reviewCount: 22
  }
];

export const LENS_TYPE_OPTIONS = [
  {
    id: 'solar_original',
    name: 'Lentes Originais UV400 / Polarizadas',
    description: 'Inclusas no produto. Proteção máxima contra reflexo d’água e radiação solar.',
    price: 0
  },
  {
    id: 'blue_uv_filter',
    name: 'Lentes Sem Grau c/ Filtro de Luz Azul (Trabalho/Telas)',
    description: 'Protege contra a fadiga visual causada por computadores e smartphones.',
    price: 59.90
  },
  {
    id: 'grau_monofocal',
    name: 'Lentes Monofocais com Grau (Miopia / Astigmatismo / Hipermetropia)',
    description: 'Lentes oftálmicas de resina premium antirreflexo. Envie a receita após a compra.',
    price: 129.90
  },
  {
    id: 'grau_multifocal',
    name: 'Lentes Multifocais Progressivas Premium',
    description: 'Campo visual contínuo para perto, meia distância e longe com antirreflexo.',
    price: 249.90
  }
];
