import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle, Phone, ArrowLeft, Send } from 'lucide-react';
import { STORES } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface SchedulerProps {
  onClose?: () => void;
}

export default function Scheduler({ onClose }: SchedulerProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedStore, setSelectedStore] = useState(STORES[0].id);
  const [selectedDateIdx, setSelectedDateIdx] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Generate next 5 available booking days starting from current local time
  const bookingDays = useMemo(() => {
    const days = [];
    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // Starting tomorrow (since we are on June 24, 2026, let's start with next day)
    let baseDate = new Date();
    
    for (let i = 1; i <= 6; i++) {
      let nextDate = new Date();
      nextDate.setDate(baseDate.getDate() + i);
      
      // Skip Sundays (Tropical Shopping closed, Malls typically open, but skip Sundays for safety/standardization)
      if (nextDate.getDay() === 0) continue;

      days.push({
        weekday: weekdays[nextDate.getDay()],
        day: nextDate.getDate(),
        month: months[nextDate.getMonth()],
        formatted: `${String(nextDate.getDate()).padStart(2, '0')}/${String(nextDate.getMonth() + 1).padStart(2, '0')}/2026`,
        dayOfWeekIdx: nextDate.getDay()
      });
    }
    return days.slice(0, 5); // take 5 days
  }, []);

  const timeSlots = [
    '10:00', '11:30', '14:00', '15:30', '17:00', '18:30'
  ];

  const activeStore = useMemo(() => {
    return STORES.find(s => s.id === selectedStore) || STORES[0];
  }, [selectedStore]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || selectedDateIdx === null || !selectedTime) {
      alert("Por favor, preencha todos os campos do agendamento.");
      return;
    }
    setBookingSuccess(true);
  };

  const getWhatsAppBookingLink = () => {
    if (selectedDateIdx === null || !selectedTime) return '#';
    const dateStr = bookingDays[selectedDateIdx].formatted;
    const weekdayStr = bookingDays[selectedDateIdx].weekday;
    const storeStr = activeStore.name;
    const message = `Ol%C3%A1!%20Fiz%20um%20agendamento%20de%20Exame%20de%20Vista%20gratuito%20no%20site%20da%20Grandvision%20S%C3%A3o%20Lu%C3%ADs:%0A%0A%F0%9F%91%A4%20Nome:%20${encodeURIComponent(name)}%0A%F0%9F%93%9E%20WhatsApp:%20${encodeURIComponent(phone)}%0A%F0%9F%93%8D%20Unidade:%20${encodeURIComponent(storeStr)}%0A%F0%9F%93%85%20Data:%20${encodeURIComponent(dateStr)}%20(${encodeURIComponent(weekdayStr)})%0A%F0%9F%95%92%20Hor%C3%A1rio:%20${encodeURIComponent(selectedTime)}%0A%0APor%20favor,%20confirmem%20este%20agendamento!`;
    return `https://api.whatsapp.com/send?phone=5598988764083&text=${message}`;
  };

  return (
    <div id="scheduler-card" className="bg-white rounded-3xl border border-gray-150/60 shadow-2xl overflow-hidden max-w-xl mx-auto text-left">
      
      {/* Header Band */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-6 sm:p-8 text-white relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-800/20 rounded-full blur-2xl" />
        <h3 className="font-serif text-xl sm:text-2xl font-extrabold">Agendar Exame de Vista</h3>
        <p className="text-xs sm:text-sm text-gray-300 mt-1.5">Preencha os dados e escolha a melhor unidade em São Luís para fazer sua avaliação visual gratuita.</p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* State A: Booking Form */}
        {!bookingSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 space-y-6"
          >
            {/* 1. Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-blue-900 focus:bg-white rounded-xl text-sm font-semibold outline-none focus:ring-4 focus:ring-blue-900/5 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Celular / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="(98) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-blue-900 focus:bg-white rounded-xl text-sm font-semibold outline-none focus:ring-4 focus:ring-blue-900/5 transition-all"
                />
              </div>
            </div>

            {/* 2. Store selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Unidade em São Luís</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <select
                  value={selectedStore}
                  onChange={(e) => {
                    setSelectedStore(e.target.value);
                    setSelectedDateIdx(null);
                    setSelectedTime(null);
                  }}
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-blue-900 focus:bg-white rounded-xl text-sm font-semibold outline-none cursor-pointer"
                >
                  {STORES.map(store => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-[10px] text-gray-500 block leading-relaxed px-1">
                📍 {activeStore.address}
              </span>
            </div>

            {/* 3. Visual Calendar Grid */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1 text-xs font-bold text-gray-700 uppercase tracking-wider">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <span>Escolha o Dia</span>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {bookingDays.map((day, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setSelectedDateIdx(idx); setSelectedTime(null); }}
                    className={`p-2.5 rounded-xl border text-center flex flex-col justify-between transition-all cursor-pointer ${
                      selectedDateIdx === idx
                        ? 'border-blue-900 bg-blue-50/50 ring-2 ring-blue-900/10'
                        : 'border-gray-150 hover:bg-gray-50 hover:border-gray-200'
                    }`}
                  >
                    <span className={`text-[9px] font-extrabold uppercase ${selectedDateIdx === idx ? 'text-blue-900' : 'text-gray-400'}`}>
                      {day.weekday.slice(0, 3)}
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-blue-950 mt-1 leading-none">{day.day}</span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase">{day.month}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Time Slot Grid */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1 text-xs font-bold text-gray-700 uppercase tracking-wider">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Escolha o Horário</span>
              </div>

              {selectedDateIdx === null ? (
                <div className="py-4 bg-gray-50 rounded-xl text-center border border-gray-100">
                  <span className="text-xs text-gray-400 font-medium">Selecione uma data primeiro.</span>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => {
                    // Quick check if Saturday and late time
                    const isSaturday = bookingDays[selectedDateIdx].dayOfWeekIdx === 6;
                    const isLateSlot = time === '17:00' || time === '18:30';
                    const isTropical = activeStore.id === 'tropical-shopping';
                    
                    // Tropical closes earlier on Saturday
                    const isTropicalSatClosed = isSaturday && isLateSlot && isTropical;

                    if (isTropicalSatClosed) return null;

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 rounded-xl border font-bold text-xs transition-colors cursor-pointer ${
                          selectedTime === time
                            ? 'border-blue-900 bg-blue-900 text-white'
                            : 'border-gray-150 bg-white hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center space-x-3">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm transition-colors border border-gray-200 cursor-pointer"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className="flex-grow inline-flex items-center justify-center space-x-2 bg-blue-900 hover:bg-blue-950 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-900/10 transition-colors cursor-pointer text-sm"
              >
                <span>Agendar Exame de Vista</span>
              </button>
            </div>

          </motion.form>
        ) : (
          /* State B: Booking Success screen */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-blue-950">Agendamento Realizado!</h4>
              <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                Suas informações foram registradas com sucesso. Agora, clique no botão abaixo para nos enviar no WhatsApp da unidade correspondente e garantir sua vaga imediata.
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left max-w-sm mx-auto space-y-3">
              <div className="flex items-center space-x-2.5 text-xs text-gray-700">
                <span className="font-extrabold text-gray-500 w-16 uppercase text-[10px]">Paciente:</span>
                <span className="font-bold text-blue-950">{name}</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-gray-700 border-t border-gray-100/50 pt-2.5">
                <span className="font-extrabold text-gray-500 w-16 uppercase text-[10px]">Loja:</span>
                <span className="font-semibold text-gray-900">{activeStore.name}</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-gray-700 border-t border-gray-100/50 pt-2.5">
                <span className="font-extrabold text-gray-500 w-16 uppercase text-[10px]">Data:</span>
                <span className="font-semibold text-gray-900">{bookingDays[selectedDateIdx!].formatted} ({bookingDays[selectedDateIdx!].weekday})</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-gray-700 border-t border-gray-100/50 pt-2.5">
                <span className="font-extrabold text-gray-500 w-16 uppercase text-[10px]">Horário:</span>
                <span className="font-bold text-blue-900">{selectedTime}</span>
              </div>
            </div>

            {/* Final CTAs */}
            <div className="pt-4 flex flex-col space-y-2.5 max-w-sm mx-auto">
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all text-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Confirmar via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setBookingSuccess(false);
                  setName('');
                  setPhone('');
                  setSelectedDateIdx(null);
                  setSelectedTime(null);
                }}
                className="w-full inline-flex items-center justify-center space-x-1 text-xs text-gray-500 hover:text-blue-900 font-bold transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Agendar para outra pessoa</span>
              </button>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
