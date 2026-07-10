export interface Lead {
  id: string;
  name: string;
  company: string;
  niche: string;
  revenue: string;
  teamSize: string;
  whatsapp: string;
  email: string;
  dateBooked: string;
  timeBooked: string;
  status: 'new' | 'scheduled' | 'diagnosed' | 'proposal' | 'signed';
  value: number; // estimated contract value in BRL
}

export interface CalendarEvent {
  id: string;
  title: string;
  client: string;
  time: string;
  date: string; // YYYY-MM-DD
  type: 'diagnostic' | 'proposal' | 'kickoff';
}

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Guilherme Sampaio',
    company: 'Sampaio Advocacia Business',
    niche: 'Jurídico B2B',
    revenue: 'R$ 80k - 150k/mês',
    teamSize: '12 pessoas',
    whatsapp: '(11) 98765-4321',
    email: 'guilherme@sampaioadv.com.br',
    dateBooked: '2026-07-09',
    timeBooked: '14:00',
    status: 'new',
    value: 15000
  },
  {
    id: 'lead-2',
    name: 'Mariana Costa',
    company: 'Vitta Healthcare Tech',
    niche: 'Healthtech SaaS',
    revenue: 'R$ 200k+/mês',
    teamSize: '24 pessoas',
    whatsapp: '(21) 99123-4567',
    email: 'mariana@vittatech.io',
    dateBooked: '2026-07-09',
    timeBooked: '16:30',
    status: 'scheduled',
    value: 35000
  },
  {
    id: 'lead-3',
    name: 'Ricardo Albuquerque',
    company: 'Albuquerque Logística',
    niche: 'Logística Enterprise',
    revenue: 'R$ 500k+/mês',
    teamSize: '48 pessoas',
    whatsapp: '(31) 98111-2222',
    email: 'ricardo@alblog.com.br',
    dateBooked: '2026-07-10',
    timeBooked: '10:00',
    status: 'diagnosed',
    value: 48000
  },
  {
    id: 'lead-4',
    name: 'Ana Carolina Dias',
    company: 'AC Dias Consultoria',
    niche: 'Advisory Estratégico',
    revenue: 'R$ 50k - 100k/mês',
    teamSize: '6 pessoas',
    whatsapp: '(11) 97333-4444',
    email: 'carol@acdias.com',
    dateBooked: '2026-07-11',
    timeBooked: '11:15',
    status: 'proposal',
    value: 20000
  },
  {
    id: 'lead-5',
    name: 'Felipe Fontana',
    company: 'Fontana Dev Studio',
    niche: 'Software House',
    revenue: 'R$ 150k - 300k/mês',
    teamSize: '18 pessoas',
    whatsapp: '(41) 99555-6666',
    email: 'fontana@devstudio.design',
    dateBooked: '2026-07-08',
    timeBooked: '09:30',
    status: 'signed',
    value: 30000
  },
  {
    id: 'lead-6',
    name: 'Juliana Neves',
    company: 'Neves Growth Marketing',
    niche: 'Agência Digital',
    revenue: 'R$ 30k - 80k/mês',
    teamSize: '8 pessoas',
    whatsapp: '(19) 98222-3333',
    email: 'juliana@nevesgrowth.com',
    dateBooked: '2026-07-08',
    timeBooked: '15:00',
    status: 'diagnosed',
    value: 18000
  }
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Diagnóstico: Sampaio Advocacia',
    client: 'Guilherme Sampaio',
    time: '14:00',
    date: '2026-07-09',
    type: 'diagnostic'
  },
  {
    id: 'event-2',
    title: 'Apresentação de Escopo: Vitta Tech',
    client: 'Mariana Costa',
    time: '16:30',
    date: '2026-07-09',
    type: 'proposal'
  },
  {
    id: 'event-3',
    title: 'Diagnóstico Comercial: Albuquerque Log',
    client: 'Ricardo Albuquerque',
    time: '10:00',
    date: '2026-07-10',
    type: 'diagnostic'
  },
  {
    id: 'event-4',
    title: 'Kickoff de Onboarding: Fontana Dev',
    client: 'Felipe Fontana',
    time: '09:30',
    date: '2026-07-08',
    type: 'kickoff'
  }
];

export const MONTHLY_METRICS = [
  { name: 'Jan', mrr: 124000, ads: 12000, bookings: 42, conversion: 28 },
  { name: 'Fev', mrr: 148000, ads: 15000, bookings: 54, conversion: 30 },
  { name: 'Mar', mrr: 165000, ads: 18000, bookings: 61, conversion: 31 },
  { name: 'Abr', mrr: 198000, ads: 20000, bookings: 78, conversion: 35 },
  { name: 'Mai', mrr: 245000, ads: 25000, bookings: 92, conversion: 38 },
  { name: 'Jun', mrr: 312000, ads: 32000, bookings: 114, conversion: 40 },
  { name: 'Jul', mrr: 380000, ads: 38000, bookings: 135, conversion: 42 }
];

export const PIPELINE_COLUMNS = [
  { id: 'new', title: 'Novas Reuniões', color: 'border-blue-500/20 text-blue-400 bg-blue-500/5' },
  { id: 'scheduled', title: 'Sessão Agendada', color: 'border-amber-500/20 text-amber-400 bg-amber-500/5' },
  { id: 'diagnosed', title: 'Diagnóstico Concluído', color: 'border-purple-500/20 text-purple-400 bg-purple-500/5' },
  { id: 'proposal', title: 'Proposta High-Ticket', color: 'border-pink-500/20 text-pink-400 bg-pink-500/5' },
  { id: 'signed', title: 'Contrato Assinado', color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' }
];
