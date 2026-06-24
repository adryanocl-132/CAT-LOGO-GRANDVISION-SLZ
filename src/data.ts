import { Product, Store, Review, FAQ, GlassesModel } from './types';

export const STORES: Store[] = [
  {
    id: 'golden-shopping',
    name: 'Grandvision Golden Shopping Calhau',
    mall: 'Golden Shopping Calhau',
    address: 'Av. dos Holandeses, 200 - Loja 107 - Piso L1 - Calhau, São Luís - MA, 65071-380',
    phone: '(98) 98876-4083',
    whatsapp: '5598988764083',
    hours: 'Segunda a Sábado: 10h às 22h | Domingo: 14h às 20h',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.023405!2d-44.286395!3d-2.483611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f68cf5b07fb8d3%3A0x6b4db539fe5569cf!2sGolden%20Shopping%20Calhau!5e0!3m2!1spt-BR!2sbr!4v1700000000004!5m2!1spt-BR!2sbr'
  }
];

export const PRODUCTS: Product[] = [
  // ÓCULOS DE SOL
  {
    id: 'tory-burch-0513',
    name: 'Óculos de Sol de Acetato Tartaruga',
    category: 'sol',
    brand: 'Tory Burch',
    priceIndicator: 'Premium',
    description: 'Óculos de Sol luxuoso em acetato tartaruga estilo Phantos/Círculo. Um design elegante e marcante que acompanha estojo exclusivo em verde limão vibrante.',
    image: 'https://drive.google.com/thumbnail?id=14S-lAVZG8r56TQWB1pXzG_qgX_87qxkL&sz=w1000',
    fallbackImage: 'https://drive.google.com/uc?export=view&id=14S-lAVZG8r56TQWB1pXzG_qgX_87qxkL',
    features: ['Acetato tartaruga de alta qualidade', 'Formato Phantos / Círculo retrô', 'Acompanha estojo Verde Limão exclusivo', 'Proteção UV400 total contra raios solares'],
    tags: ['Estojo Verde Limão', 'Phantos/Círculo', 'Premium']
  },
  {
    id: 'ray-ban-0520',
    name: 'Ray-Ban ASAP ROCK',
    category: 'grau',
    brand: 'Ray-Ban',
    priceIndicator: 'Premium',
    description: 'Armação icônica Ray-Ban ASAP ROCK em formato oval com acabamento dourado sofisticado. Um estilo retrô marcante e extremamente elegante para o seu dia a dia.',
    image: 'https://lh3.googleusercontent.com/d/1f9quFO-5nwUEiiVnh8cyTOhJiYtkm0sQ',
    fallbackImage: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80',
    features: ['Armação metálica dourada polida', 'Formato oval ASAP ROCK exclusivo', 'Plaquetas nasais confortáveis', 'Leveza e encaixe anatômico superior'],
    tags: ['Armação Dourada', 'Oval', 'Metal Leve']
  },
  {
    id: 'miu-miu-0534',
    name: 'Óculos de Cinza Acetato Tartaruga Oval',
    category: 'grau',
    brand: 'Miu Miu',
    priceIndicator: 'Exclusivo',
    description: 'Armação icônica da grife de luxo Miu Miu em acetato tartaruga cinza/mesclado de padrão refinado e formato oval estilo Phantos. Alta costura para os seus olhos.',
    image: 'https://drive.google.com/thumbnail?id=1nmHnNEAhMRiRcIADUNVs_yYPvs-QT4-6&sz=w1000',
    fallbackImage: 'https://drive.google.com/uc?export=view&id=1nmHnNEAhMRiRcIADUNVs_yYPvs-QT4-6',
    features: ['Acetato tartaruga cinza premium polido', 'Estilo Phantos / Oval elegante', 'Logotipo Miu Miu em metal nas hastes', 'Design ergonômico e encaixe perfeito'],
    tags: ['Grife Luxo', 'Acetato Tartaruga', 'Estilo Phantos']
  },
  {
    id: 'vogue-0546',
    name: 'Óculos de Cinza Cat-Eye de Metal Rosé',
    category: 'grau',
    brand: 'Vogue',
    priceIndicator: 'Smart',
    description: 'Armação de grau Vogue feminina estilo gatinho (cat-eye) elegante em metal com acabamento rosé brilhante.',
    image: 'https://drive.google.com/thumbnail?id=1V0KEiAsltzKEqfd_BokVnVJrpWCV2PjJ&sz=w1000',
    fallbackImage: 'https://drive.google.com/uc?export=view&id=1V0KEiAsltzKEqfd_BokVnVJrpWCV2PjJ',
    features: ['Metal rosé premium de alta resistência', 'Formato gatinho (cat-eye) clássico', 'Design moderno e sofisticado', 'Ajuste confortável e firme no rosto'],
    tags: ['Metal Rosé', 'Gatinho / Cat-Eye', 'Vogue']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Mariana Vasconcelos',
    rating: 5,
    comment: 'Fui atendida no Shopping da Ilha e a consultoria de visagismo foi fantástica! Descobri o formato ideal de óculos para meu rosto oval. Comprei uma armação Sensaya e as lentes Crizal Sapphire, os reflexos à noite dirigindo sumiram!',
    role: 'Arquiteta',
    date: '10 de Junho de 2026',
    store: 'Shopping da Ilha'
  },
  {
    id: 'rev-2',
    name: 'Eduardo Pinheiro',
    rating: 5,
    comment: 'Excelente atendimento no Rio Anil Shopping. Agendei o exame de vista pelo site, foi super rápido e o optometrista foi extremamente minucioso no meu grau de astigmatismo. Minha adaptação às novas lentes Eyezen foi imediata.',
    role: 'Engenheiro de Software',
    date: '28 de Maio de 2026',
    store: 'Rio Anil Shopping'
  },
  {
    id: 'rev-3',
    name: 'Ana Júlia Costa',
    rating: 5,
    comment: 'Uso lentes de contato descartáveis e sempre compro na loja do São Luís Shopping. O preço é excelente, as atendentes são muito gentis e quando preciso de manutenção ou ajuste nos meus óculos de sol, eles fazem na hora e de graça!',
    role: 'Estudante de Medicina',
    date: '15 de Junho de 2026',
    store: 'São Luís Shopping'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'O Exame de Vista / Avaliação Visual é gratuito nas lojas de São Luís?',
    answer: 'Sim, na compra dos seus óculos completos (armação + lentes) ou lentes de contato, o seu exame de vista de triagem e avaliação de acuidade visual com nossos técnicos especializados é totalmente gratuito. Você pode agendar facilmente pelo formulário no site ou via WhatsApp.'
  },
  {
    id: 'faq-2',
    question: 'Quais shoppings possuem lojas da Grandvision by Fototica em São Luís?',
    answer: 'Atualmente temos lojas completas nos principais pontos estratégicos de São Luís: Shopping da Ilha (Piso L2), Rio Anil Shopping (Piso L1), São Luís Shopping (Piso L1) e no tradicional Tropical Shopping (Renascença, Térreo). Escolha a mais próxima e venha nos visitar!'
  },
  {
    id: 'faq-3',
    question: 'Como funciona a Garantia de Adaptação Grandvision?',
    answer: 'Temos um compromisso absoluto com o seu conforto visual. Caso você não se adapte com as suas novas lentes oftálmicas ou multifocais no prazo de até 30 dias, nós trocaremos suas lentes ou sua armação gratuitamente por outra combinação até que você se sinta 100% confortável.'
  },
  {
    id: 'faq-4',
    question: 'Posso levar minha receita pronta e apenas escolher a armação?',
    answer: 'Com certeza! Você pode trazer a receita do seu oftalmologista de confiança. Nossos especialistas vão analisar a receita e recomendar as melhores opções de lentes oftálmicas tecnológicas (como antirreflexo, filtro azul ou fotossensíveis) compatíveis com o seu grau.'
  },
  {
    id: 'faq-5',
    question: 'Qual é o prazo médio de entrega dos óculos de grau?',
    answer: 'Lentes simples e monofocais em estoque podem ficar prontas em até 24 a 48 horas úteis. Para lentes personalizadas, multifocais ou laboratórios de alta tecnologia (como Varilux ou Crizal sob medida), o prazo médio varia entre 5 a 10 dias úteis.'
  }
];

