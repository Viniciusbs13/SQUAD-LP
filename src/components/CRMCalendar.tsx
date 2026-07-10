import React from 'react';
import {
  Calendar,
  Clock,
  Briefcase,
  Users,
  Video,
  Plus
} from 'lucide-react';
import { CalendarEvent, Lead } from '../dashboardData';

interface CRMCalendarProps {
  events: CalendarEvent[];
  leads: Lead[];
}

export default function CRMCalendar({ events, leads }: CRMCalendarProps) {
  
  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'diagnostic':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'proposal':
        return 'bg-pink-500/10 text-pink-400 border border-pink-500/20';
      case 'kickoff':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      default:
        return 'bg-white/5 text-white/60 border border-white/10';
    }
  };

  const getEventTypeName = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'diagnostic': return 'Diagnóstico de Entrada';
      case 'proposal': return 'Proposta Comercial High-Ticket';
      case 'kickoff': return 'Kickoff de Parceria';
      default: return 'Alinhamento';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. TOP STATS AND INFOS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Agenda de Triagem Corporativa</h2>
          <p className="text-[10px] text-white/40 mt-1">Planejamento estratégico de chamadas ativas com decisores empresariais.</p>
        </div>
        
        <div className="flex items-center gap-3 text-[10px] font-mono text-white/45">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>Diagnóstico</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-400"></span>
            <span>Apresentação Comercial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Kickoff</span>
          </div>
        </div>
      </div>

      {/* 2. THE CALENDAR & EVENTS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Beautiful Grid Calendar Interface (Mock representation of July 2026) */}
        <div className="lg:col-span-8 liquid-glass rounded-3xl p-[1px]">
          <div className="rounded-3xl p-5 sm:p-6 bg-zinc-950/60 backdrop-blur-xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Julho de 2026</span>
              <span className="text-[10px] text-white/40 font-mono">Brasília, BRT</span>
            </div>

            {/* Days Headings */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono text-white/40 uppercase tracking-wider mb-3">
              <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
            </div>

            {/* Days grid layout (Starts on Wednesday July 1st) */}
            <div className="grid grid-cols-7 gap-2.5">
              {/* Empty offset items (Wednesday July 1st, meaning 3 empty boxes) */}
              <div className="aspect-square bg-transparent"></div>
              <div className="aspect-square bg-transparent"></div>
              <div className="aspect-square bg-transparent"></div>
              
              {/* Render 1 to 14 July 2026 */}
              {Array.from({ length: 14 }).map((_, i) => {
                const day = i + 1;
                const dateStr = `2026-07-${day < 10 ? `0${day}` : day}`;
                const hasEvents = events.some(e => e.date === dateStr) || leads.some(l => l.dateBooked === dateStr);
                const isToday = day === 8; // Simulate today as July 8th

                return (
                  <div 
                    key={day} 
                    className={`aspect-square rounded-xl border flex flex-col justify-between p-2 transition-all duration-200 ${
                      isToday 
                        ? 'bg-blue-500/10 border-blue-500/35' 
                        : hasEvents 
                          ? 'bg-zinc-900 border-white/10 hover:border-white/20' 
                          : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className={`text-[10.5px] font-mono font-bold block ${isToday ? 'text-blue-400' : 'text-white/60'}`}>
                      {day}
                    </span>

                    {/* Indicator dots inside calendar cells */}
                    {hasEvents && (
                      <div className="flex gap-1 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Pad remaining cells to look perfect */}
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-white/[0.005] border border-white/5 opacity-40 flex items-start p-2">
                  <span className="text-[10px] font-mono text-white/25">{i + 15}</span>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Right: Detailed list of scheduled calls */}
        <div className="lg:col-span-4 space-y-4">
          
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Compromissos Agendados</h3>
          
          <div className="space-y-3">
            {events.map((evt) => (
              <div 
                key={evt.id}
                className="p-4 bg-zinc-950/40 border border-white/5 hover:border-white/10 rounded-2xl transition-all"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className={`text-[8.5px] font-mono uppercase px-2 py-0.5 rounded font-bold tracking-wider ${getEventTypeColor(evt.type)}`}>
                    {getEventTypeName(evt.type)}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-white/40 font-mono">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{evt.time}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-white">{evt.title}</h4>
                <p className="text-[10.5px] text-white/45 mt-1 font-sans">Responsável ICP: {evt.client}</p>
                
                <div className="mt-3.5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[10px]">
                  <span className="text-white/40 font-mono">Visualizar Triagem:</span>
                  <button className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer">
                    Análise Completa <Video className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
