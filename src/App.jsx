import React, { useState, useMemo } from 'react';
import { Trophy, Heart, ChevronRight, ChevronLeft, CheckCircle2, RotateCcw, User, Smartphone } from 'lucide-react';

// Listado de categorías con los nombres de las películas incluidos en cada nominado
const CATEGORIES = [
  { id: 'pic', name: 'Mejor Película', nominees: ['Bugonia', 'F1', 'Frankenstein', 'Hamnet', 'Marty Supreme', 'One Battle After Another', 'The Secret Agent', 'Sentimental Value', 'Sinners', 'Train Dreams'] },
  { id: 'dir', name: 'Mejor Dirección', nominees: ['Chloé Zhao (Hamnet)', 'Josh Safdie (Marty Supreme)', 'Paul Thomas Anderson (One Battle After Another)', 'Joachim Trier (Sentimental Value)', 'Ryan Coogler (Sinners)'] },
  { id: 'actress', name: 'Mejor Actriz', nominees: ['Jessie Buckley (Hamnet)', 'Rose Byrne (If I Had Legs I\'d Kick You)', 'Kate Hudson (Song Sung Blue)', 'Renate Reinsve (Sentimental Value)', 'Emma Stone (Bugonia)'] },
  { id: 'actor', name: 'Mejor Actor', nominees: ['Timothée Chalamet (Marty Supreme)', 'Leonardo DiCaprio (One Battle After Another)', 'Ethan Hawke (Blue Moon)', 'Michael B. Jordan (Sinners)', 'Wagner Moura (The Secret Agent)'] },
  { id: 'cast', name: 'Mejor Elenco', nominees: ['Hamnet', 'Marty Supreme', 'One Battle After Another', 'The Secret Agent', 'Sinners'] },
  { id: 'supp_actress', name: 'Mejor Actriz de Reparto', nominees: ['Elle Fanning (Sentimental Value)', 'Inga Ibsdotter Lilleaas (Sentimental Value)', 'Amy Madigan (Weapons)', 'Wunmi Mosaku (Sinners)', 'Teyana Taylor (One Battle After Another)'] },
  { id: 'supp_actor', name: 'Mejor Actor de Reparto', nominees: ['Benicio del Toro (One Battle After Another)', 'Jacob Elordi (Frankenstein)', 'Delroy Lindo (Sinners)', 'Sean Penn (One Battle After Another)', 'Stellan Skarsgård (Sentimental Value)'] },
  { id: 'orig_script', name: 'Mejor Guion Original', nominees: ['Blue Moon (Robert Kaplow)', 'It Was Just an Accident (Jafar Panahi)', 'Marty Supreme (Josh Safdie)', 'Sentimental Value (Joachim Trier)', 'Sinners (Ryan Coogler)'] },
  { id: 'adap_script', name: 'Mejor Guion Adaptado', nominees: ['Bugonia (Will Tracy)', 'Frankenstein (Guillermo del Toro)', 'Hamnet (Chloé Zhao)', 'One Battle After Another (Paul Thomas Anderson)', 'Train Dreams (Clint Bentley)'] },
  { id: 'animated', name: 'Mejor Película Animada', nominees: ['Arco', 'Elio', 'Las guerreras K-Pop', 'Little Amélie or The Character of Rain', 'Zootopia 2'] }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState('welcome'); 
  const [userName, setUserName] = useState('');
  const [catIndex, setCatIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [generatedCode, setGeneratedCode] = useState('');

  const handleVote = (type, nomineeIndex) => {
    const catId = CATEGORIES[catIndex].id;
    setSelections(prev => ({
      ...prev,
      [catId]: { ...prev[catId], [type]: nomineeIndex }
    }));
  };

  const isCategoryComplete = (id) => selections[id]?.winner !== undefined && selections[id]?.favorite !== undefined;

  const progress = useMemo(() => {
    const completed = CATEGORIES.filter(c => isCategoryComplete(c.id)).length;
    return (completed / CATEGORIES.length) * 100;
  }, [selections]);

  const generateFinalCode = () => {
    const code = CATEGORIES.map(cat => {
      const s = selections[cat.id];
      return `${s.winner}${s.favorite}`;
    }).join('');
    setGeneratedCode(code);
    setCurrentStep('summary');
  };

  const resetQuiniela = () => {
    setSelections({});
    setCatIndex(0);
    setCurrentStep('welcome');
    setUserName('');
  };

  // Pantalla de Bienvenida
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-between p-8 font-sans">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
              <Trophy size={64} className="text-black" />
            </div>
          </div>
          
          <h1 className="text-6xl font-black mb-2 italic tracking-tighter text-center">
            OSCARS <span className="text-amber-500">2026</span>
          </h1>
          <p className="text-neutral-500 text-sm uppercase tracking-[0.4em] font-bold mb-12">
            Quiniela Oficial
          </p>

          <div className="w-full space-y-4">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-amber-500 transition-colors">
                <User size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Ingresa tu nombre"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-neutral-900 border-2 border-neutral-800 focus:border-amber-500 rounded-2xl py-5 pl-12 pr-4 outline-none transition-all text-lg font-bold"
              />
            </div>

            <button 
              onClick={() => userName.trim() && setCurrentStep('voting')}
              disabled={!userName.trim()}
              className="w-full bg-white text-black font-black py-5 rounded-2xl text-xl uppercase tracking-tighter disabled:opacity-20 transition-all active:scale-95 shadow-xl"
            >
              Comenzar Votación
            </button>
          </div>
        </div>
        
        <div className="text-neutral-600 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
          <Smartphone size={12} /> Experiencia móvil Premium
        </div>
      </div>
    );
  }

  // Pantalla de Resumen Final
  if (currentStep === 'summary') {
    return (
      <div className="min-h-screen bg-neutral-950 text-white p-6 pb-12">
        <div className="max-w-md mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-black italic text-amber-500 leading-tight tracking-tighter">VOTO<br/>REGISTRADO</h2>
              <p className="text-neutral-400 font-bold uppercase text-xs tracking-widest mt-1">Participante: {userName}</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <CheckCircle2 className="text-green-500" size={40} />
            </div>
          </header>

          <div className="bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-8 mb-6 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 p-4 opacity-5">
               <Trophy size={120} />
             </div>
             
             <div className="relative z-10">
               <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-center">Certificado de Validación</p>
               
               <div className="space-y-4 mb-6">
                 <div className="bg-black/40 p-4 rounded-2xl border border-neutral-800/50">
                    <span className="text-[10px] text-neutral-500 block uppercase font-bold mb-1 tracking-widest">Nombre del Jugador</span>
                    <span className="text-2xl font-black text-white">{userName}</span>
                 </div>
                 <div className="bg-black/40 p-4 rounded-2xl border border-neutral-800/50">
                    <span className="text-[10px] text-neutral-500 block uppercase font-bold mb-1 tracking-widest">Código Único</span>
                    <span className="text-3xl font-mono font-black text-amber-500 tracking-wider break-all leading-none">{generatedCode}</span>
                 </div>
               </div>
               
               <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-center">
                 <p className="text-amber-200/70 text-xs font-bold leading-relaxed">
                   Toma una <span className="text-amber-500 uppercase">captura de pantalla</span> ahora. Envía esta imagen para validar tu participación en la quiniela.
                 </p>
               </div>
             </div>
          </div>

          <button 
            onClick={resetQuiniela}
            className="w-full bg-neutral-900 border border-neutral-800 text-neutral-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <RotateCcw size={18} /> CREAR OTRA QUINIELA
          </button>
        </div>
      </div>
    );
  }

  const currentCat = CATEGORIES[catIndex];
  const currentSel = selections[currentCat.id] || {};

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans">
      {/* Header de Votación con Título Extra Grande */}
      <div className="p-6 pt-8 bg-neutral-950 border-b border-neutral-900/50">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-amber-500 text-xs font-black tracking-[0.3em] uppercase">
              Categoría {catIndex + 1} / {CATEGORIES.length}
            </span>
            <span className="text-white/40 text-xs font-mono font-bold">{Math.round(progress)}%</span>
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter leading-none mb-4 uppercase">
            {currentCat.name}
          </h2>
          <div className="h-2 bg-neutral-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(245,158,11,0.4)]" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Lista de Nominados con Nombres Completos */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4 py-6 pb-32">
        {currentCat.nominees.map((nominee, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-[2.5rem] border-2 transition-all duration-300 ${
              currentSel.winner === idx || currentSel.favorite === idx 
                ? 'bg-neutral-900 border-amber-500/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
                : 'bg-transparent border-neutral-900'
            }`}
          >
            <p className="text-xl font-bold mb-5 tracking-tight leading-tight px-2">{nominee}</p>
            <div className="flex gap-3">
              <button 
                onClick={() => handleVote('winner', idx)} 
                className={`flex-1 py-4 rounded-2xl flex flex-col items-center justify-center gap-1 text-[9px] font-black transition-all ${
                  currentSel.winner === idx ? 'bg-amber-500 text-black shadow-lg scale-[1.02]' : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                <Trophy size={18} /> <span>PREDICCIÓN</span>
              </button>
              <button 
                onClick={() => handleVote('favorite', idx)} 
                className={`flex-1 py-4 rounded-2xl flex flex-col items-center justify-center gap-1 text-[9px] font-black transition-all ${
                  currentSel.favorite === idx ? 'bg-rose-600 text-white shadow-lg scale-[1.02]' : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                <Heart size={18} fill={currentSel.favorite === idx ? "currentColor" : "none"} /> <span>FAVORITO</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navegación Inferior Flotante */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/95 to-transparent z-30">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-4">
          <button 
            onClick={() => setCatIndex(Math.max(0, catIndex - 1))} 
            disabled={catIndex === 0}
            className="bg-neutral-900 py-5 rounded-2xl flex items-center justify-center disabled:opacity-20 border border-neutral-800 active:scale-90 transition-transform"
          >
            <ChevronLeft size={28} />
          </button>
          
          {catIndex === CATEGORIES.length - 1 ? (
            <button 
              onClick={generateFinalCode} 
              disabled={!isCategoryComplete(currentCat.id)} 
              className="col-span-3 bg-amber-500 text-black font-black rounded-2xl disabled:opacity-30 uppercase tracking-tighter text-xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Finalizar <CheckCircle2 size={24} />
            </button>
          ) : (
            <button 
              onClick={() => setCatIndex(catIndex + 1)} 
              disabled={!isCategoryComplete(currentCat.id)} 
              className="col-span-3 bg-white text-black font-black rounded-2xl disabled:opacity-30 uppercase tracking-tighter text-xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Siguiente <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}