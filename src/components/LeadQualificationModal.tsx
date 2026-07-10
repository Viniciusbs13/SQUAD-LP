import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  Check,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldAlert,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LeadQualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  qualifyStep: number;
  onSetQualifyStep: (step: number | ((p: number) => number)) => void;
  qualifyAnswers: {
    nome: string;
    empresa: string;
    niche: string;
    revenue: string;
    teamSize: string;
    whatsapp: string;
    email: string;
    site: string;
  };
  onSetQualifyAnswers: React.Dispatch<React.SetStateAction<{
    nome: string;
    empresa: string;
    niche: string;
    revenue: string;
    teamSize: string;
    whatsapp: string;
    email: string;
    site: string;
  }>>;
  selectedDate: string;
  onSetSelectedDate: (date: string) => void;
  selectedTime: string;
  onSetSelectedTime: (time: string) => void;
  onSubmitLead: () => void;
  onViewDashboard: () => void;
}

export default function LeadQualificationModal({
  isOpen,
  onClose,
  qualifyStep,
  onSetQualifyStep,
  qualifyAnswers,
  onSetQualifyAnswers,
  selectedDate,
  onSetSelectedDate,
  selectedTime,
  onSetSelectedTime,
  onSubmitLead,
  onViewDashboard
}: LeadQualificationModalProps) {

  const handleAnswerSelection = (field: string, value: string) => {
    onSetQualifyAnswers(prev => ({ ...prev, [field]: value }));
    setTimeout(() => {
      onSetQualifyStep(prev => (prev as number) + 1);
    }, 250);
  };

  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qualifyAnswers.nome || !qualifyAnswers.email || !qualifyAnswers.whatsapp) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    onSetQualifyStep(4);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          ></motion.div>

          {/* Premium Gold/Navy Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-xl bg-gradient-to-b from-[#050e26] to-[#02050e] border border-[#d4af37]/25 rounded-[24px] shadow-2xl overflow-hidden z-10"
          >
            {/* Top Indicator Line */}
            <div className="h-[3px] bg-white/5 w-full relative">
              <div 
                className="h-full bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] absolute left-0 top-0 transition-all duration-300"
                style={{ width: `${(qualifyStep / 5) * 100}%` }}
              ></div>
            </div>

            {/* Close Cross */}
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 text-white/50 hover:text-white border border-white/5 hover:border-[#d4af37]/35 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              
              {qualifyStep < 5 && (
                <div className="mb-6">
                  <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-widest font-bold block">
                    Protocolo de Qualificação — Etapa {qualifyStep} de 4
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-white mt-1 leading-snug">
                    {qualifyStep === 1 && "Qual o faturamento mensal aproximado da sua empresa?"}
                    {qualifyStep === 2 && "Qual o maior desafio do seu time comercial hoje?"}
                    {qualifyStep === 3 && "Insira seus dados de contato empresarial"}
                    {qualifyStep === 4 && "Escolha o melhor horário pra falar com a gente"}
                  </h3>
                </div>
              )}

              {/* Step 1: Revenue Filter */}
              {qualifyStep === 1 && (
                <div className="space-y-3">
                  <button 
                    onClick={() => handleAnswerSelection('revenue', 'Abaixo de R$ 20k/mês')}
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-red-500/20 text-left text-xs font-semibold text-white/70 hover:text-white transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>Abaixo de R$ 20.000 /mês</span>
                    <span className="text-[9px] text-red-400 font-mono italic">Inelegível para performance</span>
                  </button>
                  <button 
                    onClick={() => handleAnswerSelection('revenue', 'R$ 20k - 50k/mês')}
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#d4af37]/25 text-left text-xs font-semibold text-white/70 hover:text-white transition-all cursor-pointer"
                  >
                    De R$ 20.000 a R$ 50.000 /mês
                  </button>
                  <button 
                    onClick={() => handleAnswerSelection('revenue', 'R$ 50k - 150k/mês')}
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#d4af37]/35 text-left text-xs font-semibold text-white/70 hover:text-white transition-all cursor-pointer"
                  >
                    De R$ 50.000 a R$ 150.000 /mês
                  </button>
                  <button 
                    onClick={() => handleAnswerSelection('revenue', 'Acima de R$ 150k/mês')}
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#d4af37]/55 text-left text-xs font-semibold text-white/70 hover:text-white transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>Acima de R$ 150.000 /mês</span>
                    <span className="text-[9px] bg-[#d4af37]/10 text-[#f3e5ab] border border-[#d4af37]/30 px-2 py-0.5 rounded-full uppercase font-mono font-bold">ICP Ideal</span>
                  </button>
                </div>
              )}

              {/* Step 2: Channel selection */}
              {qualifyStep === 2 && (
                <div className="space-y-3">
                  <button 
                    onClick={() => handleAnswerSelection('canal', 'Objeção de Preço')}
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#d4af37]/30 text-left text-xs font-semibold text-white/70 hover:text-white transition-all cursor-pointer"
                  >
                    Vendedores não sabem contornar objeções de preço e payback
                  </button>
                  <button 
                    onClick={() => handleAnswerSelection('canal', 'Dependência de Indicações')}
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#d4af37]/30 text-left text-xs font-semibold text-white/70 hover:text-white transition-all cursor-pointer"
                  >
                    Dependência total de indicações para fechar novos negócios
                  </button>
                  <button 
                    onClick={() => handleAnswerSelection('canal', 'Propostas Demoradas')}
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#d4af37]/30 text-left text-xs font-semibold text-white/70 hover:text-white transition-all cursor-pointer"
                  >
                    Propostas de energia solar demoradas ou ignoradas pelos leads
                  </button>
                </div>
              )}

              {/* Step 3: Text inputs */}
              {qualifyStep === 3 && (
                <form onSubmit={handleLeadFormSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold">Seu Nome Completo *</label>
                      <input 
                        type="text" 
                        required
                        value={qualifyAnswers.nome}
                        onChange={(e) => onSetQualifyAnswers(p => ({ ...p, nome: e.target.value }))}
                        placeholder="Ex: Pedro Silva"
                        className="w-full h-11 px-4 bg-black/50 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold">Razão Social / Empresa *</label>
                      <input 
                        type="text" 
                        required
                        value={qualifyAnswers.empresa}
                        onChange={(e) => onSetQualifyAnswers(p => ({ ...p, empresa: e.target.value }))}
                        placeholder="Ex: Solar Tech Integradora"
                        className="w-full h-11 px-4 bg-black/50 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold">Nicho / Setor *</label>
                      <input 
                        type="text" 
                        required
                        value={qualifyAnswers.niche}
                        onChange={(e) => onSetQualifyAnswers(p => ({ ...p, niche: e.target.value }))}
                        placeholder="Ex: Energia Solar"
                        className="w-full h-11 px-4 bg-black/50 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold">Tamanho do Time (Pessoas) *</label>
                      <input 
                        type="text" 
                        required
                        value={qualifyAnswers.teamSize}
                        onChange={(e) => onSetQualifyAnswers(p => ({ ...p, teamSize: e.target.value }))}
                        placeholder="Ex: 5 vendedores"
                        className="w-full h-11 px-4 bg-black/50 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold">WhatsApp Corporativo *</label>
                      <input 
                        type="tel" 
                        required
                        value={qualifyAnswers.whatsapp}
                        onChange={(e) => onSetQualifyAnswers(p => ({ ...p, whatsapp: e.target.value }))}
                        placeholder="Ex: (11) 99999-9999"
                        className="w-full h-11 px-4 bg-black/50 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold">E-mail Comercial *</label>
                      <input 
                        type="email" 
                        required
                        value={qualifyAnswers.email}
                        onChange={(e) => onSetQualifyAnswers(p => ({ ...p, email: e.target.value }))}
                        placeholder="Ex: contato@empresa.com"
                        className="w-full h-11 px-4 bg-black/50 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => onSetQualifyStep(prev => Math.max(1, (prev as number) - 1))}
                      className="px-5 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] text-black font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#f3e5ab]/20"
                    >
                      Avançar para Agendamento
                      <ArrowRight className="w-4 h-4 text-black" />
                    </button>
                  </div>

                </form>
              )}

              {/* Step 4: Slot picker */}
              {qualifyStep === 4 && (
                <div className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div>
                      <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold">Escolha a data</label>
                      <select
                        value={selectedDate}
                        onChange={(e) => onSetSelectedDate(e.target.value)}
                        className="w-full h-11 px-3 bg-black/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      >
                        <option value="9 de Julho, 2026">Quinta-feira, 9 de Julho</option>
                        <option value="10 de Julho, 2026">Sexta-feira, 10 de Julho</option>
                        <option value="13 de Julho, 2026">Segunda-feira, 13 de Julho</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold">Horário (BRT)</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => onSetSelectedTime(e.target.value)}
                        className="w-full h-11 px-3 bg-black/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                      >
                        <option value="10:00">10:00 AM</option>
                        <option value="11:15">11:15 AM</option>
                        <option value="14:00">14:00 PM</option>
                        <option value="15:30">15:30 PM</option>
                        <option value="17:00">17:00 PM</option>
                      </select>
                    </div>

                  </div>

                  <div className="p-3.5 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl text-[10.5px] text-white/70 leading-relaxed font-sans">
                    <span className="font-semibold text-[#f3e5ab] flex items-center gap-1.5 mb-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#d4af37]" /> Compromisso Executivo:
                    </span>
                    Reservamos consultores seniores para realizar esta auditoria gratuita. Por favor, selecione um horário em que sua agenda esteja totalmente descompromissada.
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => onSetQualifyStep(3)}
                      className="px-5 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-all cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button 
                      type="button"
                      onClick={onSubmitLead}
                      className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] text-black font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#f3e5ab]/20"
                    >
                      Confirmar Agendamento
                      <Check className="w-4 h-4 text-black" />
                    </button>
                  </div>

                </div>
              )}

              {/* Step 5: Success state */}
              {qualifyStep === 5 && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/35 rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white tracking-tight">Elegibilidade Confirmada!</h3>
                  
                  <p className="text-xs text-white/70 leading-relaxed max-w-sm mx-auto font-sans">
                    Prezado(a) <span className="text-white font-semibold">{qualifyAnswers.nome}</span>, sua sessão técnica para analisar o modelo da <span className="text-white font-semibold">{qualifyAnswers.empresa}</span> foi pré-agendada para o dia <span className="text-white font-semibold">{selectedDate}</span> às <span className="text-white font-semibold">{selectedTime}</span>.
                  </p>

                  <div className="bg-[#050e26]/60 border border-[#d4af37]/15 p-4 rounded-xl max-w-sm mx-auto text-left space-y-2 font-sans">
                    <span className="text-[8.5px] font-mono text-[#d4af37] block uppercase tracking-widest font-bold">Resumo da Triagem:</span>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{selectedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{selectedTime} BRT</span>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row gap-2.5 justify-center max-w-xs sm:max-w-md mx-auto">
                    <button
                      onClick={onViewDashboard}
                      className="px-6 py-3.5 bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] text-black font-extrabold text-xs rounded-xl cursor-pointer transition-all hover:scale-[1.02] flex items-center justify-center gap-2 border border-[#f3e5ab]/20"
                    >
                      Falar com Assessor no WhatsApp
                      <Send className="w-3.5 h-3.5 text-black" />
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl cursor-pointer transition-all"
                    >
                      Voltar ao Portal
                    </button>
                  </div>

                </div>
              )}

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
