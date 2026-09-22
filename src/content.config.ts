import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const localizedText = z.object({
  en: z.string(),
  th: z.string(),
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    title: localizedText,
    description: localizedText,
    technologies: z.array(z.string()),
    url: z.url().optional(),
    repository: z.url().optional(),
  }),
});

const experiences = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    role: localizedText,
    company: z.string(),
    start: z.string(),
    end: z.string(),
    summary: localizedText,
  }),
});

const educations = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    degree: localizedText,
    institution: z.string(),
    start: z.string(),
    end: z.string(),
    summary: localizedText,
  }),
});

const certificates = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    name: localizedText,
    issuer: z.string(),
    date: z.string(),
    url: z.url().optional(),
  }),
});

export const collections = { projects, experiences, educations, certificates };
