import { useState, useMemo } from 'react';
import { Search, Info, CheckCircle2, ArrowRight, ShoppingBag, X, Phone, ExternalLink } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCatalogProps {
  selectedCategory: 'grau' | 'sol' | 'lentes-cont' | 'lentes-oft';
  onCategoryChange: (category: 'grau' | 'sol' | 'lentes-cont' | 'lentes-oft') => void;
}

export default function ProductCatalog({ selectedCategory, onCategoryChange }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'grau', label: 'Óculos de Grau', desc: 'Armações anatômicas das melhores grifes mundiais' },
    { id: 'sol', label: 'Óculos de Sol', desc: 'Design, elegância e proteção UV400 completa' },
    { id: 'lentes-cont', label: 'Lentes de Contato', desc: 'Liberdade, hidratação e tecnologia para sua visão' },
    { id: 'lentes-oft', label: 'Lentes Oftálmicas', desc: 'Filtro azul, antirreflexo e multifocais sob medida' }
  ];

  // Get all unique tags for the active category to show as sub-filters
  const tagsForCategory = useMemo(() => {
    const items = PRODUCTS.filter(p => p.category === selectedCategory);
    const allTags = items.flatMap(item => item.tags);
    return Array.from(new Set(allTags));
  }, [selectedCategory]);

  // Filter products based on Category, Search, and Selected Sub-Tag
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? product.tags.includes(selectedTag) : true;
      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [selectedCategory, searchQuery, selectedTag]);

  // Reset sub-tag on category change
  const handleCategoryChange = (catId: 'grau' | 'sol' | 'lentes-cont' | 'lentes-oft') => {
    onCategoryChange(catId);
    setSelectedTag(null);
  };

  const getWhatsAppLink = (product: Product, store: string = 'Golden Shopping Calhau') => {
    const message = `Ol%C3%A1!%20Vi%20o%20produto%20%22${product.name}%22%20(${product.brand})%20no%20cat%C3%A1logo%20do%20site%20da%20Grandvision%20S%C3%A3o%20Lu%C3%ADs.%20Gostaria%20de%20saber%20a%20disponibilidade%20dele%20na%20unidade%20do%20${store}%20e%20fazer%20um%20or%C3%A7amento.`;
    return `https://api.whatsapp.com/send?phone=5598988764083&text=${message}`;
  };

  return (
    <section id="produtos" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-gray-100 pb-8">
          <div className="max-w-xl text-left">
            <span className="text-[11px] font-extrabold tracking-[0.2em] text-blue-900 uppercase block mb-3">
              COLEÇÃO EXCLUSIVA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-blue-950 tracking-tight">
              Portfólio de Produtos
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-3 leading-relaxed max-w-lg">
              Curadoria rigorosa de grifes internacionais e tecnologia óptica de alta precisão alemã. Design, sofisticação e leveza para o seu olhar.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="mt-8 md:mt-0 relative w-full md:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Buscar marca ou modelo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-blue-900 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-blue-900 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* 1. Categories Nav Tabs */}
        <div className="border-b border-gray-150 mb-10 overflow-x-auto scrollbar-none">
          <div className="flex space-x-10 min-w-max pb-px">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id as any)}
                className={`pb-4 text-sm font-semibold tracking-wider uppercase transition-all relative cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'text-blue-950 border-b-2 border-blue-900 font-bold'
                    : 'text-gray-400 hover:text-blue-900 border-b-2 border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Category description & Tag sub-filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <p className="text-xs tracking-wider uppercase text-gray-400 font-bold text-left">
            — {categories.find(c => c.id === selectedCategory)?.desc}
          </p>
          
          {/* Sub-tags list */}
          {tagsForCategory.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-start">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all ${
                  selectedTag === null
                    ? 'bg-blue-950 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              {tagsForCategory.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all ${
                    selectedTag === tag
                      ? 'bg-blue-950 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-gray-100 rounded-3xl">
            <p className="text-gray-500 font-medium">Nenhum produto encontrado na busca atual.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
              className="mt-3 text-sm font-bold text-blue-900 hover:underline"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-100/30 hover:shadow-2xl hover:shadow-blue-950/5 hover:-translate-y-1 hover:border-blue-900/10 transition-all duration-300 relative text-left"
              >
                
                {/* Brand Tag Float */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm border border-gray-100/50">
                  <span className="text-[10px] font-extrabold text-blue-950 uppercase tracking-widest">{product.brand}</span>
                </div>

                {/* Badge Float */}
                <div className="absolute top-4 right-4 z-10 bg-amber-500 text-white font-bold text-[9px] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                  {product.priceIndicator}
                </div>

                {/* Product Image */}
                <div 
                  className="aspect-[4/3] w-full bg-gray-50 overflow-hidden relative cursor-pointer"
                  onClick={() => setActiveDetailProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = product.fallbackImage || "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/10 transition-colors duration-300" />
                </div>

                {/* Body Content */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  
                  <div className="space-y-2">
                    <h3 
                      className="text-base font-extrabold text-blue-950 group-hover:text-blue-900 transition-colors line-clamp-1 cursor-pointer"
                      onClick={() => setActiveDetailProduct(product)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed h-8">
                      {product.description}
                    </p>

                    {/* Quick Bullet List (2 items max) */}
                    <div className="pt-2 flex flex-col space-y-1">
                      {product.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5 text-[10px] text-gray-600 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between space-x-2">
                    <button
                      onClick={() => setActiveDetailProduct(product)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-gray-600 hover:text-blue-900 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Detalhes</span>
                    </button>
                    
                    <a
                      href={getWhatsAppLink(product)}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center space-x-1 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs px-3.5 py-2.5 rounded-2xl shadow-md shadow-blue-900/5 hover:shadow-blue-900/15 transform hover:-translate-y-0.5 transition-all"
                    >
                      <span>Tenho Interesse</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* 3. Product Details Drawer / Modal Backdrop */}
      <AnimatePresence>
        {activeDetailProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            
            {/* Dark Mask Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailProduct(null)}
              className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden text-left z-10 flex flex-col md:flex-row"
            >
              
              {/* Close Button float */}
              <button
                onClick={() => setActiveDetailProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 hover:text-blue-950 border border-gray-200 shadow-sm transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Image Area */}
              <div className="md:w-5/12 relative aspect-[4/3] md:aspect-auto md:min-h-[400px] bg-gray-50">
                <img
                  src={activeDetailProduct.image}
                  alt={activeDetailProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = activeDetailProduct.fallbackImage || "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-150 shadow-sm w-fit">
                    <span className="text-[10px] font-extrabold text-blue-950 uppercase tracking-widest">{activeDetailProduct.brand}</span>
                  </div>
                  <a
                    href={activeDetailProduct.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-gray-150 shadow-sm text-[9px] font-bold text-gray-700 hover:text-blue-900 transition-colors w-fit"
                    title="Visualizar imagem pelo link"
                  >
                    <ExternalLink className="w-3 h-3 text-gray-500" />
                    <span>Ver Imagem no Link</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Information details */}
              <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
                
                <div className="space-y-4">
                  {/* Category Indicator */}
                  <span className="text-[10px] font-extrabold tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg uppercase">
                    {categories.find(c => c.id === activeDetailProduct.category)?.label}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-blue-950 mt-1">
                    {activeDetailProduct.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {activeDetailProduct.description}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">Diferenciais e Tecnologia</span>
                    <div className="grid grid-cols-1 gap-2">
                      {activeDetailProduct.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Store Preference Indicator (Minimalist) */}
                  <div className="pt-4 border-t border-gray-100 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Unidade Única</span>
                    <span className="text-xs font-semibold text-gray-800 block">Golden Shopping Calhau</span>
                  </div>
                </div>

                {/* Confirm Interest Action CTA */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Compromisso</span>
                    <span className="text-xs font-bold text-emerald-600 block">Garantia de Adaptação</span>
                  </div>
                  <a
                    href={getWhatsAppLink(activeDetailProduct)}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Perguntar no WhatsApp</span>
                  </a>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
