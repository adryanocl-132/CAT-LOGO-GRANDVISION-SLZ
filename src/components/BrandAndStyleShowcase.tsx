import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Compass, 
  HelpCircle, 
  Glasses, 
  Check, 
  ArrowRight, 
  MessageSquare,
  Bookmark,
  Heart,
  UserCheck
} from 'lucide-react';

interface Brand {
  name: string;
  tagline: string;
}

const BRANDS: Brand[] = [
  { name: 'Ray-Ban', tagline: 'Lendário & Autêntico' },
  { name: 'Tory Burch', tagline: 'Chic & Boho-Moderno' },
  { name: 'Miu Miu', tagline: 'Alta Costura Vanguardista' },
  { name: 'Vogue Eyewear', tagline: 'Estilo Cosmopolita' },
  { name: 'Prada', tagline: 'Luxo & Sofisticação Italiana' },
  { name: 'Oakley', tagline: 'Performance & Tecnologia' },
  { name: 'Dolce & Gabbana', tagline: 'Glamour Barroco' },
  { name: 'Carrera', tagline: 'Audácia & Adrenalina' },
  { name: 'Gucci', tagline: 'Opulência de Design' },
  { name: 'Tiffany & Co.', tagline: 'Elegância Atemporal' }
];

interface EyewearStyle {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  faceMatch: string;
  visagismoTip: string;
  features: string[];
}

const EYEWEAR_STYLES: EyewearStyle[] = [
  {
    id: 'gatinho',
    name: 'Gatinho / Cat-Eye',
    subtitle: 'Glamour dos Anos 50 & 60',
    description: 'Com as extremidades superiores levemente pontiagudas, o formato Gatinho levanta o olhar, trazendo sofisticação imediata e um charme retrô-feminino incomparável.',
    faceMatch: 'Rostos Redondos, Ovais e de Coração',
    visagismoTip: 'Excelente para suavizar queixos finos e destacar as maçãs do rosto com elegância dramática.',
    features: ['Realça e levanta o olhar', 'Efeito "lifting" natural no rosto', 'Ícone de feminilidade clássica']
  },
  {
    id: 'redondo',
    name: 'Redondo / Phantos',
    subtitle: 'Alma Intelectual & Boêmia',
    description: 'De apelo artístico e intelectual, as curvas suaves do Phantos suavizam traços faciais fortes e angulares com leveza e extremo requinte moderno.',
    faceMatch: 'Rostos Quadrados, Retangulares e Angulares',
    visagismoTip: 'Seu formato circular ajuda a suavizar linhas duras do maxilar, adicionando equilíbrio e uma assinatura de estilo.',
    features: ['Aparência culta e atemporal', 'Suavização perfeita de ângulos', 'Estética minimalista sofisticada']
  },
  {
    id: 'aviador',
    name: 'Aviador / Ponte Dupla',
    subtitle: 'O Ícone Clássico da Liberdade',
    description: 'Com sua consagrada ponte dupla metálica e lentes estilo gota, o clássico Aviador exala espírito de aventura, atitude assertiva e elegância unissex duradoura.',
    faceMatch: 'Quase todos os formatos (Universal)',
    visagismoTip: 'Um curinga do visagismo que se adapta perfeitamente, proporcionando proporção harmônica tanto para homens quanto para mulheres.',
    features: ['Ajuste universal clássico', 'Ponte dupla com apelo retrô', 'Estilo versátil para sol ou grau']
  },
  {
    id: 'oval',
    name: 'Oval Clássico',
    subtitle: 'A Estética do Equilíbrio Fluido',
    description: 'Formas ovais alongadas que circundam o olhar com delicadeza e discrição, ideal para quem preza por um design suave que não domine as expressões do rosto.',
    faceMatch: 'Rostos Quadrados, Diamante e Triangulares',
    visagismoTip: 'Valoriza os traços naturais sem carregar o semblante, ótimo para o uso cotidiano confortável.',
    features: ['Leveza visual excepcional', 'Encaixe anatômico sutil', 'Design equilibrado e minimalista']
  },
  {
    id: 'geometrico',
    name: 'Geométrico / Facetado',
    subtitle: 'Vanguarda & Expressão Arrojada',
    description: 'Armações hexagonais, octogonais ou de recortes marcantes. O modelo geométrico quebra a mesmice das linhas curvas e retas com pura atitude de design contemporâneo.',
    faceMatch: 'Rostos Ovais, Redondos e Triângulo Invertido',
    visagismoTip: 'As linhas angulares extras criam pontos de luz e sombra no rosto, perfeitos para quem busca ditar tendências.',
    features: ['Design moderno premiado', 'Destaque e personalidade imediata', 'Acabamentos chanfrados refinados']
  },
  {
    id: 'quadrado',
    name: 'Quadrado / Retangular',
    subtitle: 'Imponência & Força Estruturada',
    description: 'Linhas retas e imponentes que delimitam o olhar com muita segurança e personalidade, transmitindo confiabilidade, foco, estabilidade e elegância arquitetônica.',
    faceMatch: 'Rostos Redondos, Ovais e Maçãs Proeminentes',
    visagismoTip: 'As linhas rígidas criam ilusão de alongamento em rostos mais circulares, estruturando a fisionomia perfeitamente.',
    features: ['Transmite firmeza e autoridade', 'Contorno estruturado do olhar', 'Ideal para perfis corporativos/modernos']
  }
];

