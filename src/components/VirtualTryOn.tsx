import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RotateCcw, Plus, Minus, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Check, RefreshCw } from 'lucide-react';
import { GLASSES_MODELS } from '../data';
import { motion } from 'motion/react';

export default function VirtualTryOn() {
  const [activeGlasses, setActiveGlasses] = useState(GLASSES_MODELS[0]);
  const [baseType, setBaseType] = useState<'female' | 'male' | 'kid' | 'upload' | 'camera'>('female');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Glasses manipulation states
  const [scale, setScale] = useState(1.0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [frameColor, setFrameColor] = useState(GLASSES_MODELS[0].color);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const baseModels = {
    female: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=600&q=80',
    male: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80',
    kid: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&h=600&q=80',
  };

  const colors = [
    { name: 'Ouro Real', hex: '#D4AF37' },
    { name: 'Preto Fosco', hex: '#1A1A1A' },
    { name: 'Tartaruga', hex: '#8B4513' },
    { name: 'Borgonha', hex: '#800020' },
    { name: 'Azul Marinho', hex: '#0B3C5D' },
    { name: 'Prata Nobre', hex: '#C0C0C0' }
  ];

  // Sync frame color with active glasses default on change
  useEffect(() => {
    setFrameColor(activeGlasses.color);
    resetControls();
  }, [activeGlasses]);

  const resetControls = () => {
    setScale(1.0);
    setTranslateX(0);
    setTranslateY(0);
  };

  // Camera handling
  const startCamera = async () => {
    setCameraError(null);
    setUploadedImage(null);
    try {
      const constraints = { video: { width: 640, height: 480, facingMode: 'user' } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
      setBaseType('camera');
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError("Não foi possível acessar a câmera. Certifique-se de conceder permissão ou use uma foto de modelo.");
      setBaseType('female');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Upload image handling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
          setBaseType('upload');
          resetControls();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
          setBaseType('upload');
          resetControls();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const whatsappInteresse = `https://api.whatsapp.com/send?phone=5598988764083&text=Ol%C3%A1!%20Experimentei%20o%20modelo%20%22${activeGlasses.name}%22%20no%20Provador%20Virtual%20do%20site%20e%20gostaria%20de%20ver%20esse%20modelo%20na%20loja.`;

  return (
    <section id="tryon" className="py-20 md:py-28 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-800 uppercase bg-blue-100/50 px-3 py-1.5 rounded-full">
            Provador Virtual 3D
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 mt-4 tracking-tight">
            Experimente Sem Sair de Casa
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-4 leading-relaxed">
            Ative sua câmera, faça o upload de uma selfie ou use nossos modelos para ver instantaneamente como cada formato de armação se adapta ao seu rosto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Main Workspace Preview - 7 cols */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Display Canvas Box */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="relative aspect-square w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 flex items-center justify-center select-none"
            >
              
              {/* 1. Predefined Models Background */}
              {(baseType === 'female' || baseType === 'male' || baseType === 'kid') && (
                <img 
                  src={baseModels[baseType as 'female' | 'male' | 'kid']} 
                  alt="Modelo de Rosto"
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* 2. Uploaded Image Background */}
              {baseType === 'upload' && uploadedImage && (
                <img 
                  src={uploadedImage} 
                  alt="Sua Foto"
                  className="w-full h-full object-cover pointer-events-none"
                />
              )}

              {/* 3. Camera Live Stream Background */}
              {baseType === 'camera' && isCameraActive && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover scale-x-[-1]" // mirror effect
                />
              )}

              {/* Camera Access Blocked Error / Warning */}
              {cameraError && baseType === 'camera' && (
                <div className="absolute inset-0 bg-slate-950/90 text-white p-6 flex flex-col items-center justify-center text-center space-y-3 z-10">
                  <Camera className="w-10 h-10 text-red-400" />
                  <p className="text-sm font-semibold max-w-sm">{cameraError}</p>
                  <button 
                    onClick={() => { setCameraError(null); setBaseType('female'); }}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-all"
                  >
                    Usar Modelo Feminino
                  </button>
                </div>
              )}

              {/* Upload Drag Overlay helper */}
              {!uploadedImage && baseType === 'upload' && (
                <div className="absolute inset-0 bg-slate-900/40 border-4 border-dashed border-white/40 m-4 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-white cursor-pointer" onClick={triggerUploadClick}>
                  <Upload className="w-10 h-10 mb-2" />
                  <p className="font-bold">Arraste sua foto aqui</p>
                  <p className="text-xs text-slate-300 mt-1">Ou clique para selecionar um arquivo (JPEG, PNG)</p>
                </div>
              )}

              {/* VIRTUAL GLASSES OVERLAY */}
              {(!cameraError || baseType !== 'camera') && (
                <div 
                  className="absolute pointer-events-none z-20"
                  style={{
                    transform: `translate(${translateX}px, ${translateY}px) scale(${scale * activeGlasses.defaultScale})`,
                    width: '160px',
                    height: '80px',
                    top: 'calc(50% - 35px)', // Center vertically roughly
                    left: 'calc(50% - 80px)', // Center horizontally roughly
                  }}
                >
                  <svg
                    viewBox="0 0 120 60"
                    className="w-full h-full drop-shadow-lg"
                    style={{ color: frameColor }}
                  >
                    {/* Shadow Layer for realism */}
                    <path
                      d={activeGlasses.svgPath}
                      fill="none"
                      stroke="rgba(0,0,0,0.15)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Real Frame Layer */}
                    <path
                      d={activeGlasses.svgPath}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Shimmer Lens highlight */}
                    <path
                      d="M 16,48 Q 28,42 42,48"
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 76,48 Q 88,42 102,48"
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}

              {/* Watermark branding overlay */}
              <div className="absolute bottom-4 left-4 bg-slate-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-[10px] text-gray-200 font-semibold tracking-wider flex items-center space-x-1.5 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>GRANDVISION PROVADOR VIRTUAL</span>
              </div>

            </div>

            {/* Quick Face Selectors Row */}
            <div className="flex flex-wrap gap-2 items-center justify-between">
              
              {/* Left group: Input sources */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { stopCamera(); setBaseType('female'); }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    baseType === 'female' ? 'bg-blue-900 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  Modelo Feminina
                </button>
                <button
                  onClick={() => { stopCamera(); setBaseType('male'); }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    baseType === 'male' ? 'bg-blue-900 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  Modelo Masculino
                </button>
                <button
                  onClick={() => { stopCamera(); setBaseType('kid'); }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    baseType === 'kid' ? 'bg-blue-900 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  Infantil / Unissex
                </button>
              </div>

              {/* Right group: Custom user inputs */}
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={triggerUploadClick}
                  className={`p-2.5 rounded-xl border transition-colors flex items-center space-x-1.5 text-xs font-bold ${
                    baseType === 'upload' ? 'bg-blue-900 text-white border-blue-900' : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                  title="Fazer Upload de Selfie"
                >
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Enviar Foto</span>
                </button>
                <button
                  onClick={isCameraActive ? stopCamera : startCamera}
                  className={`p-2.5 rounded-xl border transition-colors flex items-center space-x-1.5 text-xs font-bold ${
                    isCameraActive ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                  title={isCameraActive ? 'Desativar Câmera' : 'Usar WebCam'}
                >
                  <Camera className="w-4 h-4" />
                  <span className="hidden sm:inline">{isCameraActive ? 'Desligar' : 'Webcam'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Configuration and Controls Side - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/60 shadow-lg shadow-gray-100/40">
            
            <div className="flex flex-col space-y-6 text-left">
              
              {/* Header inside Config */}
              <div>
                <h3 className="text-xl font-bold text-blue-950">Ajustar & Customizar</h3>
                <p className="text-xs text-gray-500 mt-1">Selecione uma armação abaixo, defina a cor e posicione perfeitamente no seu rosto.</p>
              </div>

              {/* 1. Selecting Glasses Frame */}
              <div className="space-y-3">
                <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">1. Formato da Armação</span>
                <div className="grid grid-cols-2 gap-2">
                  {GLASSES_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setActiveGlasses(model)}
                      className={`p-3 rounded-2xl border text-left flex flex-col transition-all cursor-pointer ${
                        activeGlasses.id === model.id
                          ? 'border-blue-900 bg-blue-50/40 ring-2 ring-blue-900/10'
                          : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-bold text-gray-900">{model.name}</span>
                      <span className="text-[10px] text-gray-500 mt-0.5">{model.styleName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Color picker */}
              <div className="space-y-3">
                <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">2. Cor do Aro</span>
                <div className="flex flex-wrap gap-2.5">
                  {colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setFrameColor(color.hex)}
                      className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all relative ${
                        frameColor === color.hex ? 'scale-110 ring-2 ring-blue-900/40' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {frameColor === color.hex && (
                        <Check className={`w-4 h-4 ${color.hex === '#1A1A1A' || color.hex === '#800020' || color.hex === '#0B3C5D' ? 'text-white' : 'text-gray-950'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Manual Positioning Fitting controls */}
              <div className="space-y-3.5 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">3. Ajuste de Caimento</span>
                  <button 
                    onClick={resetControls}
                    className="inline-flex items-center space-x-1 text-xs text-blue-900 hover:text-blue-950 font-bold"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Redefinir</span>
                  </button>
                </div>

                {/* Grid for adjustments */}
                <div className="grid grid-cols-2 gap-4 items-center">
                  
                  {/* Size Scale Adjuster */}
                  <div className="flex flex-col space-y-1.5 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <span className="text-[10px] font-extrabold text-gray-500 uppercase">Tamanho (Zoom)</span>
                    <div className="flex items-center justify-between space-x-2">
                      <button 
                        onClick={() => setScale(Math.max(0.6, scale - 0.05))}
                        className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-gray-800">{Math.round(scale * 100)}%</span>
                      <button 
                        onClick={() => setScale(Math.min(1.5, scale + 0.05))}
                        className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Move Up/Down Adjuster */}
                  <div className="flex flex-col space-y-1.5 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <span className="text-[10px] font-extrabold text-gray-500 uppercase">Ajuste de Altura</span>
                    <div className="flex items-center justify-between space-x-2">
                      <button 
                        onClick={() => setTranslateY(translateY - 2)}
                        className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                        title="Subir"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-gray-800">{translateY}px</span>
                      <button 
                        onClick={() => setTranslateY(translateY + 2)}
                        className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                        title="Descer"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Horizontal slider just in case */}
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 space-y-1">
                  <div className="flex justify-between text-[10px] font-extrabold text-gray-500 uppercase">
                    <span>Posicionamento Lateral</span>
                    <span className="text-gray-700">{translateX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={translateX}
                    onChange={(e) => setTranslateX(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                  />
                </div>

              </div>

            </div>

            {/* CTA Final */}
            <div className="pt-6 border-t border-gray-100 flex flex-col space-y-3">
              <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-50/80 text-left">
                <p className="text-xs font-bold text-blue-950">Gostou de como ficou?</p>
                <p className="text-[11px] text-gray-600 mt-0.5">Nossos especialistas nas lojas de São Luís podem encomendar exatamente este modelo e ajustar sob medida para o seu rosto!</p>
              </div>
              <a
                href={whatsappInteresse}
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all text-sm"
              >
                <span>Reservar Modelo no WhatsApp</span>
                <Check className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
