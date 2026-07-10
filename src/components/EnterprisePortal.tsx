import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  ArrowRight,
  TrendingDown,
  X,
  Sliders,
  Check,
  Zap,
  Plus,
  Minus,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Star,
  Shield,
  Compass,
  Filter,
  Activity,
  ArrowDown,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PainPoint, MethodPillar, TimelineStep, BenefitItem, FAQItem, SuccessCase } from '../types';

interface EnterprisePortalProps {
  onOpenQualifyModal: () => void;
  sliderVal: number;
  onSliderChange: (val: number) => void;
  vslPlaying: boolean;
  onToggleVsl: () => void;
  vslProgress: number;
  onSetVslProgress: (pct: number) => void;
  vslSlideIndex: number;
  vslSlides: { title: string; subtitle: string; tag: string }[];
  vslUnlocked: boolean;
  vslPlaytime: number;
  onUnlockVsl: () => void;
  remainingSlots: number;
  countdown: { minutes: number; seconds: number };
  painPoints: PainPoint[];
  methodPillars: MethodPillar[];
  timelineSteps: TimelineStep[];
  benefits: BenefitItem[];
  successCases: SuccessCase[];
  activeProofTab: 'all' | 'dashboards' | 'whatsapp' | 'reviews';
  onSetActiveProofTab: (tab: 'all' | 'dashboards' | 'whatsapp' | 'reviews') => void;
  openFaqId: string | null;
  onToggleFaq: (id: string) => void;
  faqs: FAQItem[];
}

interface VideoCase {
  id: string;
  thumbnail: string;
  videoUrl: string;
  caption: string;
}

const VIDEO_CASES: VideoCase[] = [
  {
    id: 'case-vid-1',
    thumbnail: 'https://lh3.googleusercontent.com/d/1nU4fQ4H7wl1uSCNtcf9_TDaWQiGiSavw',
    videoUrl: 'https://drive.google.com/file/d/1nU4fQ4H7wl1uSCNtcf9_TDaWQiGiSavw/preview',
    caption: 'Milton Oliveira - "O time aplicou o script e já fechou dois sistemas logo na segunda semana"',
  },
  {
    id: 'case-vid-2',
    thumbnail: 'https://lh3.googleusercontent.com/d/1euSAX3LTUec_-grr_dYPC67SOhvM0uAG',
    videoUrl: 'https://drive.google.com/file/d/1euSAX3LTUec_-grr_dYPC67SOhvM0uAG/preview',
    caption: 'Integrador Parceiro - "Depois do Squad a gente parou de perder venda pra concorrência por preço"',
  },
];