export default function BrandAndStyleShowcase() {
  const [selectedStyle, setSelectedStyle] = useState<EyewearStyle>(EYEWEAR_STYLES[0]);

  return (
    <section id="marcas-e-estilos" className="py-24 bg-gradient-to-b from-white via-slate-50 to-white border-t border-slate-100 overflow-hidden text-left relative">
      {/* Decorative background vectors */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-50/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-black text-blue-900 tracking-widest uppercase bg-blue-50 px-4 py-2 rounded-full inline-block border border-blue-100/50 mb-4">
            Curadoria Exclusiva
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Nossas Marcas & Estilos de Óculos
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed font-light">
            No Golden Shopping Calhau, reunimos as melhores grifes globais e os designs de óculos mais cobiçados do mundo. Explore as opções e encontre o caimento ideal baseado no visagismo.
          </p>
        </div>

        {/* 1. INFINITE BRAND TICKER (ANIMATED MARQUEE WITH NO GAP) */}
        <div className="mb-24">
          <h3 className="text-center text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-8">
            Garantia de Autenticidade Internacional
          </h3>
          
          <div className="relative w-full overflow-hidden py-6 border-y border-slate-100 bg-white/50 backdrop-blur-sm shadow-sm rounded-2xl">
            {/* Fade overlays on edges */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
            
            <div className="flex whitespace-nowrap overflow-hidden">
              <div className="animate-marquee flex items-center space-x-12 sm:space-x-20">
                {/* First cycle of brands */}
                {BRANDS.map((brand, idx) => (
                  <div key={`brand-c1-${idx}`} className="inline-flex flex-col items-center justify-center px-4">
                    <span className="text-lg sm:text-2xl font-black tracking-tighter text-slate-900 hover:text-blue-900 transition-colors duration-300">
                      {brand.name}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {brand.tagline}
                    </span>
                  </div>
                ))}
                {/* Duplicate cycle to ensure flawless looping */}
                {BRANDS.map((brand, idx) => (
                  <div key={`brand-c2-${idx}`} className="inline-flex flex-col items-center justify-center px-4">
                    <span className="text-lg sm:text-2xl font-black tracking-tighter text-slate-900 hover:text-blue-900 transition-colors duration-300">
                      {brand.name}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {brand.tagline}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE STYLE EXPLORER ARCHITECTURE */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left side: Styles Nav Button Group (lg:col-span-4) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="mb-6">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block mb-1">
                  Guia de Visagismo
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Encontre sua Silhueta
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Selecione um estilo para visualizar as orientações de formato e harmonização de rosto.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {EYEWEAR_STYLES.map((style) => {
                  const isSelected = selectedStyle.id === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style)}
                      className={`w-full p-4 sm:p-5 text-left rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-950 border-blue-950 text-white shadow-lg shadow-blue-950/15 translate-x-2'
                          : 'bg-slate-50/50 hover:bg-slate-100 border-slate-100 text-slate-700 hover:border-slate-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-black block tracking-tight uppercase opacity-60">
                          {style.subtitle}
                        </span>
                        <span className={`text-base sm:text-lg font-black tracking-tight block ${isSelected ? 'text-white' : 'text-slate-900 group-hover:text-blue-950'}`}>
                          {style.name}
                        </span>
                      </div>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        isSelected ? 'bg-amber-400 text-slate-900' : 'bg-white text-slate-400 border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-900 group-hover:border-blue-100/50'
                      }`}>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side: Selected Style Dynamic Interactive Artwork Card (lg:col-span-8) */}
            <div className="lg:col-span-7 bg-slate-50/50 border border-slate-100 rounded-3xl p-6 sm:p-8 relative min-h-[480px] flex flex-col justify-between">
              
              {/* Dynamic abstract graphic background representing glasses frame shape */}
              <div className="absolute top-6 right-6 opacity-5 select-none pointer-events-none">
                <Glasses className="w-56 h-56 text-slate-900" />
              </div>

              <div>
                {/* Header info */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm text-blue-950">
                    <Glasses className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-amber-500 tracking-widest uppercase block">
                      {selectedStyle.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                      {selectedStyle.name}
                    </h3>
                  </div>
                </div>

                {/* Primary Description */}
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-light mb-8 max-w-xl">
                  {selectedStyle.description}
                </p>

                {/* Visagismo Metrics with Visual Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-900" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                      IDEAL PARA ROSTOS
                    </span>
                    <span className="text-sm font-black text-slate-900 block leading-snug">
                      {selectedStyle.faceMatch}
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                      CONSELHO DO VISAGISTA
                    </span>
                    <span className="text-xs text-slate-500 font-medium block leading-relaxed">
                      {selectedStyle.visagismoTip}
                    </span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Destaques deste Design
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedStyle.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-600 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Banner to consult Models of this Style */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs text-slate-500 font-medium">
                    Experimente estes modelos hoje em nossa loja!
                  </span>
                </div>
                <a
                  href={`https://api.whatsapp.com/send?phone=5598988764083&text=Ol%C3%A1!%20Gostaria%20de%20ver%20os%20modelos%20do%20estilo%20${selectedStyle.name}%20que%20voc%C3%AAs%20t%C3%AAm%20dispon%C3%ADveis%20na%20Grandvision%20do%20Golden%20Shopping.`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 hover:-translate-y-0.5 text-white text-xs font-black tracking-wider uppercase rounded-xl transition-all shadow-md shadow-emerald-600/10 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" /> Consultar Modelos
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
