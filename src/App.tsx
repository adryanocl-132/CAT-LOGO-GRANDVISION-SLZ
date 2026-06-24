/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import BrandAndStyleShowcase from './components/BrandAndStyleShowcase';
import Footer from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'grau' | 'sol' | 'lentes-cont' | 'lentes-oft'>('grau');

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (category: 'grau' | 'sol' | 'lentes-cont') => {
    setSelectedCategory(category);
    handleScrollToSection('produtos');
  };

  const whatsappLink = "https://api.whatsapp.com/send?phone=5598988764083&text=Ol%C3%A1!%20Visitei%20o%20site%20da%20Grandvision%20S%C3%A3o%20Lu%C3%ADs%20e%20gostaria%20de%20falar%20com%20um%20consultor%20agora.";

  const handleRedirectToWhatsapp = () => {
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased selection:bg-blue-900/10 selection:text-blue-950">
      
      {/* 1. Sticky Navigation Header */}
      <Header onNavClick={handleNavClick} selectedCategory={selectedCategory} />

      {/* 2. Impact Hero Banner */}
      <Hero 
        onScheduleClick={handleRedirectToWhatsapp} 
        onExploreClick={() => handleScrollToSection('produtos')} 
      />

      {/* 3. Tabbed Interactive Product Catalog (Portfólio) */}
      <div id="produtos">
        <ProductCatalog selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      </div>

      {/* 4. Animated Brands and Styles Showcase (Visagismo Guide) */}
      <BrandAndStyleShowcase />

      {/* 5. Complete contact and social footer */}
      <Footer />

      {/* FLOATING ACTION CTA BAR (WhatsApp shortcut) */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Floating WhatsApp trigger */}
        <a
          href={whatsappLink}
          target="_blank"
          referrerPolicy="no-referrer"
          className="p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-600/30 border border-emerald-700 hover:-translate-y-0.5 transition-all flex items-center justify-center group"
          title="Falar no WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-bold transition-all duration-300">
            Atendimento Online
          </span>
        </a>
      </div>

    </div>
  );
}