export const GLASSES_MODELS: GlassesModel[] = [
  {
    id: 'model-aviator',
    name: 'Aviador Clássico Gold',
    frameType: 'aviator',
    styleName: 'Lendário e Atemporal',
    svgPath: 'M 10,40 Q 25,35 45,45 Q 50,75 35,80 Q 20,80 15,65 Z M 90,40 Q 75,35 55,45 Q 50,75 65,80 Q 80,80 85,65 Z M 45,45 L 55,45 M 43,42 Q 50,38 57,42 M 15,55 L -10,48 M 85,55 L 110,48',
    color: '#D4AF37',
    defaultScale: 1.2
  },
  {
    id: 'model-round',
    name: 'Retro Round Matte Black',
    frameType: 'round',
    styleName: 'Jovem e Intelectual',
    svgPath: 'M 12,50 A 22,22 0 1,1 56,50 A 22,22 0 1,1 12,50 M 56,50 L 74,50 M 74,50 A 22,22 0 1,1 118,50 A 22,22 0 1,1 74,50 M 20,40 L -15,35 M 110,40 L 145,35',
    color: '#1A1A1A',
    defaultScale: 1.1
  },
  {
    id: 'model-square',
    name: 'Bold Square Tortoise',
    frameType: 'square',
    styleName: 'Robusto e Marcante',
    svgPath: 'M 10,35 L 50,35 L 48,70 L 12,70 Z M 60,35 L 100,35 L 98,70 L 62,70 Z M 50,42 L 60,42 M 10,40 L -15,35 M 100,40 L 125,35',
    color: '#8B4513',
    defaultScale: 1.15
  },
  {
    id: 'model-cat-eye',
    name: 'Elegance Cat-Eye Burgundy',
    frameType: 'cat-eye',
    styleName: 'Chic e Moderno',
    svgPath: 'M 10,35 C 10,35 25,28 48,45 C 48,45 35,70 20,65 C 10,60 10,35 10,35 Z M 90,35 C 90,35 75,28 52,45 C 52,45 65,70 80,65 C 90,60 90,35 90,35 Z M 48,45 L 52,45 M 10,35 L -15,25 M 90,35 L 115,25',
    color: '#800020',
    defaultScale: 1.25
  }
];
