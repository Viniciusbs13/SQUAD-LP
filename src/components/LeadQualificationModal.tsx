import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  User,
  Mail,
  Phone,
  Instagram,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LeadQualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadQualificationModal({
  isOpen,
  onClose
}: LeadQualificationModalProps) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Auto-format WhatsApp helper
  const handleWhatsappChange = (val: string) => {
    // Remove non-digits
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

    // Save lead details to localStorage as a lightweight CRM capture
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
        status: 'new',
        value: 347.90
      };
      leads.push(newLead);
      localStorage.setItem('squad_leads', JSON.stringify(leads));
    } catch (e) {
      console.warn('Could not save lead in localStorage', e);
    }

    // Redirect to the Kiwify checkout URL
    setTimeout(() => {
      window.location.href = "https://pay.kiwify.com.br/TxNzTKc";
    }, 800);
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
            className="relative w-full max-w-lg bg-gradient-to-b from-[#050e26] to-[#02050e] border border-[#d4af37]/25 rounded-[24px] shadow-2xl overflow-hidden z-10"
          >
            {/* Top Indicator Line */}
            <div className="h-[4px] bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] w-full" />

            {/* Close Cross */}
            <button 
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 text-white/50 hover:text-white border border-white/5 hover:border-[#d4af37]/35 transition-all cursor-pointer disabled:opacity-30"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              
              <div className="mb-6 text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#d4af37]/10 border border-[#d4af37]/20 px-2.5 py-1 font-mono text-[9px] font-bold text-[#d4af37] uppercase tracking-widest block mb-2 w-max mx-auto sm:mx-0">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" /> Oferta Exclusiva Squad
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
                  Preencha seus dados para garantir o preço promocional
                </h3>
                <p className="text-[11px] sm:text-xs text-white/50 mt-1 font-sans">
                  Você está a um passo de acessar a melhor formação semanal e comunidade de vendas do setor solar.
                </p>
              </div>

              {/* Pricing Callout Box */}
              <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-[#d4af37]/15 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Assinatura Mensal Comercial</p>
                  <p className="text-xs text-white/40 line-through mt-0.5">Era R$ 897,90/mês</p>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg sm:text-2xl font-black text-[#f3e5ab] text-glow-gold">R$ 347,90</span>
                    <span className="text-[10px] text-white/60 font-medium">/mês</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#f3e5ab] text-[9px] font-mono font-bold px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">
                    Tempo Ilimitado
                  </span>
                  <p className="text-[9px] text-white/40 mt-1.5 font-sans">Sem fidelidade ou multas</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-950/20 border border-red-500/25 text-red-400 text-xs text-center font-medium">
                  {error}
                </div>
              )}

              {isSubmitting ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin" />
                  <h4 className="text-white font-extrabold text-sm tracking-tight">Vaga reservada com sucesso!</h4>
                  <p className="text-xs text-white/60 max-w-xs leading-relaxed font-sans">
                    Estamos te redirecionando para a página de pagamento seguro da Kiwify. Caso não seja redirecionado automaticamente, clique no botão abaixo.
                  </p>
                  <a
                    href="https://pay.kiwify.com.br/TxNzTKc"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold border border-white/10 transition-all"
                  >
                    Clique aqui se não for redirecionado
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Nome Completo */}
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

                  {/* Telefone de Whatsapp */}
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
                      Instagram da empresa ou pessoal *
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
                        placeholder="Ex: @culturadevendas"
                        className="w-full h-11 pl-10 pr-4 bg-black/50 border border-white/10 focus:border-[#d4af37]/50 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#d4af37]/30 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* CTA Submit Button */}
                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#9a7b1c] text-black font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#f3e5ab]/20 transform hover:scale-[1.01] active:scale-[0.99] gold-glow-btn"
                    >
                      Avançar para o Pagamento
                      <ArrowRight className="w-4 h-4 text-black" />
                    </button>
                  </div>

                  {/* Footer Security */}
                  <div className="flex items-center justify-center gap-1.5 text-white/40 text-[9.5px] font-sans pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]/70" />
                    <span>Ambiente criptografado e 100% seguro em conformidade com a LGPD</span>
                  </div>

                </form>
              )}

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
