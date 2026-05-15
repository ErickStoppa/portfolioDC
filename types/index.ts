export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  techStack: string[];
  demoSlug: string;
  thumbnail: string;
  featured: boolean;
  year: number;
}

export interface Demo {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  tags: string[];
  techStack: string[];
  thumbnail: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  social: { twitter?: string; linkedin?: string; github?: string };
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "icon";
export type BadgeVariant = "default" | "primary" | "accent" | "success" | "warning" | "error" | "muted";
