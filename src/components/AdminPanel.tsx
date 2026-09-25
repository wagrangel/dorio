import React, { useState } from 'react';
import { 
  X, 
  Package, 
  ShoppingBag, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  DollarSign, 
  TrendingUp, 
  Check, 
  AlertTriangle,
  Eye
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory, OrderStatus, ProductColor, FrameShape, FaceShape } from '../types';

export const AdminPanel: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProductsToDefault,
    orders, 
    updateOrderStatus,
    settings, 
    updateSettings 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'metrics' | 'products' | 'orders' | 'settings'>('metrics');

  // Product Form State (for Add or Edit)
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('solar');
  const [formPrice, setFormPrice] = useState('159.90');
  const [formOriginalPrice, setFormOriginalPrice] = useState('199.90');
  const [formStock, setFormStock] = useState('15');
  const [formMaterial, setFormMaterial] = useState('Acetato Nobre Polido');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formFrameShape, setFormFrameShape] = useState<FrameShape>('quadrado');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsBestSeller, setFormIsBestSeller] = useState(false);

  // Settings form
  const [localWhatsapp, setLocalWhatsapp] = useState(settings.whatsappNumber);
  const [localAnnouncement, setLocalAnnouncement] = useState(settings.announcementText);
  const [localFreeShipping, setLocalFreeShipping] = useState(settings.freeShippingThreshold.toString());
  const [isSettingsSaved, setIsSettingsSaved] = useState(false);

  // Selected Order Detail Modal in Admin
  const [viewingOrder, setViewingOrder] = useState<any | null>(null);

  if (!isAdminOpen) return null;

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;
  const averageTicket = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const lowStockProducts = products.filter(p => p.stock <= 5);

  const openNewProductModal = () => {
    setIsEditingProduct(true);
    setEditingProductId(null);
    setFormName('');
    setFormCategory('solar');
    setFormPrice('159.90');
    setFormOriginalPrice('');
    setFormStock('15');
    setFormMaterial('Acetato Nobre Polido');
    setFormDescription('Armação com design carioca, acabamento premium e lentes de proteção solar.');
    setFormImageUrl(products[0]?.images[0] || '');
    setFormFrameShape('quadrado');
    setFormIsFeatured(false);
    setFormIsBestSeller(false);
  };

  const openEditProductModal = (product: Product) => {
    setIsEditingProduct(true);
    setEditingProductId(product.id);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(product.price.toString());
    setFormOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
    setFormStock(product.stock.toString());
    setFormMaterial(product.material);
    setFormDescription(product.description);
    setFormImageUrl(product.images[0]);
    setFormFrameShape(product.frameShape);
    setFormIsFeatured(!!product.isFeatured);
    setFormIsBestSeller(!!product.isBestSeller);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(formPrice) || 149.90;
    const origPriceNum = formOriginalPrice ? parseFloat(formOriginalPrice) : undefined;
    const stockNum = parseInt(formStock) || 10;

    const defaultColors: ProductColor[] = [
      { name: 'Preto Clássico', hex: '#111111', inStock: true },
      { name: 'Tartaruga Âmbar', hex: '#5c3317', inStock: true }
    ];

    const categoryLabels: Record<ProductCategory, string> = {
      solar: 'Óculos de Sol',
      grau: 'Óculos de Grau',
      lancamento: 'Lançamentos',
      acessorio: 'Acessórios'
    };

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: formName,
        category: formCategory,
        categoryLabel: categoryLabels[formCategory],
        price: priceNum,
        originalPrice: origPriceNum,
        installments: `ou 3x de R$ ${(priceNum / 3).toFixed(2).replace('.', ',')} sem juros`,
        stock: stockNum,
        material: formMaterial,
        description: formDescription,
        images: formImageUrl ? [formImageUrl, ...products.find(p => p.id === editingProductId)?.images.slice(1) || []] : undefined,
        frameShape: formFrameShape,
        isFeatured: formIsFeatured,
        isBestSeller: formIsBestSeller
      });
    } else {
      addProduct({
        name: formName,
        category: formCategory,
        categoryLabel: categoryLabels[formCategory],
        price: priceNum,
        originalPrice: origPriceNum,
        installments: `ou 3x de R$ ${(priceNum / 3).toFixed(2).replace('.', ',')} sem juros`,
        stock: stockNum,
        material: formMaterial,
        description: formDescription,
        images: [formImageUrl || products[0].images[0]],
        features: [
          '100% Proteção UVA/UVB 400',
          'Lentes Polarizadas de alta definição',
          'Acetato nobre italiano com alma metálica',
          'Acompanha estojo rígido sustentável'
        ],
        dimensions: {
          lensWidth: 52,
          bridgeWidth: 20,
          templeLength: 145
        },
        colors: defaultColors,
        frameShape: formFrameShape,
        recommendedFaceShapes: ['oval', 'redondo'],
        rating: 5.0,
        reviewCount: 0,
        isFeatured: formIsFeatured,
        isBestSeller: formIsBestSeller,
        isNew: true
      });
    }

    setIsEditingProduct(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      whatsappNumber: localWhatsapp,
      announcementText: localAnnouncement,
      freeShippingThreshold: parseFloat(localFreeShipping) || 199,
    });
    setIsSettingsSaved(true);
    setTimeout(() => setIsSettingsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-stone-900">
                Painel Administrativo · Do Rio Sungless
              </h2>
              <p className="text-xs text-stone-500">
                Gerencie catálogo de produtos, pedidos recebidos e configurações da loja
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-50 border-b border-stone-200 px-5 flex items-center gap-6 text-xs font-bold uppercase tracking-wider overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'metrics'
                ? 'border-black text-black'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Métricas da Loja</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-black text-black'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Produtos ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-black text-black'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pedidos ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'border-black text-black'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configurações & WhatsApp</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 flex-1 overflow-y-auto">
          
          {/* TAB 1: METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
                    <span className="font-semibold uppercase tracking-wider">Faturamento Total</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="font-display font-extrabold text-2xl text-stone-900 tabular-nums">
                    R$ {totalRevenue.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">Soma de todos os pedidos</p>
                </div>

                <div className="p-5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
                    <span className="font-semibold uppercase tracking-wider">Total de Pedidos</span>
                    <ShoppingBag className="w-4 h-4 text-sky-600" />
                  </div>
                  <p className="font-display font-extrabold text-2xl text-stone-900 tabular-nums">
                    {totalOrdersCount}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">Concluídos e pendentes</p>
                </div>

                <div className="p-5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
                    <span className="font-semibold uppercase tracking-wider">Ticket Médio</span>
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="font-display font-extrabold text-2xl text-stone-900 tabular-nums">
                    R$ {averageTicket.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">Média por compra</p>
                </div>

                <div className="p-5 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
                    <span className="font-semibold uppercase tracking-wider">Estoque Baixo</span>
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  </div>
                  <p className="font-display font-extrabold text-2xl text-stone-900 tabular-nums">
                    {lowStockProducts.length} itens
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">Com 5 unidades ou menos</p>
                </div>
              </div>

              {/* Low Stock Warning Banner */}
              {lowStockProducts.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900">
                  <h4 className="font-bold flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Atenção para Reposição de Estoque:</span>
                  </h4>
                  <p>
                    Os seguintes modelos estão acabando: {lowStockProducts.map(p => `${p.name} (${p.stock} un)`).join(', ')}.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRODUCTS CRUD */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
                <div>
                  <h3 className="font-display font-bold text-base text-stone-900">
                    Catálogo de Produtos
                  </h3>
                  <p className="text-xs text-stone-500">
                    Cadastre novos óculos, edite preços ou ajuste quantidades em estoque
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={resetProductsToDefault}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
                    title="Restaura os modelos padrão da Do Rio Sungless"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar Catálogo</span>
                  </button>

                  <button
                    type="button"
                    onClick={openNewProductModal}
                    className="bg-[#121212] hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Novo Produto</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-semibold border-b border-stone-200">
                    <tr>
                      <th className="p-3">Modelo</th>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Preço</th>
                      <th className="p-3">Estoque</th>
                      <th className="p-3">Destaque</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-12 h-10 object-cover rounded-lg bg-stone-100 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-stone-900">{prod.name}</p>
                              <p className="text-[11px] text-stone-500">{prod.material}</p>
                            </div>
                          </div>
                        </td>

                        <td className="p-3 font-medium text-stone-700">
                          {prod.categoryLabel}
                        </td>

                        <td className="p-3 font-bold text-stone-900 tabular-nums">
                          R$ {prod.price.toFixed(2).replace('.', ',')}
                        </td>

                        <td className="p-3">
                          <span className={`font-semibold tabular-nums ${prod.stock <= 5 ? 'text-rose-600' : 'text-stone-700'}`}>
                            {prod.stock} un.
                          </span>
                        </td>

                        <td className="p-3">
                          {prod.isFeatured ? (
                            <span className="text-emerald-700 font-semibold">Sim</span>
                          ) : (
                            <span className="text-stone-400">Não</span>
                          )}
                        </td>

                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => openEditProductModal(prod)}
                              className="p-1.5 text-stone-600 hover:text-black hover:bg-stone-100 rounded-lg transition-colors"
                              title="Editar Produto"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Deseja realmente excluir o produto "${prod.name}"?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Excluir Produto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="border-b border-stone-200 pb-2">
                <h3 className="font-display font-bold text-base text-stone-900">
                  Histórico de Pedidos Recebidos
                </h3>
                <p className="text-xs text-stone-500">
                  Acompanhe os pedidos gerados na loja e atualize o status de entrega
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  Nenhum pedido recebido ainda.
                </div>
              ) : (
                <div className="overflow-x-auto border border-stone-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-semibold border-b border-stone-200">
                      <tr>
                        <th className="p-3">Código</th>
                        <th className="p-3">Cliente</th>
                        <th className="p-3">Itens</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Pagamento</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Detalhes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="p-3 font-mono font-bold text-stone-900">
                            #{order.code}
                          </td>

                          <td className="p-3">
                            <p className="font-bold text-stone-900">{order.customer.name}</p>
                            <p className="text-[11px] text-stone-500">{order.customer.phone}</p>
                          </td>

                          <td className="p-3 text-stone-600">
                            {order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                          </td>

                          <td className="p-3 font-bold text-stone-900 tabular-nums">
                            R$ {order.total.toFixed(2).replace('.', ',')}
                          </td>

                          <td className="p-3 uppercase text-[11px] font-semibold text-stone-600">
                            {order.paymentMethod}
                          </td>

                          <td className="p-3">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                              className="bg-stone-100 border border-stone-300 rounded px-2 py-1 text-[11px] font-bold uppercase cursor-pointer"
                            >
                              <option value="pendente">Pendente</option>
                              <option value="pago">Pago</option>
                              <option value="enviado">Enviado</option>
                              <option value="entregue">Entregue</option>
                              <option value="cancelado">Cancelado</option>
                            </select>
                          </td>

                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => setViewingOrder(order)}
                              className="p-1.5 text-stone-600 hover:text-black hover:bg-stone-100 rounded-lg"
                              title="Ver Comprovante"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-5 max-w-xl">
              <div>
                <h3 className="font-display font-bold text-base text-stone-900">
                  Configurações da Loja
                </h3>
                <p className="text-xs text-stone-500">
                  Ajuste o número de atendimento do WhatsApp e o banner promocional
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Número do WhatsApp de Vendas (com DDI e DDD)
                </label>
                <input
                  type="text"
                  value={localWhatsapp}
                  onChange={(e) => setLocalWhatsapp(e.target.value)}
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 bg-white"
                  placeholder="5521999999999"
                />
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Os pedidos com botão "Comprar via WhatsApp" serão direcionados para este número.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Texto da Faixa Superior (Aviso no Topo)
                </label>
                <input
                  type="text"
                  value={localAnnouncement}
                  onChange={(e) => setLocalAnnouncement(e.target.value)}
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Valor Mínimo para Frete Grátis (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={localFreeShipping}
                  onChange={(e) => setLocalFreeShipping(e.target.value)}
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#121212] hover:bg-black text-white text-xs font-bold px-6 py-3 rounded-xl uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
                >
                  {isSettingsSaved ? <Check className="w-4 h-4 text-emerald-400" /> : null}
                  <span>{isSettingsSaved ? 'Configurações Salvas!' : 'Salvar Alterações'}</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Modal Sub-Window: Add / Edit Product */}
        {isEditingProduct && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-stone-200">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-200">
                <h3 className="font-display font-bold text-base text-stone-900">
                  {editingProductId ? 'Editar Produto' : 'Cadastrar Novo Modelo'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditingProduct(false)}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Nome do Modelo *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="ex: Arpoador Tortoise Gold"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Categoria *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-white"
                    >
                      <option value="solar">Óculos de Sol</option>
                      <option value="grau">Óculos de Grau</option>
                      <option value="lancamento">Lançamentos</option>
                      <option value="acessorio">Acessórios</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Formato da Armação</label>
                    <select
                      value={formFrameShape}
                      onChange={(e) => setFormFrameShape(e.target.value as FrameShape)}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2 bg-white"
                    >
                      <option value="quadrado">Quadrado</option>
                      <option value="redondo">Redondo</option>
                      <option value="aviador">Aviador</option>
                      <option value="gatinho">Gatinho</option>
                      <option value="retangular">Retangular</option>
                      <option value="geometrico">Geométrico</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Preço (R$) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Preço De (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formOriginalPrice}
                      onChange={(e) => setFormOriginalPrice(e.target.value)}
                      placeholder="Opcional"
                      className="w-full border border-stone-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Estoque *</label>
                    <input
                      type="number"
                      required
                      value={formStock}
                      onChange={(e) => setFormStock(e.target.value)}
                      className="w-full border border-stone-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Material</label>
                  <input
                    type="text"
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value)}
                    placeholder="Acetato Italiano Nobre"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">URL da Imagem</label>
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="URL ou path da imagem"
                    className="w-full border border-stone-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Descrição</label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={(e) => setFormIsFeatured(e.target.checked)}
                      className="accent-black"
                    />
                    <span>Produto em Destaque</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsBestSeller}
                      onChange={(e) => setFormIsBestSeller(e.target.checked)}
                      className="accent-black"
                    />
                    <span>Mais Vendido</span>
                  </label>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsEditingProduct(false)}
                    className="px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[#121212] text-white px-5 py-2 rounded-lg font-bold hover:bg-black"
                  >
                    Salvar Produto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Order Details */}
        {viewingOrder && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-xs space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <h4 className="font-display font-bold text-base text-stone-900">
                  Detalhes do Pedido #{viewingOrder.code}
                </h4>
                <button
                  type="button"
                  onClick={() => setViewingOrder(null)}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <p><strong>Cliente:</strong> {viewingOrder.customer.name}</p>
                <p><strong>WhatsApp:</strong> {viewingOrder.customer.phone}</p>
                <p><strong>E-mail:</strong> {viewingOrder.customer.email}</p>
                <p><strong>CPF:</strong> {viewingOrder.customer.cpf}</p>
                <p><strong>Endereço:</strong> {viewingOrder.customer.street}, {viewingOrder.customer.number} {viewingOrder.customer.complement || ''} - {viewingOrder.customer.neighborhood}, {viewingOrder.customer.city}/{viewingOrder.customer.state} (CEP: {viewingOrder.customer.cep})</p>
                <p><strong>Forma de Pagamento:</strong> {viewingOrder.paymentMethod.toUpperCase()}</p>
                <p><strong>Status Atual:</strong> {viewingOrder.status.toUpperCase()}</p>
              </div>

              <div className="border-t border-stone-200 pt-3">
                <h5 className="font-bold mb-2">Itens Comprados:</h5>
                {viewingOrder.items.map((it: any, idx: number) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-stone-100">
                    <span>{it.quantity}x {it.product.name} ({it.selectedColor.name})</span>
                    <span className="font-semibold">R$ {((it.product.price + it.additionalLensPrice) * it.quantity).toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-sm pt-2 text-stone-900">
                  <span>Total do Pedido:</span>
                  <span>R$ {viewingOrder.total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                className="w-full bg-[#121212] text-white py-2.5 rounded-xl font-bold mt-2"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
