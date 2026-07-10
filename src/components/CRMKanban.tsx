import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Trash2,
  Calendar,
  X,
  Phone,
  Mail,
  Users,
  Briefcase,
  Layers,
  ChevronRight,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { Lead } from '../dashboardData';

interface CRMKanbanProps {
  leads: Lead[];
  onUpdateLeadStatus: (leadId: string, nextStatus: Lead['status']) => void;
  onAddManualLead: (lead: Omit<Lead, 'id'>) => void;
  onDeleteLead?: (leadId: string) => void;
}

const COLUMNS: { id: Lead['status']; title: string; color: string }[] = [
  { id: 'new', title: 'Novas Reuniões', color: 'border-blue-500/20 text-blue-400 bg-blue-500/5' },
  { id: 'scheduled', title: 'Sessão Agendada', color: 'border-amber-500/20 text-amber-400 bg-amber-500/5' },
  { id: 'diagnosed', title: 'Diagnóstico Concluído', color: 'border-purple-500/20 text-purple-400 bg-purple-500/5' },
  { id: 'proposal', title: 'Proposta High-Ticket', color: 'border-pink-500/20 text-pink-400 bg-pink-500/5' },
  { id: 'signed', title: 'Contrato Assinado', color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' }
];

export default function CRMKanban({ leads, onUpdateLeadStatus, onAddManualLead, onDeleteLead }: CRMKanbanProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddingLead, setIsAddingLead] = useState(false);
  
  // Manual Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    company: '',
    niche: '',
    revenue: 'R$ 50k - 100k/mês',
    teamSize: '5-10 pessoas',
    whatsapp: '',
    email: '',
    value: 20000,
    status: 'new' as Lead['status']
  });

  // Drag and Drop State handlers
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('text/plain', leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: Lead['status']) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) {
      onUpdateLeadStatus(leadId, targetStatus);
    }
  };

  const submitManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.company) {
      alert('Preencha os campos obrigatórios!');
      return;
    }
    
    onAddManualLead({
      name: newLeadForm.name,
      company: newLeadForm.company,
      niche: newLeadForm.niche || 'Geral',
      revenue: newLeadForm.revenue,
      teamSize: newLeadForm.teamSize,
      whatsapp: newLeadForm.whatsapp || '(11) 99999-9999',
      email: newLeadForm.email || 'contato@empresa.com',
      dateBooked: new Date().toISOString().split('T')[0],
      timeBooked: '14:00',
      status: newLeadForm.status,
      value: Number(newLeadForm.value)
    });

    // Reset Form
    setNewLeadForm({
      name: '',
      company: '',
      niche: '',
      revenue: 'R$ 50k - 100k/mês',
      teamSize: '5-10 pessoas',
      whatsapp: '',
      email: '',
      value: 20000,
      status: 'new'
    });
    setIsAddingLead(false);
  };

  // Helper value accumulator
  const getColSum = (colId: Lead['status']) => {
    return leads
      .filter((l) => l.status === colId)
      .reduce((sum, current) => sum + current.value, 0);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. TOP HEADER ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Pipeline de Conversão de Clientes</h2>
          <p className="text-[10px] text-white/40 mt-1">Arraste os cards para simular o avanço comercial. Banco de dados sincronizado.</p>
        </div>
        
        <button
          onClick={() => setIsAddingLead(true)}
          className="px-4 py-2 bg-white text-black hover:bg-white/90 text-xs font-extrabold rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar Lead Manual
        </button>
      </div>

      {/* 2. THE PIPELINE KANBAN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 items-start">
        {COLUMNS.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.id);
          const colSumValue = getColSum(col.id);

          return (
            <div 
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className="bg-zinc-950/40 border border-white/5 rounded-[22px] p-4 flex flex-col h-[600px] overflow-hidden"
            >
              
              {/* Column Title and aggregation info */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider block ${col.color}`}>
                    {col.title}
                  </span>
                  <span className="text-[9px] text-white/40 font-mono mt-1.5 block uppercase">
                    {colLeads.length} {colLeads.length === 1 ? 'Lead' : 'Leads'}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-white/70">
                  R$ {(colSumValue / 1000).toFixed(0)}k
                </span>
              </div>

              {/* Cards wrapper */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {colLeads.length === 0 ? (
                  <div className="h-24 border border-dashed border-white/5 rounded-xl flex items-center justify-center text-center text-[10px] text-white/20 font-sans px-4">
                    Arraste leads qualificados aqui
                  </div>
                ) : (
                  colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      onClick={() => setSelectedLead(lead)}
                      className="p-3.5 bg-zinc-900/60 hover:bg-zinc-900 border border-white/5 hover:border-white/15 rounded-xl cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02] relative group"
                    >
                      <span className="text-[9px] font-mono text-white/30 block mb-1 uppercase tracking-wider">{lead.company}</span>
                      <h4 className="text-xs font-bold text-white truncate mb-2">{lead.name}</h4>
                      
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-white/40">{lead.revenue}</span>
                        <span className="font-extrabold text-blue-400">R$ {lead.value.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. POPUP MODAL: DETALHES DO LEAD (Deseho Drawer) */}
      {selectedLead && (
        <div className="fixed inset-0 z-[250] flex items-center justify-end">
          <div 
            onClick={() => setSelectedLead(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <div className="relative w-full max-w-md h-full bg-zinc-950 border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 animate-slide-in">
            <div>
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div>
                  <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-bold">
                    Inspeção do Lead Sincronizado
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">Ficha de Triagem</h3>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white border border-white/5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Data Rows */}
              <div className="space-y-6">
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono font-bold flex items-center justify-center">
                    {selectedLead.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedLead.name}</h4>
                    <span className="text-[11px] text-white/50">{selectedLead.company}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4">
                  <div>
                    <span className="text-[9px] font-mono text-white/40 block uppercase">Nicho de Mercado</span>
                    <span className="text-xs text-white/80 font-medium font-sans">{selectedLead.niche}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-white/40 block uppercase">Faturamento ICP</span>
                    <span className="text-xs text-white/80 font-medium font-sans">{selectedLead.revenue}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-white/40 block uppercase">Time Estimado</span>
                    <span className="text-xs text-white/80 font-medium font-sans">{selectedLead.teamSize}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-white/40 block uppercase">Valor de Contrato</span>
                    <span className="text-xs text-emerald-400 font-bold font-mono">R$ {selectedLead.value.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[9px] font-mono text-white/40 block uppercase">Chaves de Contato</span>
                  <div className="flex items-center gap-3 text-xs bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span className="text-white/80 font-mono">{selectedLead.whatsapp}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-white/80 font-mono truncate">{selectedLead.email}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[9px] font-mono text-white/40 block uppercase">Agenda Técnica</span>
                  <div className="flex items-center gap-3 text-xs bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-white/80 font-sans">{selectedLead.dateBooked} às {selectedLead.timeBooked}h</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Actions Footer */}
            <div className="pt-6 border-t border-white/5 mt-8 flex gap-3">
              {onDeleteLead && (
                <button
                  onClick={() => {
                    onDeleteLead(selectedLead.id);
                    setSelectedLead(null);
                  }}
                  className="px-4 py-2.5 bg-red-950/20 text-red-400 hover:bg-red-950/40 text-xs font-semibold rounded-xl border border-red-500/10 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Excluir
                </button>
              )}

              {selectedLead.status !== 'signed' ? (
                <button
                  onClick={() => {
                    onUpdateLeadStatus(selectedLead.id, 'signed');
                    setSelectedLead(null);
                  }}
                  className="flex-1 py-2.5 bg-emerald-500 text-black font-extrabold text-xs rounded-xl hover:bg-emerald-600 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  Assinar Contrato
                </button>
              ) : (
                <div className="flex-1 py-2.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/25 text-center flex items-center justify-center">
                  Contrato Ativo
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 4. MODAL: ADICIONAR LEAD MANUAL */}
      {isAddingLead && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div 
            onClick={() => setIsAddingLead(false)}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />
          
          <div className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden z-10 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
              <div>
                <span className="text-[9px] font-mono text-blue-400 uppercase tracking-wider font-bold">Injetor de Leads</span>
                <h3 className="text-base font-bold text-white">Adicionar Novo Lead Manual</h3>
              </div>
              <button 
                onClick={() => setIsAddingLead(false)}
                className="p-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white border border-white/5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={submitManualLead} className="space-y-4">
              
              <div>
                <label className="block text-[10px] font-mono text-white/40 mb-1.5 uppercase">Nome do Lead *</label>
                <input 
                  type="text"
                  required
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Ex: Alexandre de Souza"
                  className="w-full h-10 px-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-white/40 mb-1.5 uppercase">Nome da Empresa *</label>
                <input 
                  type="text"
                  required
                  value={newLeadForm.company}
                  onChange={(e) => setNewLeadForm(p => ({ ...p, company: e.target.value }))}
                  placeholder="Ex: Tech Solutions"
                  className="w-full h-10 px-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-white/40 mb-1.5 uppercase">Nicho comercial</label>
                  <input 
                    type="text"
                    value={newLeadForm.niche}
                    onChange={(e) => setNewLeadForm(p => ({ ...p, niche: e.target.value }))}
                    placeholder="Ex: Jurídico, Tecnologia"
                    className="w-full h-10 px-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/40 mb-1.5 uppercase">Faturamento Comercial</label>
                  <select
                    value={newLeadForm.revenue}
                    onChange={(e) => setNewLeadForm(p => ({ ...p, revenue: e.target.value }))}
                    className="w-full h-10 px-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="Abaixo de R$ 20k/mês">Abaixo de R$ 20k/mês</option>
                    <option value="R$ 20k - 50k/mês">R$ 20k - 50k/mês</option>
                    <option value="R$ 50k - 150k/mês">R$ 50k - 150k/mês</option>
                    <option value="R$ 150k - 300k/mês">R$ 150k - 300k/mês</option>
                    <option value="Acima de R$ 300k/mês">Acima de R$ 300k/mês</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-white/40 mb-1.5 uppercase">Estimativa de Contrato</label>
                  <input 
                    type="number"
                    value={newLeadForm.value}
                    onChange={(e) => setNewLeadForm(p => ({ ...p, value: Number(e.target.value) }))}
                    className="w-full h-10 px-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/40 mb-1.5 uppercase">Estágio Inicial</label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm(p => ({ ...p, status: e.target.value as Lead['status'] }))}
                    className="w-full h-10 px-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="new">Novas Reuniões</option>
                    <option value="scheduled">Sessão Agendada</option>
                    <option value="diagnosed">Diagnóstico Concluído</option>
                    <option value="proposal">Proposta High-Ticket</option>
                    <option value="signed">Contrato Assinado</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsAddingLead(false)}
                  className="px-5 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 h-11 bg-white text-black font-extrabold text-xs rounded-xl hover:bg-white/90 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Injetar no CRM
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
