import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Mail,
  Phone,
  Calendar,
  X,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Lead } from '../dashboardData';

interface CRMLeadsTableProps {
  leads: Lead[];
  onDeleteLead?: (leadId: string) => void;
  onUpdateLeadStatus: (leadId: string, nextStatus: Lead['status']) => void;
}

export default function CRMLeadsTable({ leads, onDeleteLead, onUpdateLeadStatus }: CRMLeadsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [revenueFilter, setRevenueFilter] = useState<string>('all');

  // Filters leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesRevenue = revenueFilter === 'all' || lead.revenue === revenueFilter;

    return matchesSearch && matchesStatus && matchesRevenue;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. FILTERS BAR */}
      <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/35" />
          <input 
            type="text" 
            placeholder="Pesquisar por nome, empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none"
          />
        </div>

        {/* Custom Filters Selectors */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <div>
            <span className="text-[9px] font-mono text-white/40 block mb-1 uppercase">Filtrar Estágio</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white/80 focus:outline-none"
            >
              <option value="all">Todos os Estágios</option>
              <option value="new">Novas Reuniões</option>
              <option value="scheduled">Sessão Agendada</option>
              <option value="diagnosed">Diagnóstico Concluído</option>
              <option value="proposal">Proposta High-Ticket</option>
              <option value="signed">Contrato Assinado</option>
            </select>
          </div>

          <div>
            <span className="text-[9px] font-mono text-white/40 block mb-1 uppercase">Filtrar Faturamento</span>
            <select
              value={revenueFilter}
              onChange={(e) => setRevenueFilter(e.target.value)}
              className="h-10 px-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white/80 focus:outline-none"
            >
              <option value="all">Qualquer Faturamento</option>
              <option value="R$ 80k - 150k/mês">R$ 80k - 150k/mês</option>
              <option value="R$ 200k+/mês">R$ 200k+/mês</option>
              <option value="R$ 500k+/mês">R$ 500k+/mês</option>
              <option value="R$ 50k - 100k/mês">R$ 50k - 100k/mês</option>
              <option value="R$ 150k - 300k/mês">R$ 150k - 300k/mês</option>
            </select>
          </div>

        </div>

      </div>

      {/* 2. LEADS GRID DATATABLE */}
      <div className="liquid-glass rounded-3xl p-[1px] overflow-hidden">
        <div className="rounded-3xl overflow-x-auto bg-black/40 border border-white/5 scrollbar-thin">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01] text-white/40 text-[9px] uppercase tracking-wider font-mono">
                <th className="py-4 px-5">Empresa / Lead</th>
                <th className="py-4 px-4">Setor</th>
                <th className="py-4 px-4">Faturamento</th>
                <th className="py-4 px-4">Estágio Comercial</th>
                <th className="py-4 px-4">Valor Estimado</th>
                <th className="py-4 px-4">Data Triagem</th>
                <th className="py-4 px-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-white/30 font-sans">
                    Nenhum lead qualificado atende aos filtros definidos.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors">
                    
                    {/* Lead Identity */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 font-mono font-bold flex items-center justify-center shrink-0">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <span className="text-white font-bold block">{lead.name}</span>
                          <span className="text-[10px] text-white/40 font-mono">{lead.company}</span>
                        </div>
                      </div>
                    </td>

                    {/* Niche */}
                    <td className="py-4 px-4 font-sans text-white/70">
                      {lead.niche}
                    </td>

                    {/* Revenue */}
                    <td className="py-4 px-4 font-mono text-white/50 text-[11px]">
                      {lead.revenue}
                    </td>

                    {/* Status Select */}
                    <td className="py-4 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as Lead['status'])}
                        className={`h-7 px-2 bg-zinc-900 border border-white/5 rounded-lg text-[10px] font-mono font-bold ${
                          lead.status === 'signed' ? 'text-emerald-400' : 'text-white/60'
                        }`}
                      >
                        <option value="new">Nova Reunião</option>
                        <option value="scheduled">Sessão Agendada</option>
                        <option value="diagnosed">Diagnóstico Concluído</option>
                        <option value="proposal">Proposta High-Ticket</option>
                        <option value="signed">Contrato Assinado</option>
                      </select>
                    </td>

                    {/* Contract Value */}
                    <td className="py-4 px-4 font-mono font-bold text-white">
                      R$ {lead.value.toLocaleString('pt-BR')}
                    </td>

                    {/* Date Booked */}
                    <td className="py-4 px-4 font-mono text-white/50">
                      {lead.dateBooked} ({lead.timeBooked}h)
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <a 
                          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/50 hover:text-white border border-white/5 cursor-pointer"
                        >
                          <Phone className="w-3 h-3" />
                        </a>
                        <a 
                          href={`mailto:${lead.email}`}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/50 hover:text-white border border-white/5 cursor-pointer"
                        >
                          <Mail className="w-3 h-3" />
                        </a>
                        {onDeleteLead && (
                          <button 
                            onClick={() => onDeleteLead(lead.id)}
                            className="p-1.5 rounded bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-500/10 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
