export interface PainPoint {
  id: string;
  icon: string; // lucide icon name
  title: string;
  explanation: string;
  consequence: string;
}

export interface MethodPillar {
  id: string;
  icon: string;
  name: string;
  explanation: string;
  benefit: string;
}

export interface TimelineStep {
  number: string;
  title: string;
  description: string;
  tag: string;
  metric: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  isPremium?: boolean;
}

export interface SuccessCase {
  id: string;
  type: 'video' | 'chat' | 'dashboard' | 'review' | 'before_after' | 'image';
  clientName: string;
  niche: string;
  metric: string;
  title: string;
  content: string;
  avatarUrl?: string;
  imageUrl?: string;
  dashboardData?: {
    before: string;
    after: string;
    label: string;
  };
  chatMessages?: {
    sender: 'client' | 'advisor';
    text: string;
    time: string;
  }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