export default function EnterprisePortal({
  onOpenQualifyModal,
  sliderVal,
  onSliderChange,
  vslPlaying,
  onToggleVsl,
  vslProgress,
  onSetVslProgress,
  vslSlideIndex,
  vslSlides,
  vslUnlocked,
  vslPlaytime,
  onUnlockVsl,
  remainingSlots,
  countdown,
  painPoints,
  methodPillars,
  timelineSteps,
  benefits,
  successCases,
  activeProofTab,
  onSetActiveProofTab,
  openFaqId,
  onToggleFaq,
  faqs
}: EnterprisePortalProps) {
  
  const [expandedImageUrl, setExpandedImageUrl] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  const PORTFOLIO_IMAGES = [
    {
      id: 1,
      url: "https://lh3.googleusercontent.com/d/1xXQXqxUwPbwk_61gzrAOU1R9KkTU9liN"
    },
    {
      id: 2,
      url: "https://lh3.googleusercontent.com/d/1cWNxMWV8FUrzHu8xqF70xvAgvW0ADM8J"
    },
    {
      id: 3,
      url: "https://lh3.googleusercontent.com/d/1iZepqjUdWvb0SBj41am21TcC2c76svH-"
    },
    {
      id: 4,
      url: "https://lh3.googleusercontent.com/d/1gyzhUNM2YYopzpD4EUe3Ag5QtHUES3Eh"
    },
    {
      id: 5,
      url: "https://lh3.googleusercontent.com/d/1gIZXfx3VANdE-UdUO__g71XDoiXtU-5A"
    },
    {
      id: 6,
      url: "https://lh3.googleusercontent.com/d/1QiZFyzC5b7eUWMP3fkNdarcQKiqSt1G2"
    },
    {
      id: 7,
      url: "https://lh3.googleusercontent.com/d/1IkdSZ-z6msGU2O6bwtyHMdBvYQK_JMdw"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [activePillar, setActivePillar] = useState(1);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PORTFOLIO_IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, PORTFOLIO_IMAGES.length]);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-pillar-id'));
          if (id) {
            setActivePillar(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.05,
    });

    const elements = document.querySelectorAll('[data-pillar-id]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Variants for scroll animation
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const methodSteps = [
    {
      id: 1,
      number: "01",
      category: "Barra de Qualificação",
      title: "Qualificamos quem realmente está pronto para crescer.",
      description: "Antes mesmo de apresentar a solução, filtramos quem faz sentido para o método, garantindo que o tempo de ambas as partes seja investido com máxima eficiência.",
      imageUrl: "https://lh3.googleusercontent.com/d/1v4sLBr_QPMStN_z2gXaV0K6Zyr2Dv_3I",
    },
    {
      id: 2,
      number: "02",
      category: "Hero",
      title: "A promessa que muda a direção do negócio.",
      description: "Explicamos com clareza matemática e autoridade inquestionável o retorno esperado, despertando o interesse dos decisores nos primeiros segundos de contato.",
      imageUrl: "https://lh3.googleusercontent.com/d/1gIZXfx3VANdE-UdUO__g71XDoiXtU-5A",
    },
    {
      id: 3,
      number: "03",
      category: "Prova Social",
      title: "Resultados que eliminam qualquer dúvida.",
      description: "Mostramos de forma visual dashboards integrados, capturas de reuniões estratégicas e relatórios auditados. Confiança sólida é construída estritamente com dados reais.",
      imageUrl: "https://lh3.googleusercontent.com/d/14bp1MClIryieRiwQY8ENO7Ywx_4ZcFxc",
    },
    {
      id: 4,
      number: "04",
      category: "As dores",
      title: "Entendemos o problema antes de apresentar a solução.",
      description: "Mapeamos com precisão as ineficiências operacionais comuns enfrentadas por empresários de alto nível, criando identificação e alinhamento imediatos.",
      imageUrl: "https://lh3.googleusercontent.com/d/1qpJIRfsUq_kp-VBrOyb4CL_FAZsPkJpr",
    },
    {
      id: 5,
      number: "05",
      category: "Ecossistema",
      title: "Temos eventos presenciais e um ecossistema de vendas completo.",
      description: "Rompemos com o formato tradicional. Criamos um ecossistema vivo que une treinamentos semanais, eventos presenciais exclusivos de alto impacto e ferramentas práticas projetadas unicamente para acelerar o faturamento de integradores de energia solar.",
      imageUrl: "https://lh3.googleusercontent.com/d/1ww2mqSWtKC0RwMG9DGT6ayoAx_49fHPA",
    }
  ];

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: reducedMotion ? 0 : 60,
      filter: reducedMotion ? "none" : "blur(10px)",
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className="text-white relative font-sans">
      
      {/* Background visual elements */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-[#0d1e4a]/40 via-transparent to-transparent pointer-events-none z-0" />
      
      {/* Hero Glow Backdrops */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-blue-900/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[25%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#d4af37]/5 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-950/20 blur-[160px] pointer-events-none z-0" />

      {/* Corporate Grid pattern with gold accentuation */}
      <div className="absolute inset-0 bg-grid-white pointer-events-none z-0" />

      {/* 1. TOP ANNOUNCEMENT BAR (STICKY) */}
      <div className="border-b border-[#d4af37]/15 bg-[#02050e]/95 backdrop-blur-md py-4 sticky top-0 z-[100] px-4 shadow-lg shadow-black/40">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-2">
          {!vslUnlocked ? (
            <div className="flex flex-col items-center gap-1">
              <div className="text-[#d4af37] font-mono text-sm uppercase tracking-[0.25em] font-extrabold text-glow-gold">
                Cultura de Vendas
              </div>
              <p className="text-white/60 text-[10px] sm:text-xs font-sans max-w-xl mx-auto">
                Formação contínua em vendas e comunicação para quem vive do mercado de energia solar.
              </p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 font-mono text-white text-xs sm:text-sm bg-red-950/40 border border-red-500/30 px-5 py-1.5 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-white/80 font-medium">As vagas desta turma encerram em:</span>
              <span className="text-red-400 font-extrabold tracking-wider text-glow-red font-mono">
                {formatNumber(countdown.minutes)}:{formatNumber(countdown.seconds)}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* 2. CORPORATE HERO SECTION WITH CUSTOM BACKGROUND */}
      <div className="relative w-full overflow-hidden border-b border-[#d4af37]/15">
        {/* Background Image Layer with Smart Zoom & Proportion Sizing */}
        <div 
          className="absolute inset-0 bg-no-repeat pointer-events-none z-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url('https://lh3.googleusercontent.com/d/1qCAvNmwln2L2d6ierPnhyrfkibVHwHSZ')` 
          }}
        />
        {/* Subtle premium dark gradient and vignette overlay to preserve high contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02050e]/95 via-[#02050e]/75 to-[#02050e]/95 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#02050e_95%)] z-0 pointer-events-none" />

        <section className="relative z-10 pt-10 pb-20 lg:pt-16 lg:pb-28 px-4 max-w-7xl mx-auto">
          
          {/* Subtle, highly elegant low-opacity Lion background shield element inside Hero */}
          <div className="absolute right-[5%] top-[10%] w-[450px] h-[450px] opacity-[0.02] text-white pointer-events-none select-none z-0">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <path d="M50 5 L90 25 L90 65 L50 95 L10 65 L10 25 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M50 15 L80 32 L80 60 L50 82 L20 60 L20 32 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
              {/* Elegant Shield Crest / Lion outline suggestion */}
              <path d="M50 30 Q53 40 65 42 Q50 50 50 68 Q50 50 35 42 Q47 40 50 30 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="flex flex-col items-center gap-12 lg:gap-16 relative z-10 max-w-5xl mx-auto">
          
          {/* Left: Premium Value Proposition */}
          <div className="w-full text-center flex flex-col items-center justify-center max-w-4xl">
            
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white mb-6 text-center leading-[1.15] tracking-tight"
            >
              Vendedor de energia solar não perde negócio por falta de sol. Perde por falta de <span className="text-gold text-glow-gold font-normal italic">método</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed font-sans text-center"
            >
              Squad é a formação mensal de vendas e comunicação criada pra quem vive do setor solar: treinamento ao vivo toda semana, scripts prontos pras objeções do seu cliente e uma comunidade fechada de integradores que já fecha alto ticket todo mês.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-white/90 backdrop-blur-[12px] border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 w-fit mx-auto cursor-pointer relative z-20"
            >
              {/* Avatar Stack */}
              <div className="flex -space-x-2.5 md:-space-x-3 shrink-0">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Membro ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-[34px] h-[34px] md:w-[42px] md:h-[42px] rounded-full border-2 border-white object-cover shadow-sm hover:-translate-y-1 hover:scale-110 transition-all duration-250 ease-out z-[1] hover:z-[10] cursor-pointer"
                  />
                ))}
              </div>

              {/* Text Area */}
              <div className="text-left text-[#02050e] font-sans text-[11px] sm:text-xs md:text-sm tracking-tight leading-tight select-none">
                <span className="font-medium text-[#02050e]/90">
                  Mais de <strong className="font-extrabold text-[#02050e]">450+</strong> integradores e vendedores solares já treinam com a gente toda semana. <span className="hidden sm:inline">Junte-se ao Squad e comece hoje.</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Persuasive VSL Video Simulator (Liquid glass with glowing navy backdrops) */}
          <div className="w-full max-w-4xl relative">
            
            {/* Glowing Accent behind the VSL player */}
            <div className="absolute inset-0 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none z-0" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.97, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-gold rounded-[24px] p-1.5 shadow-2xl relative z-10"
            >
              <div className="rounded-[20px] overflow-hidden bg-[#02050e]/90">
                
                {/* Custom Video Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#d4af37]/10 bg-white/[0.01] text-[10px] text-white/45 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400/30"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-white/5"></span>
                    <span className="ml-2 text-white/35 tracking-widest font-bold">SQUAD_CULTURADEVENDAS.mp4</span>
                  </div>
                  <span className="text-[9px] bg-[#d4af37]/15 text-[#f3e5ab] border border-[#d4af37]/25 px-2.5 py-0.5 rounded-md font-bold tracking-widest uppercase">
                    Aula Demonstrativa Ativa
                  </span>
                </div>

                {/* Simulated video playback screen */}
                <div className="relative aspect-video flex flex-col justify-between p-6 sm:p-8 overflow-hidden bg-gradient-to-br from-[#02050e] to-[#0d1e4a]/60">
                  <div className="absolute inset-0 bg-grid-white opacity-[0.015] pointer-events-none"></div>
                  
                  {/* Subtle inner gold glow inside active slide screen */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none" />

                  {/* VSL Slide Title Info */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#f3e5ab] text-[8.5px] font-mono tracking-widest uppercase font-bold">
                      {vslSlides[vslSlideIndex].tag}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      FASE {vslSlideIndex + 1} de {vslSlides.length}
                    </span>
                  </div>

                  {/* VSL Message Display */}
                  <div className="my-auto py-3 text-center relative z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={vslSlideIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-md sm:max-w-lg mx-auto"
                      >
                        <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight mb-2.5">
                          {vslSlides[vslSlideIndex].title}
                        </h2>
                        <p className="text-xs sm:text-xs text-white/60 leading-relaxed font-sans max-w-sm sm:max-w-md mx-auto">
                          {vslSlides[vslSlideIndex].subtitle}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Player controls */}
                  <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between gap-4 relative z-10">
                    <button 
                      onClick={onToggleVsl}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-black hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-lg"
                    >
                      {vslPlaying ? (
                        <div className="flex items-center justify-center gap-0.5 w-2.5 h-2.5">
                          <div className="w-0.5 h-2.5 bg-black"></div>
                          <div className="w-0.5 h-2.5 bg-black"></div>
                        </div>
                      ) : (
                        <Play className="w-3 h-3 fill-current ml-0.5 text-black" />
                      )}
                    </button>

                    {/* Timeline Slider Progress */}
                    <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden cursor-pointer" onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = ((e.clientX - rect.left) / rect.width) * 100;
                      onSetVslProgress(pct);
                    }}>
                      <div 
                        className="h-full bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] rounded-full absolute left-0 top-0 transition-all duration-200" 
                        style={{ width: `${vslProgress}%` }}
                      ></div>
                    </div>

                    <span className="text-[9px] text-white/40 font-mono shrink-0">
                      {vslPlaying ? 'TRANSMITINDO APRESENTAÇÃO...' : 'PAUSADO'}
                    </span>
                  </div>

                  {/* Non Playing Cover Overlay */}
                  {!vslPlaying && (
                    <div className="absolute inset-0 bg-[#02050e]/90 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center z-20 transition-all duration-300">
                      <button 
                        onClick={onToggleVsl}
                        className="w-14 h-14 rounded-full bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/35 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-all"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5 text-[#f3e5ab]" />
                      </button>
                      <h4 className="mt-4 text-[9px] font-mono text-[#d4af37] uppercase tracking-widest font-bold">
                        Aula Demonstrativa Ativa
                      </h4>
                      <h3 className="mt-1 text-sm sm:text-base font-bold text-white max-w-sm">
                        Como vender energia solar de alto valor através de método e comunicação
                      </h3>
                    </div>
                  )}

                </div>

                {/* Interactive note footer */}
                <div className="p-3.5 bg-white/[0.01] border-t border-white/5 text-center text-xs text-white/50 font-sans">
                  <span className="text-[#d4af37] font-semibold">Assista um trecho real de uma aula do Squad —</span> clique para navegar pelos módulos.
                </div>

              </div>
            </motion.div>
          </div>

          {/* Elegant buttons below the video that only appear after 5s */}
          <AnimatePresence>
            {vslUnlocked && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-2xl relative z-20"
              >
                <button
                  onClick={onOpenQualifyModal}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] text-black font-extrabold rounded-xl gold-glow-btn text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer border border-[#f3e5ab]/20 transform hover:scale-[1.02] transition-transform duration-300"
                >
                  Quero Entrar no Squad
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
                
                <button
                  onClick={() => {
                    const el = document.getElementById('pillars');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/[0.03] text-[#d4af37] hover:text-[#f3e5ab] font-bold rounded-xl border border-[#d4af37]/30 hover:border-[#f3e5ab]/50 transition-all text-xs uppercase tracking-wider cursor-pointer"
                >
                  Conhecer o Método
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
      </div>

      <AnimatePresence mode="wait">
        {vslUnlocked && (
          <motion.div
            key="unlocked-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 3. HIGH-END CREDIBILITY BOARD */}
            <section className="py-12 bg-[#02050e] border-y border-[#d4af37]/15 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono text-glow-gold text-[#f3e5ab]">1.200+</span>
              <span className="text-[10px] text-[#d4af37] uppercase tracking-widest font-mono mt-1 font-semibold">Alunos Ativos no Squad</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono text-glow-gold text-[#f3e5ab]">15+</span>
              <span className="text-[10px] text-[#d4af37] uppercase tracking-widest font-mono mt-1 font-semibold">Turmas Já Formadas</span>
            </div>
            <div className="flex flex-col items-center col-span-2 lg:col-span-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono text-glow-gold text-[#f3e5ab]">+35%</span>
              <span className="text-[10px] text-[#d4af37] uppercase tracking-widest font-mono mt-1 font-semibold">Aumento Médio no Ticket Fechado</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono text-glow-gold text-[#f3e5ab]">4</span>
              <span className="text-[10px] text-[#d4af37] uppercase tracking-widest font-mono mt-1 font-semibold">Treinamentos ao Vivo por Mês</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono text-glow-gold text-[#f3e5ab]">9.7</span>
              <span className="text-[10px] text-[#d4af37] uppercase tracking-widest font-mono mt-1 font-semibold">Nota Média dos Alunos</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CINEMATIC 3D INFINITE SHOWCASE CAROUSEL */}
      <section className="py-24 relative overflow-hidden z-10 px-4 w-full bg-gradient-to-b from-[#02050e] via-[#050e26]/30 to-[#02050e]">
        {/* Ambient lights and glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[160px] pointer-events-none z-0" />
        <div className="absolute top-[10%] left-10 w-[300px] h-[300px] rounded-full bg-[#d4af37]/3 blur-[140px] pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center rounded-md bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1 font-mono text-[9px] font-bold text-[#d4af37] uppercase tracking-wider">
              Portfólio de Engenharia de Vendas
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-4 mb-4 leading-tight">
              Vendedores de <span className="text-gold text-glow-gold font-normal italic">Alta Performance</span> em Ação
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans max-w-2xl mx-auto">
              Explore os resultados reais de quem já treina com a Cultura de Vendas toda semana e aplica scripts de vendas específicos do mercado de energia solar.
            </p>
          </div>

          {/* 3D Stage Container */}
          <div className="relative h-[340px] sm:h-[420px] md:h-[500px] w-full flex items-center justify-center overflow-visible select-none mt-6">
            {/* 3D perspective wrapper */}
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{ 
                perspective: "1200px", 
                transformStyle: "preserve-3d" 
              }}
            >
              {PORTFOLIO_IMAGES.map((item, idx) => {
                // Calculate relative position with wrapping
                let diff = idx - activeIndex;
                const half = PORTFOLIO_IMAGES.length / 2;
                if (diff > half) diff -= PORTFOLIO_IMAGES.length;
                if (diff < -half) diff += PORTFOLIO_IMAGES.length;

                // Spacing calculations
                const tx = diff * 280;
                const tz = -Math.abs(diff) * 160;
                const ry = -diff * 22; // rotate in arch
                
                const isCenter = idx === activeIndex;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => {
                      setHoveredIndex(idx);
                      setIsPaused(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      setIsPaused(false);
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.45 - Math.abs(diff) * 0.1,
                      scale: isCenter ? 1.05 : 1 - Math.abs(diff) * 0.1,
                      x: tx,
                      z: tz,
                      rotateY: ry,
                      y: hoveredIndex === idx ? -15 : 0,
                      filter: isCenter ? "blur(0px) brightness(1.15)" : `blur(${Math.min(4, Math.abs(diff) * 1.5)}px) brightness(${0.7 - Math.abs(diff) * 0.1})`,
                    }}
                    transition={{
                      x: { type: "spring", stiffness: 180, damping: 24 },
                      z: { type: "spring", stiffness: 180, damping: 24 },
                      rotateY: { type: "spring", stiffness: 180, damping: 24 },
                      scale: { duration: 0.35 },
                      opacity: { duration: 0.35 },
                      y: hoveredIndex === idx 
                        ? { type: "spring", stiffness: 300, damping: 20 }
                        : { duration: 5 + (item.id % 3) * 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className={`absolute w-[240px] sm:w-[320px] md:w-[380px] aspect-[4/3] rounded-[28px] overflow-hidden cursor-pointer z-10 transition-shadow duration-300 ${
                      isCenter 
                        ? "shadow-[0_20px_50px_rgba(212,175,55,0.25)] border-2 border-[#d4af37]/60" 
                        : "shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10"
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden"
                    }}
                  >
                    {/* Glassmorphic Shell with glowing border and subtle reflection */}
                    <div className="absolute inset-0 bg-[#050e26]/40 backdrop-blur-xl p-[2px] rounded-[28px] overflow-hidden h-full">
                      
                      {/* Embedded Image */}
                      <div className="absolute inset-0 z-0 overflow-hidden rounded-[26px]">
                        <img
                          src={item.url}
                          alt=""
                          className="w-full h-full object-cover select-none"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. METHOD TIMELINE SECTION (Inspired by "Innovation x Vision") */}
      <section className="relative z-10 w-full overflow-hidden bg-black py-28 md:py-40">
        
        {/* Ambient glows */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.03)_0%,_transparent_75%)] pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.02)_0%,_transparent_75%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          
          {/* Centered Editorial Title */}
          <div className="text-center max-w-4xl mx-auto mb-28 md:mb-44 relative z-10">
            <span className="inline-flex items-center rounded-md bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1 font-mono text-[9px] font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-6">
              Como tudo acontece
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none uppercase font-sans">
              NOSSO <span className="font-serif italic text-glow-gold text-[#f3e5ab] lowercase font-normal tracking-wide inline-block">Método</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/40 leading-relaxed font-sans max-w-xl mx-auto mt-6">
              Do primeiro clique de captação até a assinatura do contrato. Uma jornada cinematográfica pelos bastidores do nosso processo de alto nível.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            
            {/* Main Steps Content Column */}
            <div className="space-y-10 sm:space-y-12 lg:space-y-14">
              {methodSteps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                const isActive = activePillar === step.id;
                
                return (
                  <div
                    key={step.id}
                    id={`timeline-step-${step.id}`}
                    data-pillar-id={step.id}
                    className="scroll-mt-36"
                  >
                    <motion.div
                      variants={stepVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-180px" }}
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center transition-all duration-700 ${
                        isActive ? "opacity-100" : "opacity-40 hover:opacity-100"
                      }`}
                    >
                      {/* Left: Content panel */}
                      <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="space-y-2">
                          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono text-[#d4af37] font-bold block">
                            {step.category}
                          </span>
                          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight uppercase font-sans">
                            {step.title}
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
                          {step.description}
                        </p>
                      </div>

                      {/* Right: Image display (approx 55% width) */}
                      <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div 
                          onClick={() => setExpandedImageUrl(step.imageUrl || null)}
                          className="liquid-glass rounded-3xl overflow-hidden aspect-video w-full group/video shadow-[0_24px_70px_rgba(0,0,0,0.8)] border border-white/5 relative cursor-pointer hover:border-[#d4af37]/30 transition-all duration-300"
                        >
                          <img
                            src={step.imageUrl}
                            alt={step.title}
                            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover/video:scale-[1.04]"
                            referrerPolicy="no-referrer"
                          />
                          {/* Inner dark gradient overlay with click instruction */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 pointer-events-none">
                            <span className="text-[10px] text-[#f3e5ab] font-mono tracking-wider bg-black/80 px-3 py-1 rounded-full border border-[#d4af37]/20">
                              Clique para ampliar o print
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Fine horizontal dividing line */}
                    {idx < methodSteps.length - 1 && (
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mt-10 sm:mt-12 lg:mt-14" />
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Call to Action Final */}
          <div className="mt-32 sm:mt-48 max-w-4xl mx-auto text-center relative z-10 border-t border-white/5 pt-28">
            <span className="inline-flex items-center rounded-md bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1 font-mono text-[9px] font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-6">
              Aceleração de Resultados
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-sans leading-none mb-6">
              Sua próxima reunião <br className="hidden sm:inline" /> começa hoje
            </h2>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed font-sans max-w-xl mx-auto mb-10">
              Conecte sua empresa a um fluxo automatizado de tomada de decisão, trazendo previsibilidade e escala com leads altamente qualificados.
            </p>

            <button
              onClick={onOpenQualifyModal}
              className="px-10 py-5 bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] text-black font-extrabold rounded-xl gold-glow-btn text-xs uppercase tracking-widest cursor-pointer border border-[#f3e5ab]/20 transform hover:scale-[1.03] active:scale-95 transition-all duration-300 inline-flex items-center gap-3"
            >
              Simular Protocolo de Entrada
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. PILLARS OF METHOD (MÉTODO) */}
      <section id="pillars" className="py-24 relative z-10 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center rounded-md bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1 font-mono text-[9px] font-bold text-[#d4af37] uppercase tracking-wider">
              Pilares Operacionais
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4 mb-4">
              A engenharia moderna de contratos corporativos
            </h2>
            <p className="text-sm text-white/60 leading-relaxed font-sans">
              Um modelo unificado que cuida da atração, qualificação e suporte de fechamentos sem burocracias.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {methodPillars.map((pillar) => (
              <motion.div 
                key={pillar.id}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="glass-gold glass-gold-hover rounded-[20px] p-[1px]"
              >
                <div className="rounded-[20px] p-6 bg-[#050e26]/50 backdrop-blur-xl h-full flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-5">
                      <Zap className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{pillar.name}</h3>
                    <p className="text-xs text-white/50 leading-relaxed mb-6 font-sans">{pillar.explanation}</p>
                  </div>
                  <div className="pt-3 border-t border-[#d4af37]/10">
                    <span className="text-[9px] font-mono tracking-widest text-[#d4af37] font-bold uppercase block">
                      Resultado de Entrega:
                    </span>
                    <p className="text-[11.5px] text-white/70 italic mt-1 font-sans">"{pillar.benefit}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. AUTHORITY SECTION */}
      <section className="relative py-24 sm:py-32 px-4 overflow-hidden border-b border-[#d4af37]/15">
        {/* Backdrops — mesmos glows usados no Hero */}
        <div className="absolute top-[10%] left-[8%] w-[380px] h-[380px] rounded-full bg-blue-900/10 blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-[10%] right-[8%] w-[420px] h-[420px] rounded-full bg-[#d4af37]/5 blur-[150px] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 items-center">

          {/* ---------- FOTO ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Moldura com brackets dourados nos 4 cantos (assinatura visual) */}
            <div className="relative rounded-[28px] overflow-hidden border border-[#d4af37]/20">
              <img
                src="https://lh3.googleusercontent.com/d/1HvUVEFR-2hFpBn5svDEdRL1ASpUGDk4F"
                alt="Fundadora da Cultura de Vendas"
                className="w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
              {/* véu navy para manter contraste com o resto do site */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02050e]/70 via-transparent to-[#02050e]/10 pointer-events-none" />
            </div>

            {/* Brackets de canto — o "signature element" futurista */}
            {[
              'top-3 left-3 border-t border-l',
              'top-3 right-3 border-t border-r',
              'bottom-3 left-3 border-b border-l',
              'bottom-3 right-3 border-b border-r',
            ].map((pos, i) => (
              <div key={i} className={`absolute w-6 h-6 border-[#d4af37]/70 ${pos}`} />
            ))}

            {/* Chip flutuante 1 — canto superior direito, fora da foto */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden sm:flex absolute -top-5 -right-5 flex-col items-center justify-center w-24 h-24 rounded-2xl bg-[#02050e]/90 border border-[#d4af37]/30 backdrop-blur-md shadow-lg"
            >
              <span className="text-[#d4af37] font-mono font-extrabold text-xl leading-none">8+</span>
              <span className="text-white/50 font-mono text-[9px] uppercase tracking-widest mt-1 text-center px-1">
                anos de campo
              </span>
            </motion.div>

            {/* Chip flutuante 2 — base, sobre a foto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-xl bg-[#02050e]/90 border border-[#d4af37]/30 backdrop-blur-md shadow-lg whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="text-white/80 font-mono text-[11px] uppercase tracking-widest">
                R$ 48M+ em faturamento documentado
              </span>
            </motion.div>
          </motion.div>

          {/* ---------- CONTEÚDO ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center rounded-md bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1 font-mono text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-6">
              Conheça a metodologia
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              Testada em campo, <span className="text-gold text-glow-gold font-normal italic">validada por resultado</span>
            </h2>

            <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Mais de <strong className="text-white/85 font-semibold">8 anos</strong> treinando times comerciais do setor solar,
              mais de <strong className="text-white/85 font-semibold">R$ 48M</strong> em faturamento documentado por integradores que
              aplicaram o método — organizado nos três pilares que sustentam o Squad: estratégico, tático e operacional.
            </p>

            {/* Pilares como chips horizontais */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
              {[
                { icon: <Layers className="w-4 h-4" />, label: 'Estratégico', sub: 'Posicionamento e oferta' },
                { icon: <TrendingUp className="w-4 h-4" />, label: 'Tático', sub: 'Processo comercial' },
                { icon: <Rocket className="w-4 h-4" />, label: 'Operacional', sub: 'Execução em campo' },
              ].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-[#d4af37]/15"
                >
                  <span className="text-[#d4af37]">{p.icon}</span>
                  <div className="text-left leading-tight">
                    <p className="text-white text-xs font-bold">{p.label}</p>
                    <p className="text-white/40 text-[10px]">{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('pillars');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] text-black font-extrabold rounded-xl gold-glow-btn text-xs uppercase tracking-wider cursor-pointer border border-[#f3e5ab]/20 transform hover:scale-[1.02] transition-transform duration-300"
            >
              Explorar os 3 pilares
              <ArrowDown className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>


      {/* 9. INTERACTIVE SUCCESS CASES (PROVA SOCIAL) */}
      <section className="py-24 bg-gradient-to-r from-[#02050e] via-[#050e26] to-[#02050e] border-t border-[#d4af37]/15 relative z-10 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center rounded-md bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1 font-mono text-[9px] font-bold text-[#d4af37] uppercase tracking-wider">
              Casos Reais de Sucesso
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4 mb-4">
              Impacto financeiro de alto nível verificado
            </h2>
            <p className="text-sm text-white/60 leading-relaxed font-sans">
              Resultados reais e depoimentos enviados por integradores parceiros que aplicam o método de vendas em campo:
            </p>
          </div>

          {/* Dynamic lists matching categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <AnimatePresence mode="popLayout">
              {successCases
                .map((cs) => (
                  <motion.div 
                    layout
                    key={cs.id} 
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="glass-gold rounded-[24px] p-[1px]"
                  >
                    <div className="rounded-[24px] p-6 sm:p-8 bg-[#050e26]/40 backdrop-blur-xl h-full flex flex-col justify-between">
                      
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <span className="text-xs font-bold text-white block">{cs.clientName}</span>
                            <span className="text-[9px] text-[#d4af37] font-mono uppercase tracking-wider font-semibold">{cs.niche}</span>
                          </div>
                          <span className="text-[10px] bg-[#d4af37]/10 text-[#f3e5ab] border border-[#d4af37]/20 px-3 py-0.5 rounded-full font-mono font-bold">
                            {cs.metric}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-white mb-2.5">"{cs.title}"</h3>
                        <p className="text-xs text-white/60 leading-relaxed mb-6 font-sans">"{cs.content}"</p>
                      </div>

                      {/* Custom UI elements for cases */}
                      {cs.type === 'image' && cs.imageUrl && (
                        <div 
                          onClick={() => setExpandedImageUrl(cs.imageUrl || null)}
                          className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-black/40 group/img relative cursor-pointer aspect-[16/10] flex items-center justify-center p-2 hover:border-[#d4af37]/40 transition-all duration-300"
                        >
                          <img 
                            src={cs.imageUrl} 
                            alt={cs.title} 
                            className="max-w-full max-h-full object-contain rounded-xl transition-transform duration-300 group-hover/img:scale-[1.02]" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 pointer-events-none">
                            <span className="text-[10px] text-[#f3e5ab] font-mono tracking-wider bg-black/80 px-3 py-1 rounded-full border border-[#d4af37]/20">
                              Clique para ampliar o print
                            </span>
                          </div>
                        </div>
                      )}

                      {cs.type === 'dashboard' && cs.dashboardData && (
                        <div className="p-4 rounded-xl bg-black/45 border border-white/5">
                          <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-wider block mb-2 font-bold">{cs.dashboardData.label}</span>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-[9px] text-white/40 block font-sans">Anterior</span>
                              <span className="text-xs text-red-400 font-bold font-mono line-through">{cs.dashboardData.before}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-[#d4af37] block font-sans">Com o Squad</span>
                              <span className="text-sm text-emerald-400 font-extrabold flex items-center gap-1 font-mono">
                                {cs.dashboardData.after}
                                <TrendingUp className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {cs.type === 'before_after' && cs.dashboardData && (
                        <div className="p-4 rounded-xl bg-black/45 border border-white/5">
                          <span className="text-[9px] font-mono text-[#d4af37] uppercase block mb-2 tracking-wider font-bold">{cs.dashboardData.label}</span>
                          <div className="relative h-12 bg-zinc-950 rounded-xl overflow-hidden border border-white/5 flex items-center px-4">
                            <div className="w-1/2 text-left">
                              <span className="text-[9px] text-white/40 block font-sans">Modelo Comum</span>
                              <span className="text-xs text-red-400 font-bold font-mono">{cs.dashboardData.before}</span>
                            </div>
                            <div className="w-1/2 text-right">
                              <span className="text-[9px] text-[#d4af37] block font-sans">Com o Squad</span>
                              <span className="text-xs text-emerald-400 font-extrabold font-mono">{cs.dashboardData.after}</span>
                            </div>
                            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5"></div>
                          </div>
                        </div>
                      )}

                      {cs.type === 'chat' && cs.chatMessages && (
                        <div className="p-4 rounded-xl bg-black/45 border border-white/5 space-y-2.5 max-h-48 overflow-y-auto scrollbar-thin">
                          <span className="text-[9px] font-mono text-white/30 uppercase block border-b border-white/5 pb-1 mb-2 tracking-wider">Histórico de Fechamento</span>
                          {cs.chatMessages.map((msg, i) => (
                            <div key={i} className={`flex flex-col ${msg.sender === 'client' ? 'items-start' : 'items-end'}`}>
                              <div className={`p-2.5 rounded-2xl max-w-[85%] text-[10.5px] leading-relaxed ${msg.sender === 'client' ? 'bg-[#050e26] text-white/90 border border-white/5' : 'bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] text-black font-semibold'}`}>
                                <p className="font-sans">{msg.text}</p>
                                <span className={`text-[8px] block text-right mt-1 font-mono ${msg.sender === 'client' ? 'text-white/40' : 'text-black/65'}`}>{msg.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {cs.type === 'review' && cs.avatarUrl && (
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#d4af37]/10">
                          <img src={cs.avatarUrl} className="w-9 h-9 rounded-full object-cover border border-[#d4af37]/30" alt="Avatar" referrerPolicy="no-referrer" />
                          <div>
                            <span className="text-xs font-bold text-white block">{cs.clientName}</span>
                            <span className="text-[10px] text-white/45">Diretor Comercial</span>
                          </div>
                        </div>
                      )}

                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 9.1 VIDEO TESTIMONIALS (CASES EM VÍDEO) */}
      <section className="relative py-24 sm:py-32 px-4 overflow-hidden bg-[#02050e] border-b border-[#d4af37]/15">
        {/* Backdrops — mesmos glows do resto do site */}
        <div className="absolute top-[15%] left-[10%] w-[380px] h-[380px] rounded-full bg-[#d4af37]/5 blur-[150px] pointer-events-none z-0" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-900/10 blur-[140px] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-grid-white opacity-[0.02] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4"
          >
            Cases de quem já aplicou <br className="hidden sm:inline" />
            o <span className="text-gold text-glow-gold font-normal italic">Squad</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-white/50 mb-14"
          >
            Aperte no botão abaixo para garantir sua vaga agora mesmo
          </motion.p>

          {/* Grid de 2 vídeos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {VIDEO_CASES.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="relative rounded-3xl overflow-hidden border border-[#d4af37]/20 group cursor-pointer"
                onClick={() => setPlayingVideoId(v.id)}
              >
                <div className="relative aspect-[3/4] bg-[#0d1e4a]/40">
                  {playingVideoId === v.id ? (
                    <iframe
                      src={`${v.videoUrl}?autoplay=1`}
                      className="w-full h-full border-0 rounded-3xl"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <>
                      <img
                        src={v.thumbnail}
                        alt="Case em vídeo"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02050e]/85 via-[#02050e]/10 to-transparent" />

                      {/* Botão de play dourado */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 text-black fill-black ml-1" />
                        </div>
                      </div>

                      {/* Legenda/quote */}
                      <div className="absolute bottom-0 inset-x-0 p-5">
                        <p className="text-white/90 text-xs sm:text-sm font-medium leading-snug text-center">
                          {v.caption}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            onClick={onOpenQualifyModal}
            className="mt-14 inline-flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] text-black font-extrabold rounded-xl gold-glow-btn text-xs uppercase tracking-widest cursor-pointer border border-[#f3e5ab]/20 transform hover:scale-[1.02] transition-transform duration-300"
          >
            Garantir Minha Vaga no Squad
          </motion.button>
        </div>
      </section>

      {/* 10. PRE-FAQ ACCORDION */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-md bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1 font-mono text-[9px] font-bold text-[#d4af37] uppercase tracking-wider">
              Esclarecimentos Comerciais
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-[#050e26]/30 border border-[#d4af37]/15 rounded-[16px] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => onToggleFaq(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.01]"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-white">{faq.question}</span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#d4af37] shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-white/40 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/5 bg-[#02050e]/50"
                      >
                        <p className="px-6 py-5 text-xs sm:text-sm text-white/65 leading-relaxed font-sans">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 11. END CTAS */}
      <section className="py-24 border-t border-[#d4af37]/15 bg-gradient-to-b from-[#02050e] to-[#050e26] text-center relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest block mb-3 font-bold">
            Escala e Previsibilidade
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Construa hoje seu time de vendas solar de alta performance.
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mb-8 max-w-md mx-auto leading-relaxed font-sans">
            Garanta seu acesso à nossa formação semanal de vendas, scripts exclusivos e comunidade de integradores solares.
          </p>
          <button
            onClick={onOpenQualifyModal}
            className="px-8 py-4 bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] text-black font-bold rounded-xl gold-glow-btn text-sm uppercase tracking-wider cursor-pointer border border-[#f3e5ab]/20"
          >
            Garantir Minha Vaga — R$247/mês
          </button>
          
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-[10px] font-mono text-white/40">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> Auditoria de Elegibilidade Gratuita</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#d4af37]" /> Garantia Contratual de Configuração</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" /> Confidencialidade de Dados LGPD</span>
          </div>
        </div>
      </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Image Modal overlay */}
      <AnimatePresence>
        {expandedImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImageUrl(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button 
              onClick={() => setExpandedImageUrl(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl bg-slate-950 p-2 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={expandedImageUrl} 
                alt="Depoimento expandido" 
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="py-12 bg-[#02050e] border-t border-white/5 text-center text-[11px] text-white/30 font-mono relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Cultura de Vendas. Todos os direitos reservados.</p>
          <p className="mt-1 opacity-60 text-[10px]">Identidade Executiva — Harmonizado com paleta Marinho e Ouro Imperial.</p>
        </div>
      </footer>
    </div>
  );
}
