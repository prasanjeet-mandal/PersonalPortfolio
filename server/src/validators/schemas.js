import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(100),
  email: z.string().email('Valid email address is required'),
  subject: z.string().min(3, 'Subject must be at least 3 characters long').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters long').max(5000),
});

export const projectSchema = z.object({
  slug: z.string().min(2).max(100),
  title: z.string().min(2).max(150),
  category: z.string().min(2).max(100),
  filterCategory: z.enum(['AI / ML', 'Full-Stack', 'Research', 'Tools']).default('Full-Stack'),
  tagline: z.string().min(5),
  summary: z.string().min(10),
  featured: z.boolean().default(false),
  badge: z.string().optional().nullable(),
  architecture: z.string().optional().nullable(),
  githubUrl: z.string().url().optional().nullable().or(z.literal('')),
  liveUrl: z.string().url().optional().nullable().or(z.literal('')),
  coverImage: z.string().optional().nullable(),
  statusNote: z.string().optional().nullable(),
  technologies: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
});

export const skillSchema = z.object({
  category: z.string().min(2).max(50),
  name: z.string().min(1).max(100),
  level: z.enum(['Advanced', 'Proficient', 'Intermediate', 'Beginner']),
  rating: z.number().int().min(1).max(100).default(80),
  icon: z.string().optional().nullable(),
});

export const educationSchema = z.object({
  degree: z.string().min(2),
  institution: z.string().min(2),
  location: z.string().min(2),
  duration: z.string().min(2),
  status: z.string().min(2),
  description: z.string().optional().nullable(),
  highlights: z.string().optional().nullable(),
});

export const achievementSchema = z.object({
  title: z.string().min(2),
  organization: z.string().min(2),
  association: z.string().optional().nullable(),
  date: z.string().min(2),
  badge: z.string().optional().nullable(),
  type: z.string().default('Hackathon'),
  description: z.string().min(10),
  highlights: z.string().optional().nullable(),
});

export const experienceSchema = z.object({
  title: z.string().min(2),
  company: z.string().min(2),
  location: z.string().min(2),
  duration: z.string().min(2),
  type: z.string().default('Internship'),
  description: z.string().min(10),
  highlights: z.string().optional().nullable(),
});
