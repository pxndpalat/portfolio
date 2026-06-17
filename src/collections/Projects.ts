import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const projectCategories = [
  { label: 'Backend', value: 'backend' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Tooling', value: 'tooling' },
  { label: 'Full-stack', value: 'full-stack' },
  { label: 'Product', value: 'product' },
] as const

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    defaultColumns: ['title', 'category', 'featured', 'order', '_status'],
    group: 'Portfolio',
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultSort: 'order',
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      required: true,
      unique: true,
      admin: {
        description: 'Stable URL identifier for a future /projects/[slug] page.',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [...projectCategories],
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Long-form case study content for future project detail pages.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'repoUrl',
      type: 'text',
    },
    {
      name: 'liveUrl',
      type: 'text',
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'evidence',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      index: true,
      required: true,
    },
  ],
}
