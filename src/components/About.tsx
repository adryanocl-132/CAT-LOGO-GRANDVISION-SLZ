import { useState } from 'react';
import { MapPin, Phone, Clock, Award, Shield, Heart } from 'lucide-react';
import { STORES } from '../data';
import { Store } from '../types';

export default function About() {
  const [selectedStore, setSelectedStore] = useState<Store>(STORES[0]);

  return (
    <section id="sobre" className="py-20 md:py-28 bg-gray-50 border-y border-gray-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left: Beautiful Double Images */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-md md:max-w-lg">
              
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-gray-200/50">
                  <img
                    src="https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=400&h=530&q=80"
                    alt="Atendimento Exame de Vista"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="bg-blue-900 text-white p-5 rounded-2xl text-left border border-blue-950">
                  <h4 className="font-serif text-3xl font-extrabold text-amber-400">100+</h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-300 mt-1">Anos de Tradição</p>
                  <p className="text-[11px] text-gray-300 mt-1">Liderança global com o grupo EssilorLuxottica.</p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="bg-amber-500 text-blue-950 p-5 rounded-2xl text-left">
                  <h4 className="font-serif text-2xl font-extrabold">Qualidade Garantida</h4>
                  <p className="text-[11px] text-blue-950 font-medium mt-1">As melhores marcas de grife internacionais com garantia nacional.</p>
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-gray-200/50">
                  <img
                    src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&h=530&q=80"
                    alt="Óculos de Sol Estiloso"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-6 text-left space-y-6">
            
            <span className="text-xs font-bold tracking-widest text-blue-800 uppercase bg-blue-100/50 px-3 py-1.5 rounded-full">
              Sobre a Grandvision by Fototica
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight">
              A maior rede de óticas do mundo, presente em São Luís
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Fazemos parte do grupo **EssilorLuxottica**, o maior player de ótica e bem-estar visual do planeta. Isso nos possibilita trazer para São Luís as tecnologias alemãs mais avançadas de laboratório e as grifes de óculos mais exclusivas, mantendo um custo-benefício insuperável e parcelamento facilitado.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Nossas lojas físicas em São Luís são planejadas para oferecer uma experiência de compra calorosa, transparente e confortável. Do auto-refrator tecnológico de precisão à nossa consultoria de visagismo gratuita, cada detalhe é feito para valorizar seu olhar e seu estilo pessoal.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-150">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-900">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-gray-900 block">Certificado</span>
                  <span className="text-[11px] text-gray-500">Qualidade de Origem</span>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-gray-900 block">Segurança</span>
                  <span className="text-[11px] text-gray-500">Garantia Essilor</span>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-gray-900 block">Atendimento</span>
                  <span className="text-[11px] text-gray-500">Nota 4.9 Clientes</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Interactive Store Locations & Google Map Embed */}
        <div id="contato" className="pt-12 border-t border-gray-200">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-blue-950">Nossas Unidades em São Luís</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">Selecione uma loja para ver o endereço completo, horários de funcionamento e visualizar no mapa.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left list of stores - 5 cols */}
            <div className="lg:col-span-5 flex flex-col space-y-3 text-left">
              {STORES.map((store) => {
                const isSelected = selectedStore.id === store.id;
                return (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`p-4.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-900 bg-blue-950 text-white shadow-xl shadow-blue-950/10 scale-[1.01]'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-extrabold ${isSelected ? 'text-amber-400' : 'text-blue-950'}`}>
                          {store.mall}
                        </span>
                        <MapPin className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-gray-400'}`} />
                      </div>
                      <p className={`text-xs mt-1.5 leading-relaxed ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                        {store.address}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-3.5 mt-3.5 border-t border-dashed border-gray-300/20 text-[11px]">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span className={isSelected ? 'text-gray-300' : 'text-gray-500'}>{store.hours.split('|')[0]}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span className={isSelected ? 'text-gray-300' : 'text-gray-500'}>{store.phone}</span>
                      </div>
                    </div>

                  </button>
                );
              })}
            </div>

            {/* Right Map Embed Visualizer - 7 cols */}
            <div className="lg:col-span-7 aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden border border-gray-200/50 shadow-lg relative bg-gray-100 flex items-center justify-center">
              
              <iframe
                title={`Mapa ${selectedStore.name}`}
                src={selectedStore.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[300px]"
              />

              {/* Floating label for loaded map */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-gray-150 shadow-md text-xs font-bold text-blue-950 flex items-center space-x-1.5 pointer-events-none">
                <MapPin className="w-4 h-4 text-blue-900 fill-blue-50" />
                <span>Visualizando {selectedStore.mall}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
