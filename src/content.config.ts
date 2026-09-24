import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localizedText = z.object({
  en: z.string(),
  th: z.string(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
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
  loader: glob({ pattern: '**/*.yaml', base: './src/content/experiences' }),
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
  loader: glob({ pattern: '**/*.yaml', base: './src/content/educations' }),
  schema: z.object({
    order: z.number(),
    degree: localizedText,
    institution: localizedText,
    start: z.string(),
    end: z.string(),
    summary: localizedText,
  }),
});

const certificates = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/certificates' }),
  schema: z.object({
    order: z.number(),
    name: localizedText,
    issuer: z.string(),
    date: z.string(),
    url: z.url().optional(),
  }),
});

export const collections = { projects, experiences, educations, certificates };
