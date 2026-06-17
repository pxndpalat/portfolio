import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    defaultColumns: ['roleTitle', 'company', 'isCurrent', 'order', '_status'],
    group: 'Portfolio',
    useAsTitle: 'roleTitle',
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
    maxPerDoc: 30,
  },
  fields: [
    {
      name: 'roleTitle',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        condition: (_, siblingData) => !siblingData?.isCurrent,
      },
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'employmentType',
      type: 'select',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Internship', value: 'internship' },
        { label: 'Education', value: 'education' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'highlights',
      type: 'array',
      localized: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      index: true,
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
