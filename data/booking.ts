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
  { id: "consultation", name: "Consultation", emoji: "💬", description: "1-on-1 expert consultation session" },
  { id: "treatment", name: "Treatment", emoji: "✨", description: "Professional treatment session" },
  { id: "coaching", name: "Coaching", emoji: "🎯", description: "Personal development coaching" },
  { id: "assessment", name: "Assessment", emoji: "📋", description: "Comprehensive health assessment" },
];

export const professionals: Professional[] = [
  { id: "p1", name: "Dr. Emma Walsh", specialty: "Wellness Consultant", avatar: "EW", rating: 4.9, reviews: 214, available: true },
  { id: "p2", name: "James Thornton", specialty: "Performance Coach", avatar: "JT", rating: 4.8, reviews: 157, available: true },
  { id: "p3", name: "Dr. Mia Santos", specialty: "Health Specialist", avatar: "MS", rating: 5.0, reviews: 89, available: false },
  { id: "p4", name: "Alex Rivera", specialty: "Lifestyle Coach", avatar: "AR", rating: 4.7, reviews: 312, available: true },
];

export const timeSlots: TimeSlot[] = [
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: false },
  { time: "03:30 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: false },
];

export const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
