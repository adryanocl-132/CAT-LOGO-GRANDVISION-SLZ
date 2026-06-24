import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScheduleClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onScheduleClick, onExploreClick }: HeroProps) {
  return (
    <section 
      id="inicio" 
      className="relative min-h-[80vh] pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white flex items-center border-b border-gray-100"
    >
      {/* Absolute minimalist layout centering on high-fashion elegance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[11px] font-extrabold tracking-[0.25em] text-blue-900 uppercase"
            >
              GRANDVISION BY FOTOTICA — SÃO LUÍS
            </motion.div>

            {/* Title with editorial serif look */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-blue-950 tracking-tight leading-[1.1]"
            >
              A harmonia perfeita entre <span className="italic font-normal text-blue-900">precisão óptica</span> e sofisticação.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-500 text-sm sm:text-base md:text-lg max-w-xl font-light leading-relaxed"
            >
              Cuidamos da sua saúde visual através de grifes internacionais consagradas e lentes de altíssima precisão técnica. Descubra a curadoria exclusiva de armações na nossa unidade no Golden Shopping Calhau.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3.5 sm:space-y-0 sm:space-x-4 pt-2"
            >
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center space-x-2 bg-blue-950 hover:bg-blue-900 text-white font-bold tracking-wider uppercase text-xs px-8 py-4.5 rounded-2xl shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Ver Portfólio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

          </div>

          {/* Hero Image Side - Super clean and sleek without any overlapping cards */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-gray-50 border border-gray-100 rounded-3xl"
            >
              <img 
                src="https://drive.google.com/thumbnail?id=1pwPLmuSEed--tOrNGG5Jt4gbLgHHzyR6&sz=w1200" 
                alt="Minimalist Glasses Presentation" 
                className="w-full h-full object-cover transition-all duration-700 rounded-3xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://drive.google.com/uc?export=view&id=1pwPLmuSEed--tOrNGG5Jt4gbLgHHzyR6";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
