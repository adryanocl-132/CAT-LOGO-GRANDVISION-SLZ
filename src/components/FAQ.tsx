import { useState } from 'react';
import { FAQS } from '../data';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-100/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-800 uppercase bg-blue-100/50 px-3 py-1.5 rounded-full">
            Dúvidas Frequentes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-blue-950 mt-4 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Tire suas principais dúvidas sobre exames, prazos de entrega, garantias e convênios em São Luís.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-gray-150 bg-white shadow-sm hover:shadow-md transition-all duration-250 overflow-hidden"
              >
                {/* Header button */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-blue-950 transition-colors hover:text-blue-900 cursor-pointer"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-blue-900 shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <div className={`p-1 rounded-lg ${isOpen ? 'bg-blue-900 text-white' : 'bg-gray-50 text-gray-500'} transition-colors`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Animated content body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-100"
                    >
                      <div className="px-6 py-4 bg-gray-50/50">
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
