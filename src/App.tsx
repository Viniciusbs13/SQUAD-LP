import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar as CalendarIcon, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data imports
import { PAIN_POINTS, METHOD_PILLARS, TIMELINE_STEPS, BENEFITS, SUCCESS_CASES, FAQS } from './data';

// Component imports
import EnterprisePortal from './components/EnterprisePortal';
import LeadGateway from './components/LeadGateway';

export default function App() {
  // --- STATES ---
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem('squad_unlocked') === 'true';
  });
  
  const [sliderVal, setSliderVal] = useState(65); 
  const [vslPlaying, setVslPlaying] = useState(false);
  const [vslProgress, setVslProgress] = useState(5); 
  const [vslSlideIndex, setVslSlideIndex] = useState(0);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [activeProofTab, setActiveProofTab] = useState<'all' | 'dashboards' | 'whatsapp' | 'reviews'>('all');
  const [countdown, setCountdown] = useState({ minutes: 19, seconds: 43 });
  const [remainingSlots, setRemainingSlots] = useState(3);
  
  const [selectedDate, setSelectedDate] = useState<string>('2026-07-09');
  const [selectedTime, setSelectedTime] = useState<string>('14:00');
  const [vslPlaytime, setVslPlaytime] = useState(0);
  const [vslUnlocked, setVslUnlocked] = useState(true);

  // VSL Custom Simulation slides content
  const VSL_SLIDES = [
    {
      title: "O FIM DO VENDEDOR QUE SÓ VENDE QUANDO O MERCADO AJUDA",
      subtitle: "Como transformar seu time comercial num time que fecha alto ticket todo mês, com método e comunicação — não com sorte ou boom de mercado.",
      tag: "ESTRATÉGIA"
    },
    {
      title: "OS 3 ERROS QUE FAZEM VOCÊ PERDER VENDA DE SOLAR",
      subtitle: "1. Concorrer só por preço com outros integradores | 2. Não saber responder objeção de payback e financiamento | 3. Proposta genérica sem ancoragem de valor.",
      tag: "O DIAGNÓSTICO"
    },
    {
      title: "O SISTEMA POR TRÁS DO SQUAD",
      subtitle: "Treinamento ao vivo semanal + scripts prontos pro nicho solar + comunidade fechada de integradores trocando resultado toda semana.",
      tag: "MÉTODO SQUAD"
    },
    {
      title: "CASO PRÁTICO: DE 3 PRA 9 SISTEMAS FECHADOS NO MÊS",
      subtitle: "A exata trilha de treinamento e scripts que uma equipe comercial solar usou pra parar de perder venda no 'vou pensar' e dobrar a taxa de fechamento.",
      tag: "RESULTADOS"
    },
    {
      title: "SEU PRÓXIMO PASSO: GARANTA SUA VAGA NO SQUAD",
      subtitle: "Por R$247/mês você entra na formação, pega os scripts e entra na comunidade. Clique abaixo e comece ainda essa semana.",
      tag: "CHAMADA PARA AÇÃO"
    }
  ];

  // Tick timer for VSL player simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (vslPlaying) {
      interval = setInterval(() => {
        setVslProgress((prev) => {
          if (prev >= 100) {
            setVslPlaying(false);
            return 100;
          }
          const next = prev + (100 / 120);
          const currentSlide = Math.min(Math.floor((next / 100) * VSL_SLIDES.length), VSL_SLIDES.length - 1);
          setVslSlideIndex(currentSlide);
          return next;
        });

        setVslPlaytime((prev) => {
          const next = prev + 1;
          if (next >= 5) {
            setVslUnlocked(true);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [vslPlaying]);

  // Tick timer for the Urgency Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 19, seconds: 59 }; // reset to loop
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set timer to exactly 18:49 when VSL is unlocked after 5s
  useEffect(() => {
    if (vslUnlocked) {
      setCountdown({ minutes: 18, seconds: 49 });
    }
  }, [vslUnlocked]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  // Generate discrete golden particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${12 + Math.random() * 12}s`,
    opacity: 0.2 + Math.random() * 0.4
  }));

  // Gating screen handling
  if (!isUnlocked) {
    return (
      <div className="relative min-h-screen bg-[#02050e] text-white font-sans overflow-x-hidden selection:bg-[#d4af37] selection:text-black">
        {/* Dynamic Floating Golden Particles Overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                animation: `floatUp ${p.animationDuration} linear infinite`,
                animationDelay: p.animationDelay,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <LeadGateway onUnlock={() => setIsUnlocked(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#02050e] text-white font-sans overflow-x-hidden selection:bg-[#d4af37] selection:text-black">
      
      {/* Dynamic Floating Golden Particles Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              animation: `floatUp ${p.animationDuration} linear infinite`,
              animationDelay: p.animationDelay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* ==================== VIEW: ENTERPRISE PUBLIC PORTAL ==================== */}
      <div className="relative z-10">
        <EnterprisePortal
          onOpenQualifyModal={() => {
            // Direct Kiwify Checkout URL redirection
            window.location.href = "https://pay.kiwify.com.br/0SuI59E";
          }}
          sliderVal={sliderVal}
          onSliderChange={setSliderVal}
          vslPlaying={vslPlaying}
          onToggleVsl={() => setVslPlaying(!vslPlaying)}
          vslProgress={vslProgress}
          onSetVslProgress={setVslProgress}
          vslSlideIndex={vslSlideIndex}
          vslSlides={VSL_SLIDES}
          vslUnlocked={vslUnlocked}
          vslPlaytime={vslPlaytime}
          onUnlockVsl={() => {
            setVslUnlocked(true);
            setVslProgress(100);
            setVslPlaytime(5);
          }}
          remainingSlots={remainingSlots}
          countdown={countdown}
          painPoints={PAIN_POINTS}
          methodPillars={METHOD_PILLARS}
          timelineSteps={TIMELINE_STEPS}
          benefits={BENEFITS}
          successCases={SUCCESS_CASES}
          activeProofTab={activeProofTab}
          onSetActiveProofTab={setActiveProofTab}
          openFaqId={openFaqId}
          onToggleFaq={toggleFaq}
          faqs={FAQS}
        />
      </div>

      {/* Subtle Reset Link in Footer style to re-gate for testing */}
      <div className="absolute bottom-4 left-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
        <button
          onClick={() => {
            localStorage.removeItem('squad_unlocked');
            setIsUnlocked(false);
          }}
          className="text-[10px] font-mono text-[#d4af37] border border-[#d4af37]/30 bg-black/40 px-2 py-1 rounded cursor-pointer"
        >
          [Dev Reset Gate]
        </button>
      </div>

    </div>
  );
}
