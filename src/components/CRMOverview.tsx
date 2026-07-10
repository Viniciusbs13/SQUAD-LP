import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Percent,
  Sparkles,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';
import { Lead } from '../dashboardData';

interface CRMOverviewProps {
  leads: Lead[];
  monthlyMetrics: { name: string; mrr: number; ads: number; bookings: number; conversion: number }[];
  onTabChange: (tab: 'overview' | 'pipeline' | 'leads' | 'calendar') => void;
}

export default function CRMOverview({ leads, monthlyMetrics, onTabChange }: CRMOverviewProps) {
  
  // Dynamic aggregations
  const totalLeads = leads.length;
  const activeLeads = leads.filter(l => l.status !== 'signed').length;
  const signedDeals = leads.filter(l => l.status === 'signed');
  const signedDealsCount = signedDeals.length;
  const conversionRate = totalLeads > 0 ? ((signedDealsCount / totalLeads) * 100).toFixed(1) : '0';
  
  // Pipeline Value (estimated)
  const totalPipelineValue = leads.reduce((acc, lead) => acc + lead.value, 0);
  const mrrValue = signedDeals.reduce((acc, lead) => acc + (lead.value / 12), 0); // simulated MRR contribution

  const recentLeads = [...leads]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 4);

  return (
    <div className="space-y-8">
      
      {/* 1. KEY EXECUTIVE WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="liquid-glass rounded-[20px] p-[1px]">
          <div className="rounded-[20px] p-5 bg-zinc-950/60 backdrop-blur-xl border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-white/45 uppercase tracking-wider font-semibold">Faturamento Pipeline</span>
              <div className="w-7 h-7 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black font-mono text-white">
                R$ {totalPipelineValue.toLocaleString('pt-BR')}
              </span>
              <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.4% este mês</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="liquid-glass rounded-[20px] p-[1px]">
          <div className="rounded-[20px] p-5 bg-zinc-950/60 backdrop-blur-xl border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-white/45 uppercase tracking-wider font-semibold">Sessões Triadas</span>
              <div className="w-7 h-7 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black font-mono text-white">
                {totalLeads}
              </span>
              <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+3 agendados hoje</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="liquid-glass rounded-[20px] p-[1px]">
          <div className="rounded-[20px] p-5 bg-zinc-950/60 backdrop-blur-xl border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-white/45 uppercase tracking-wider font-semibold">Contratos Assinados</span>
              <div className="w-7 h-7 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black font-mono text-white">
                {signedDealsCount}
              </span>
              <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>LTV Médio R$ 28k</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="liquid-glass rounded-[20px] p-[1px]">
          <div className="rounded-[20px] p-5 bg-zinc-950/60 backdrop-blur-xl border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-white/45 uppercase tracking-wider font-semibold">Conversão Geral</span>
              <div className="w-7 h-7 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400">
                <Percent className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black font-mono text-white">
                {conversionRate}%
              </span>
              <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Meta: 35.0%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 2. CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Area chart for MRR projection */}
        <div className="lg:col-span-8 liquid-glass rounded-3xl p-[1px]">
          <div className="rounded-3xl p-5 sm:p-6 bg-zinc-950/60 backdrop-blur-xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-white">Projeção de Faturamento Recorrente (MRR)</h3>
                <p className="text-[10px] text-white/40 mt-1">Sincronizado com o motor de aquisição Nexus.</p>
              </div>
              <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-white/60 font-mono">
                7 MESES ATIVOS
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyMetrics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.18}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.2)" 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.2)" 
                    tickFormatter={(value) => `R$ ${value / 1000}k`}
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#09090b', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono'
                    }} 
                  />
                  <Area type="monotone" dataKey="mrr" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorMrr)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: Lead conversions & spend */}
        <div className="lg:col-span-4 liquid-glass rounded-3xl p-[1px]">
          <div className="rounded-3xl p-5 sm:p-6 bg-zinc-950/60 backdrop-blur-xl border border-white/5 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-2">Custo de Aquisição (CAC)</h3>
              <p className="text-[10px] text-white/40 mb-6 font-sans">Investimento em tráfego direto vs Retorno em MRR.</p>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyMetrics.slice(-4)}>
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.1)" 
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#09090b', 
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontFamily: 'JetBrains Mono'
                      }} 
                    />
                    <Bar dataKey="ads" fill="rgba(255, 255, 255, 0.1)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bookings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 mt-4 text-[10.5px] text-white/50 leading-relaxed font-sans">
              <span className="font-semibold text-blue-400 block mb-1">Métrica Chave:</span>
              Cada R$ 1.000 aplicados geram uma média de <span className="text-white font-bold">3.5 agendamentos de ICPs</span> qualificados.
            </div>
          </div>
        </div>

      </div>

      {/* 3. RECENT ACTIVITY LIST */}
      <div className="liquid-glass rounded-3xl p-[1px]">
        <div className="rounded-3xl p-5 sm:p-6 bg-zinc-950/60 backdrop-blur-xl border border-white/5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white">Feed de Agendamentos Recentes</h3>
              <p className="text-[10px] text-white/40 mt-1">Leads integrados em tempo real a partir da triagem comercial.</p>
            </div>
            <button 
              onClick={() => onTabChange('pipeline')}
              className="text-[10px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              Ver Pipeline Kanban <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#3B82F6] font-mono font-bold flex items-center justify-center shrink-0">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-white font-bold block">{lead.name}</span>
                    <span className="text-[10px] text-white/40 font-mono">{lead.company} • {lead.niche}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono text-[9px] uppercase">
                    {lead.revenue}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[9px] uppercase font-bold">
                    {lead.status === 'new' ? 'Nova Reunião' : lead.status}
                  </span>
                  <span className="font-mono text-white/80 font-bold min-w-[70px] text-right">
                    R$ {lead.value.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
