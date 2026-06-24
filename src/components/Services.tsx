import { useState } from 'react';
import { Sparkles, Eye, Shield, Wrench, ChevronRight, Check, Award, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Services() {
  const [activeQuizStep, setActiveQuizStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ faceShape?: string; style?: string; daily?: string }>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const services = [
    {
      id: 'exame',
      icon: <Eye className="w-6 h-6" />,
      title: 'Avaliação Visual Digital',
      desc: 'Tecnologia alemã de auto-refração para medição precisa da acuidade visual. Exame rápido, indolor e gratuito na compra do óculos.',
      accent: 'bg-blue-50 text-blue-900 border-blue-100'
    },
    {
      id: 'visagismo',
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Consultoria Visagista',
      desc: 'Nossos consultores ajudam a escolher a armação perfeita de acordo com a geometria facial, cor de pele e expressão da sua personalidade.',
      accent: 'bg-amber-50 text-amber-900 border-amber-100'
    },
    {
      id: 'manutencao',
      icon: <Wrench className="w-6 h-6" />,
      title: 'Ajuste e Manutenção Grátis',
      desc: 'Limpeza ultrassônica profunda, troca de plaquetas, aperto de parafusos e alinhamento anatômico gratuito e vitalício para clientes.',
      accent: 'bg-emerald-50 text-emerald-900 border-emerald-100'
    },
    {
      id: 'garantia',
      icon: <Shield className="w-6 h-6" />,
      title: 'Garantia de Adaptação 30d',
      desc: 'Garantimos conforto absoluto. Se não houver adaptação às novas lentes progressivas ou de grau, trocamos sem custo adicional.',
      accent: 'bg-purple-50 text-purple-900 border-purple-100'
    }
  ];

  const quizSteps = [
    {
      title: 'Qual é o formato aproximado da sua mandíbula e bochechas?',
      field: 'faceShape',
      options: [
        { value: 'arredondado', label: 'Bochechas cheias, queixo suavemente arredondado (Redondo)' },
        { value: 'angular', label: 'Mandíbula forte, linhas retas e marcantes (Quadrado)' },
        { value: 'alongado', label: 'Rosto mais comprido do que largo, traços suaves (Oval)' },
        { value: 'triangular', label: 'Testa mais larga que o queixo, queixo pontiagudo (Coração)' }
      ]
    },
    {
      title: 'Qual estilo de vestuário melhor define você no dia a dia?',
      field: 'style',
      options: [
        { value: 'classico', label: 'Clássico, social, elegante e atemporal' },
        { value: 'casual', label: 'Casual, esportivo, confortável e dinâmico' },
        { value: 'moderno', label: 'Moderno, alternativo, urbano e descolado' },
        { value: 'sofisticado', label: 'Sofisticado, artístico e com foco em design' }
      ]
    },
    {
      title: 'Qual é a sua principal atividade diária?',
      field: 'daily',
      options: [
        { value: 'computador', label: 'Passo o dia no computador ou celular' },
        { value: 'esportes', label: 'Atividades ao ar livre, esportes ou dirigindo' },
        { value: 'reunioes', label: 'Muitas reuniões presenciais, palestras ou aulas' },
        { value: 'misto', label: 'Rotina variada, combinando telas, rua e leituras' }
      ]
    }
  ];

  const handleSelectOption = (value: string) => {
    const currentField = quizSteps[activeQuizStep].field as 'faceShape' | 'style' | 'daily';
    const updatedAnswers = { ...answers, [currentField]: value };
    setAnswers(updatedAnswers);

    if (activeQuizStep < quizSteps.length - 1) {
      setActiveQuizStep(activeQuizStep + 1);
    } else {
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (finalAnswers: typeof answers) => {
    let rec = '';
    const { faceShape, style, daily } = finalAnswers;

    if (faceShape === 'arredondado') {
      rec = 'Armações Retangulares ou Quadradas com linhas marcantes. Elas trazem contraste ao seu rosto redondo e criam uma ilusão de traços mais alongados. Experimente o Oakley Holbrook ou armações pretas foscas.';
    } else if (faceShape === 'angular') {
      rec = 'Armações Redondas ou Ovais em metal fino. Elas suavizam os ângulos da sua mandíbula forte. O modelo Ray-Ban Round Metal ou Aviador é perfeito para você.';
    } else if (faceShape === 'alongado') {
      rec = 'Seu rosto Oval é extremamente versátil e combina com praticamente todos os formatos! Recomendamos armações ligeiramente oversized como o estilo Borboleta da Vogue ou o icônico Ray-Ban Clubmaster para máximo estilo.';
    } else {
      rec = 'Armações estilo Gatinho (Cat-Eye) ou Meio-Aro. Elas equilibram a largura da testa e chamam atenção para a linha dos seus olhos. O modelo Sensaya Prestige é excelente.';
    }

    if (daily === 'computador') {
      rec += ' Recomendamos fortissimamente adicionar as Lentes Eyezen com Filtro Azul para proteger seus olhos da fadiga digital.';
    } else if (daily === 'esportes') {
      rec += ' O ideal para sua rotina ativa são Lentes Polarizadas de alta performance com Proteção UV400 completa.';
    } else if (daily === 'misto') {
      rec += ' Lentes fotossensíveis inteligentes Transitions GEN 8 serão suas maiores aliadas, ativando no sol e clareando na sombra.';
    } else {
      rec += ' Para máximo conforto e durabilidade, as Lentes Crizal Sapphire com antirreflexo de alta tecnologia são ideais.';
    }

    setQuizResult(rec);
  };

  const restartQuiz = () => {
    setActiveQuizStep(0);
    setAnswers({});
    setQuizResult(null);
  };

  const shareQuizToWhatsapp = () => {
    const message = `Ol%C3%A1!%20Fiz%20o%20Teste%20de%20Visagismo%20no%20site%20da%20Grandvision%20S%C3%A3o%20Lu%C3%ADs%20e%20deu%20esse%20resultado:%20%22${encodeURIComponent(quizResult || '')}%22.%20Gostaria%20de%20visitar%20a%20loja%20para%20experimentar%20essas%20recomenda%C3%A7%C3%B5es!`;
    return `https://api.whatsapp.com/send?phone=5598988764083&text=${message}`;
  };

  return (
    <section id="servicos" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold tracking-widest text-blue-800 uppercase bg-blue-100/50 px-3 py-1.5 rounded-full">
            Serviços de Excelência
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 mt-4 tracking-tight">
            Cuidado Especial para seus Olhos
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-4 leading-relaxed">
            Muito além de vender óculos, somos focados em fornecer soluções óticas de alta tecnologia e atendimento individualizado em cada etapa da sua jornada visual.
          </p>
        </div>

        {/* 1. Services Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((serv) => (
            <div
              key={serv.id}
              className="p-6.5 bg-white rounded-3xl border border-gray-150/60 shadow-lg shadow-gray-100/30 hover:shadow-xl hover:-translate-y-1 hover:border-blue-900/10 transition-all text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${serv.accent}`}>
                  {serv.icon}
                </div>
                <h3 className="text-lg font-bold text-blue-950">{serv.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {serv.desc}
                </p>
              </div>

              {/* Bottom tag */}
              <div className="pt-4 mt-4 border-t border-gray-50 flex items-center space-x-1.5 text-xs font-bold text-blue-900">
                <span>Disponível em SLZ</span>
                <Check className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>

        {/* 2. Interactive Visagism Block */}
        <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl p-6 sm:p-10 md:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Background vector light overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-700/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Col: Explainer copy */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center space-x-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Simulador Visagista Inteligente</span>
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                Qual óculos ideal para você?
              </h3>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Desenvolvemos um teste de visagismo rápido baseado nas proporções do seu rosto, estilo e atividades diárias. Descubra sua armação ideal em menos de 1 minuto!
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-200 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center text-[10px] font-bold text-amber-400">1</div>
                  <span>Fácil, rápido e 100% online</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-200 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center text-[10px] font-bold text-amber-400">2</div>
                  <span>Recomendações técnicas de lentes</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-200 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center text-[10px] font-bold text-amber-400">3</div>
                  <span>Envie o resultado direto aos consultores</span>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Quiz Canvas */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8">
              
              <AnimatePresence mode="wait">
                
                {/* State A: Quiz Questions */}
                {quizResult === null && (
                  <motion.div
                    key={activeQuizStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6 text-left"
                  >
                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-400 h-full transition-all duration-300" 
                        style={{ width: `${((activeQuizStep + 1) / quizSteps.length) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                      <span>Passo {activeQuizStep + 1} de {quizSteps.length}</span>
                      <span className="text-amber-400">Visagismo SLZ</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {quizSteps[activeQuizStep].title}
                    </h4>

                    {/* Options Stack */}
                    <div className="flex flex-col space-y-3">
                      {quizSteps[activeQuizStep].options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSelectOption(option.value)}
                          className="w-full p-4 rounded-xl border border-white/10 hover:border-amber-400/50 bg-white/5 hover:bg-white/10 text-left transition-all text-sm font-semibold hover:text-white text-gray-200 flex items-center justify-between group cursor-pointer"
                        >
                          <span>{option.label}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>

                  </motion.div>
                )}

                {/* State B: Quiz Result page */}
                {quizResult !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6 text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-400 text-blue-950 flex items-center justify-center font-bold">
                      <Award className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white">Sua Recomendação Exclusiva:</h4>
                      <p className="text-sm text-gray-200 leading-relaxed bg-white/5 border border-white/10 p-4.5 rounded-2xl font-medium">
                        {quizResult}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                      <a
                        href={shareQuizToWhatsapp()}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 cursor-pointer"
                      >
                        <span>Falar com Visagista no WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <button
                        onClick={restartQuiz}
                        className="inline-flex items-center justify-center space-x-1.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/10"
                      >
                        <span>Refazer Teste</span>
                      </button>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
