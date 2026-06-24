import { Glasses, Mail, Phone, MapPin, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { STORES } from '../data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8 border-t border-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 text-left mb-16">
          
          {/* Col 1: Brand details - 4 cols */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm inline-block border border-white/10 max-w-[200px]">
              <img
                src="https://drive.google.com/thumbnail?id=17mPSBOzXFw0mqq8WLiCfsMyjnRNWOzh4&sz=w1000"
                alt=""
                className="h-10 object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://drive.google.com/uc?export=view&id=17mPSBOzXFw0mqq8WLiCfsMyjnRNWOzh4";
                }}
              />
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Cuidando da sua saúde visual com o padrão internacional do maior grupo ótico do mundo. Tecnologia alemã, visagismo e as melhores grifes pertinho de você em São Luís.
            </p>

            <div className="flex space-x-3.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 hover:text-amber-400 transition-all border border-white/5"
                title="Instagram Grandvision SLZ"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 hover:text-amber-400 transition-all border border-white/5"
                title="Facebook Grandvision SLZ"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Store units - 4 cols */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">Endereço Unidade</h4>
            <div className="space-y-2">
              <span className="text-xs font-bold text-white block">Golden Shopping Calhau</span>
              <span className="text-[11px] text-gray-300 block leading-relaxed">
                Av. dos Holandeses, 200 - Loja 107 - Piso L1<br />
                Calhau, São Luís - MA, CEP 65071-380
              </span>
              <a
                href="tel:98988764083"
                className="text-xs text-gray-300 hover:text-amber-400 transition-colors block font-medium pt-1"
              >
                📞 (98) 98876-4083
              </a>
            </div>
          </div>

          {/* Col 3: Central contact and hours - 3 cols */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">Atendimento</h4>
            <div className="space-y-3.5 text-xs text-gray-300">
              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-semibold text-white block">WhatsApp</span>
                  <a href="https://api.whatsapp.com/send?phone=5598988764083" target="_blank" referrerPolicy="no-referrer" className="hover:text-amber-400 transition-colors">
                    (98) 98876-4083
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Divider line */}
        <div className="border-t border-blue-900/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center sm:justify-start">
            <span>&copy; {currentYear} Óticas Grandvision by Fototica São Luís. Todos os direitos reservados.</span>
            <span className="hidden sm:inline">|</span>
            <span>CNPJ: 12.307.394/0003-76</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white transition-colors border border-blue-800 flex items-center justify-center shadow-lg cursor-pointer"
            title="Voltar ao Topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

      </div>
    </footer>
  );
}
