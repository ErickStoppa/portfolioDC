export interface ServiceCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  reviews: number;
  available: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export const serviceCategories: ServiceCategory[] = [
  { id: "consultation", name: "Consulta", emoji: "💬", description: "Sessão de consulta individual com especialista" },
  { id: "treatment", name: "Tratamento", emoji: "✨", description: "Sessão de tratamento profissional" },
  { id: "coaching", name: "Coaching", emoji: "🎯", description: "Coaching de desenvolvimento pessoal" },
  { id: "assessment", name: "Avaliação", emoji: "📋", description: "Avaliação completa de saúde" },
];

export const professionals: Professional[] = [
  { id: "p1", name: "Dra. Emma Walsh", specialty: "Consultora de Bem-Estar", avatar: "EW", rating: 4.9, reviews: 214, available: true },
  { id: "p2", name: "James Thornton", specialty: "Coach de Performance", avatar: "JT", rating: 4.8, reviews: 157, available: true },
  { id: "p3", name: "Dra. Mia Santos", specialty: "Especialista em Saúde", avatar: "MS", rating: 5.0, reviews: 89, available: false },
  { id: "p4", name: "Alex Rivera", specialty: "Coach de Estilo de Vida", avatar: "AR", rating: 4.7, reviews: 312, available: true },
];

export const timeSlots: TimeSlot[] = [
  { time: "09:00", available: true },
  { time: "09:30", available: false },
  { time: "10:00", available: true },
  { time: "10:30", available: true },
  { time: "11:00", available: false },
  { time: "11:30", available: true },
  { time: "14:00", available: true },
  { time: "14:30", available: true },
  { time: "15:00", available: false },
  { time: "15:30", available: true },
  { time: "16:00", available: true },
  { time: "16:30", available: false },
];

export const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
