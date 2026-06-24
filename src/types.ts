export interface Product {
  id: string;
  name: string;
  category: 'grau' | 'sol' | 'lentes-cont' | 'lentes-oft';
  brand: string;
  priceIndicator: 'Sustentável' | 'Premium' | 'Smart' | 'Exclusivo' | 'Tecnológico';
  description: string;
  image: string;
  features: string[];
  tags: string[];
  fallbackImage?: string;
}

export interface Store {
  id: string;
  name: string;
  mall: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  mapEmbedUrl: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  role: string;
  date: string;
  store: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface GlassesModel {
  id: string;
  name: string;
  frameType: 'aviator' | 'round' | 'square' | 'cat-eye';
  styleName: string;
  svgPath: string; // We can use direct SVG drawing or beautiful shapes!
  color: string;
  defaultScale: number;
}
