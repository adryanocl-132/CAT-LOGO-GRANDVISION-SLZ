import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  onNavClick: (category: 'grau' | 'sol' | 'lentes-cont') => void;
  selectedCategory: 'grau' | 'sol' | 'lentes-cont' | 'lentes-oft';
}

export default function Header({ onNavClick, selectedCategory }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { id: 'grau', label: 'Óculos de Grau' },
    { id: 'sol', label: 'Óculos de Sol' },
    { id: 'lentes-cont', label: 'Lentes de Contato' }
  ] as const;

  const whatsappLink = "https://api.whatsapp.com/send?phone=5598988764083&text=Ol%C3%A1!%20Visitei%20o%20site%20da%20Grandvision%20S%C3%A3o%20Lu%C3%ADs%20e%20gostaria%20de%20falar%20com%20um%20consultor%20agora.";

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/50 py-4'
            : 'bg-white/80 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Logo */}
          <div 
            onClick={handleLogoClick}
            className="cursor-pointer transition-transform duration-300 active:scale-95 shrink-0"
          >
            <img
              src="https://drive.google.com/thumbnail?id=17mPSBOzXFw0mqq8WLiCfsMyjnRNWOzh4&sz=w1000"
              alt=""
              className={`object-contain transition-all duration-300 ${
                isScrolled ? 'h-9 sm:h-11' : 'h-14 sm:h-16'
              }`}
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback to direct UC URL if thumbnail has any issues
                e.currentTarget.src = "https://drive.google.com/uc?export=view&id=17mPSBOzXFw0mqq8WLiCfsMyjnRNWOzh4";
              }}
            />
          </div>

          {/* Center: Minimal Navigation Menu for Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavClick(link.id)}
                className={`text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer relative py-1.5 ${
                  selectedCategory === link.id
                    ? 'text-blue-950 font-extrabold'
                    : 'text-gray-400 hover:text-blue-900'
                }`}
              >
                {link.label}
                {selectedCategory === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-900 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right: CTA / WhatsApp shortcut */}
          <div className="hidden md:flex items-center">
            <a
              href={whatsappLink}
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold tracking-wider uppercase text-[10px] px-5 py-2.5 rounded-2xl shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Phone className="w-3 h-3" />
              <span>Consultor</span>
            </a>
          </div>

          {/* Mobile Hamburguer */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href={whatsappLink}
              target="_blank"
              referrerPolicy="no-referrer"
              className="p-2 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
              title="Falar no WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border border-gray-150"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-white pt-24 px-6 flex flex-col justify-start space-y-8 animate-fade-in">
          <div className="flex flex-col space-y-5">
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">PRODUTOS</span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setIsOpen(false);
                  onNavClick(link.id);
                }}
                className={`w-full text-left py-3 px-4 rounded-2xl font-bold text-sm tracking-wider uppercase transition-colors ${
                  selectedCategory === link.id
                    ? 'text-blue-900 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col space-y-4">
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">ATENDIMENTO</span>
            <a
              href={whatsappLink}
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full text-center py-4 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs tracking-wider uppercase shadow-md flex items-center justify-center space-x-2"
            >
              <Phone className="w-4.5 h-4.5" />
              <span>Falar com Consultor</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
