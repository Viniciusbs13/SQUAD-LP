import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Instagram, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Lock,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

interface LeadGatewayProps {
  onUnlock: () => void;
}

export default function LeadGateway({ onUnlock }: LeadGatewayProps) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Auto-format WhatsApp helper
  const handleWhatsappChange = (val: string) => {
    const clean = val.replace(/\D/g, '');
    let formatted = clean;
    if (clean.length > 2) {
      formatted = `(${clean.substring(0, 2)}) `;
      if (clean.length > 7) {
        formatted += `${clean.substring(2, 7)}-${clean.substring(7, 11)}`;
      } else {
        formatted += clean.substring(2);
      }
    }
    setWhatsapp(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nome.trim() || !whatsapp.trim() || !email.trim() || !instagram.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      nome: nome.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      instagram: instagram.trim(),
      timestamp: new Date().toISOString()
    };

    // Disparar o envio via POST JSON com mode: 'no-cors' sem bloquear o fluxo do usuário
    fetch("https://script.google.com/macros/s/AKfycbzQ2JTfLCQZdhGHAHyRhvMskYst_EuekGdU_N6SKlTY9UMzJJXtjlUtokgbul11Jr0x/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).catch(err => {
      console.warn("Background lead delivery failed, continuing gracefully", err);
    });

    // Save lead details to localStorage for the CRM Kanban / Table to fetch
    try {
      const storedLeads = localStorage.getItem('squad_leads');
      const leads = storedLeads ? JSON.parse(storedLeads) : [];
      
      const newLead = {
        id: `lead_${Date.now()}`,
        nome: nome.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        instagram: instagram.trim(),
        timestamp: new Date().toISOString(),
        status: 'new', // Matches the CRM kanban status
        value: 247.90
      };
      
      leads.push(newLead);
      localStorage.setItem('squad_leads', JSON.stringify(leads));
      
      // Also mark as unlocked
      localStorage.setItem('squad_unlocked', 'true');
    } catch (err) {
      console.warn('Could not store lead', err);
    }

    // Simulate highly premium transition and unlock
    setTimeout(() => {
      setIsSubmitting(false);
      onUnlock();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#02050e] flex flex-col items-center justify-center px-4 py-12 overflow-x-hidden selection:bg-[#d4af37] selection:text-black">
      
      {/* Decorative premium radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Outer grid pattern */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Branding, Pain points, Core promise */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1 font-mono text-[10px] font-bold text-[#d4af37] uppercase tracking-wider mx-auto lg:mx-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> MÁQUINA DE VENDAS SOLAR
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
          >
            SQUAD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] text-glow-gold">CULTURA DE VENDAS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-white/70 max-w-2xl font-sans leading-relaxed"
          >
            Acesse o treinamento semanal exclusivo, os scripts validados de alta conversão e a comunidade fechada de integradores solares que mais vendem no Brasil. Preencha o formulário para liberar a apresentação oficial em vídeo.
          </motion.p>

          {/* Core Pillars / Bullet Points */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left"
          >
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#d4af37]/20 transition-all">
              <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mb-3">
                <Zap className="w-4 h-4 text-[#d4af37]" />
              </div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Acesso Imediato</h4>
              <p className="text-white/40 text-[11px] leading-relaxed">Vídeo de apresentação e estratégias liberados na hora.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#d4af37]/20 transition-all">
              <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mb-3">
                <TrendingUp className="w-4 h-4 text-[#d4af37]" />
              </div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Escala Solar</h4>
              <p className="text-white/40 text-[11px] leading-relaxed">Aprenda a contornar objeções de payback e tarifas.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#d4af37]/20 transition-all">
              <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mb-3">
                <Award className="w-4 h-4 text-[#d4af37]" />
              </div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Metodologia SQUAD</h4>
              <p className="text-white/40 text-[11px] leading-relaxed">Propostas de alto impacto que vendem valor, não preço.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 justify-center lg:justify-start text-xs text-white/40 font-mono"
          >
            <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Preencha seus dados reais para liberar o conteúdo</span>
          </motion.div>

        </div>

        {/* Right Column: Premium Gold/Navy Gating Form Card */}
        <div className="lg:col-span-5 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gradient-to-b from-[#050e26] to-[#02050e] border border-[#d4af37]/25 rounded-[24px] shadow-2xl p-6 sm:p-8 relative overflow-hidden"
          >
            {/* Top gold bar detail */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c]" />

            <div className="mb-6 text-center">
              <h3 className="text-xl font-extrabold text-white">Inscreva-se Gratuitamente</h3>
              <p className="text-[11px] sm:text-xs text-white/50 mt-1">
                Insira seus dados para destravar o vídeo e o portal completo
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/20 border border-red-500/25 text-red-400 text-xs text-center font-semibold">
                {error}
              </div>
            )}

            {isSubmitting ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin" />
                <h4 className="text-[#f3e5ab] font-extrabold text-sm tracking-tight">Liberando o Acesso...</h4>
                <p className="text-xs text-white/50 max-w-xs font-sans leading-relaxed">
                  Pronto! Seus dados foram validados. Estamos preparando o player do vídeo e o portal comercial.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Nome */}
                <div>
                  <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold tracking-wider">
                    Seu Nome Completo *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                      <User className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: Pedro Silva"
                      className="w-full h-11 pl-10 pr-4 bg-black/50 border border-white/10 focus:border-[#d4af37]/50 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4af37]/30 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold tracking-wider">
                    Telefone de WhatsApp *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input 
                      type="tel" 
                      required
                      value={whatsapp}
                      onChange={(e) => handleWhatsappChange(e.target.value)}
                      placeholder="Ex: (11) 99999-9999"
                      className="w-full h-11 pl-10 pr-4 bg-black/50 border border-white/10 focus:border-[#d4af37]/50 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4af37]/30 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold tracking-wider">
                    Seu Melhor E-mail *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ex: contato@suaempresa.com"
                      className="w-full h-11 pl-10 pr-4 bg-black/50 border border-white/10 focus:border-[#d4af37]/50 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4af37]/30 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-[10px] font-mono text-[#d4af37] mb-1.5 uppercase font-bold tracking-wider">
                    Instagram (Pessoal ou da Empresa) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="Ex: @seu_instagram"
                      className="w-full h-11 pl-10 pr-4 bg-black/50 border border-white/10 focus:border-[#d4af37]/50 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4af37]/30 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] text-black font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#f3e5ab]/20 transform hover:scale-[1.01] active:scale-[0.99] gold-glow-btn"
                  >
                    Desbloquear Conteúdo e Vídeo
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>

                {/* Secure footer detail */}
                <div className="flex items-center justify-center gap-1.5 text-white/40 text-[9px] font-sans pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]/70" />
                  <span>Seus dados estão protegidos em ambiente seguro (LGPD)</span>
                </div>

              </form>
            )}

          </motion.div>
        </div>

      </div>

    </div>
  );
}
