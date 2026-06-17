import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Portfolio: GlobalConfig = {
  slug: 'portfolio',
  label: 'Portfolio',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Portfolio',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'brandLabel',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'navigation',
      type: 'group',
      fields: [
        { name: 'about', type: 'text', localized: true, required: true },
        { name: 'experience', type: 'text', localized: true, required: true },
        { name: 'projects', type: 'text', localized: true, required: true },
        { name: 'skills', type: 'text', localized: true, required: true },
        { name: 'contact', type: 'text', localized: true, required: true },
        { name: 'cta', type: 'text', localized: true, required: true },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', localized: true, required: true },
        { name: 'title', type: 'textarea', localized: true, required: true },
        { name: 'lead', type: 'textarea', localized: true, required: true },
        { name: 'primaryActionLabel', type: 'text', localized: true, required: true },
        { name: 'secondaryActionLabel', type: 'text', localized: true, required: true },
      ],
    },
    {
      name: 'profileTerminal',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', localized: true, required: true },
        { name: 'focus', type: 'text', localized: true, required: true },
        { name: 'strength', type: 'text', localized: true, required: true },
        { name: 'proof', type: 'text', localized: true, required: true },
        { name: 'note', type: 'text', localized: true },
      ],
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'metrics',
      type: 'array',
      localized: true,
      minRows: 1,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', localized: true, required: true },
        { name: 'title', type: 'textarea', localized: true, required: true },
        { name: 'note', type: 'textarea', localized: true },
        {
          name: 'paragraphs',
          type: 'array',
          localized: true,
          minRows: 1,
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
        {
          name: 'callout',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'text', type: 'textarea', localized: true },
          ],
        },
      ],
    },
    {
      name: 'sectionLabels',
      type: 'group',
      fields: [
        {
          name: 'experience',
          type: 'group',
          fields: [
            { name: 'eyebrow', type: 'text', localized: true, required: true },
            { name: 'title', type: 'textarea', localized: true, required: true },
            { name: 'note', type: 'textarea', localized: true },
          ],
        },
        {
          name: 'projects',
          type: 'group',
          fields: [
            { name: 'eyebrow', type: 'text', localized: true, required: true },
            { name: 'title', type: 'textarea', localized: true, required: true },
            { name: 'note', type: 'textarea', localized: true },
          ],
        },
        {
          name: 'skills',
          type: 'group',
          fields: [
            { name: 'eyebrow', type: 'text', localized: true, required: true },
            { name: 'title', type: 'textarea', localized: true, required: true },
            { name: 'note', type: 'textarea', localized: true },
          ],
        },
        {
          name: 'contact',
          type: 'group',
          fields: [
            { name: 'eyebrow', type: 'text', localized: true, required: true },
            { name: 'title', type: 'textarea', localized: true, required: true },
            { name: 'note', type: 'textarea', localized: true },
          ],
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'intro', type: 'textarea', localized: true, required: true },
        {
          name: 'links',
          type: 'array',
          localized: true,
          minRows: 1,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
            {
              name: 'copyValue',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'footerText',
      type: 'textarea',
      localized: true,
      required: true,
    },
  ],
}
