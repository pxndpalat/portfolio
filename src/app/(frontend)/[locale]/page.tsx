import { getPayload } from 'payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import config from '@/payload.config'

import { PortfolioClient } from './PortfolioClient'

type Locale = 'en' | 'th'

type Metric = {
  label: string
  value: string
}

type ContactLink = {
  copyValue?: string | null
  href: string
  label: string
  value: string
}

type PortfolioData = {
  about: {
    callout?: { label?: string | null; text?: string | null }
    eyebrow: string
    note?: string | null
    paragraphs: { text: string }[]
    title: string
  }
  brandLabel: string
  contact: {
    intro: string
    links: ContactLink[]
  }
  footerText: string
  hero: {
    eyebrow: string
    lead: string
    primaryActionLabel: string
    secondaryActionLabel: string
    title: string
  }
  metrics: Metric[]
  navigation: {
    about: string
    contact: string
    cta: string
    experience: string
    projects: string
    skills: string
  }
  profileTerminal: {
    focus: string
    name: string
    note?: string | null
    proof: string
    strength: string
  }
  sectionLabels: {
    contact: SectionLabel
    experience: SectionLabel
    projects: SectionLabel
    skills: SectionLabel
  }
  siteName: string
}

type SectionLabel = {
  eyebrow: string
  note?: string | null
  title: string
}

type ExperienceItem = {
  company: string
  employmentType?: string | null
  endDate?: string | null
  highlights?: { text: string }[] | null
  id: string | number
  isCurrent?: boolean | null
  location?: string | null
  roleTitle: string
  startDate?: string | null
  summary?: string | null
}

type ProjectItem = {
  category: string
  evidence?: string | null
  excerpt: string
  id: string | number
  images?: MediaLike[] | null
  liveUrl?: string | null
  repoUrl?: string | null
  slug: string
  tags?: { label: string }[] | null
  title: string
}

type SkillItem = {
  id: string | number
  items?: { text: string }[] | null
  summary?: string | null
  title: string
}

type MediaLike = {
  alt?: string | null
  url?: string | null
}

type PayloadClient = {
  find: (args: Record<string, unknown>) => Promise<{ docs: unknown[] }>
  findGlobal: (args: Record<string, unknown>) => Promise<unknown>
}

const locales: Locale[] = ['en', 'th']

const fallback: Record<Locale, PortfolioData> = {
  en: {
    about: {
      callout: {
        label: 'Reading promise',
        text: 'Every project card is written as context, decision, and result, so reviewers can inspect how you think.',
      },
      eyebrow: '01 / ABOUT',
      note: 'Use this section to explain your motivation, engineering taste, and what makes your work distinct.',
      paragraphs: [
        {
          text: 'I am a software engineer who cares about the path from unclear business need to reliable shipped product.',
        },
        {
          text: 'My strongest work usually sits between product and infrastructure: clarifying requirements, designing APIs, building internal tools, and documenting tradeoffs.',
        },
        {
          text: 'Replace this placeholder with real background, domain knowledge, migration stories, mentoring, or the technical problems you want next.',
        },
      ],
      title: 'A readable profile, not a compressed resume.',
    },
    brandLabel: 'YOUR_NAME.dev',
    contact: {
      intro:
        'I am open to roles and collaborations where engineering quality, product clarity, and team communication matter.',
      links: [
        {
          copyValue: 'your.email@example.com',
          href: 'mailto:your.email@example.com',
          label: 'Email',
          value: 'your.email@example.com',
        },
        {
          copyValue: 'https://github.com/your-handle',
          href: 'https://github.com/your-handle',
          label: 'GitHub',
          value: 'github.com/your-handle',
        },
        {
          copyValue: 'https://linkedin.com/in/your-profile',
          href: 'https://linkedin.com/in/your-profile',
          label: 'LinkedIn',
          value: 'linkedin.com/in/your-profile',
        },
      ],
    },
    footerText:
      'Placeholder content is rendering because Payload content has not been published yet. Add real portfolio data in the admin panel.',
    hero: {
      eyebrow: 'available for thoughtful engineering roles',
      lead:
        'Replace this with your real summary: what you build, the systems you enjoy, and the kind of teams you help.',
      primaryActionLabel: 'read selected projects',
      secondaryActionLabel: 'trace experience',
      title: 'Portfolio for a software engineer who explains the work behind the code.',
    },
    metrics: [
      { label: 'suggested reading path', value: '06m' },
      { label: 'core sections', value: '5' },
      { label: 'real impact metrics pending', value: '--' },
    ],
    navigation: {
      about: 'about',
      contact: 'contact',
      cta: 'hire / collaborate',
      experience: 'experience',
      projects: 'projects',
      skills: 'skills',
    },
    profileTerminal: {
      focus: 'backend, product systems, reliable UI',
      name: 'Your Name',
      note: 'Fill with real stack, role, and measurable outcomes.',
      proof: 'projects below, with tradeoffs and decisions',
      strength: 'turn ambiguous problems into maintainable releases',
    },
    sectionLabels: {
      contact: {
        eyebrow: '05 / CONTACT',
        note: 'Make the next step clear with editable links from Payload.',
        title: 'Make the next step obvious.',
      },
      experience: {
        eyebrow: '02 / EXPERIENCE',
        note: 'Each role can open with enough detail without making the page too long.',
        title: 'Career history with engineering decisions exposed.',
      },
      projects: {
        eyebrow: '03 / PROJECTS',
        note: 'Filters help reviewers jump to work they care about without losing page context.',
        title: 'Selected work with enough depth to evaluate.',
      },
      skills: {
        eyebrow: '04 / SKILLS',
        note: 'Group skills by engineering responsibility instead of a long logo list.',
        title: 'Skills grouped by engineering responsibility.',
      },
    },
    siteName: 'Software Engineer Portfolio',
  },
  th: {
    about: {
      callout: {
        label: 'แนวทางการอ่าน',
        text: 'ทุกโปรเจกต์ควรเล่า context, decision และ result เพื่อให้คนอ่านเห็นวิธีคิด ไม่ใช่แค่เห็นรูปหน้าจอ.',
      },
      eyebrow: '01 / ABOUT',
      note: 'ใช้ส่วนนี้เล่าแรงจูงใจ วิธีคิด และสิ่งที่ทำให้คุณต่างจาก engineer คนอื่น.',
      paragraphs: [
        {
          text: 'ฉันเป็น software engineer ที่ให้ความสำคัญกับการเปลี่ยนโจทย์ที่ยังไม่ชัดให้เป็น product ที่ใช้งานได้จริงและดูแลต่อได้.',
        },
        {
          text: 'งานที่ถนัดมักอยู่ระหว่าง product และ infrastructure เช่น clarify requirement, design API, สร้าง internal tool และเขียน tradeoff ให้ทีมตัดสินใจง่ายขึ้น.',
        },
        {
          text: 'แทนที่ข้อความนี้ด้วยประวัติจริง domain ที่ถนัด migration story การ mentor หรือปัญหาเชิงเทคนิคที่อยากทำต่อ.',
        },
      ],
      title: 'โปรไฟล์ที่อ่านรู้เรื่อง ไม่ใช่ resume ที่ถูกบีบจนแน่น.',
    },
    brandLabel: 'YOUR_NAME.dev',
    contact: {
      intro:
        'ฉันเปิดรับ role และ collaboration ที่ให้ความสำคัญกับคุณภาพงาน engineering, product clarity และการสื่อสารในทีม.',
      links: [
        {
          copyValue: 'your.email@example.com',
          href: 'mailto:your.email@example.com',
          label: 'Email',
          value: 'your.email@example.com',
        },
        {
          copyValue: 'https://github.com/your-handle',
          href: 'https://github.com/your-handle',
          label: 'GitHub',
          value: 'github.com/your-handle',
        },
        {
          copyValue: 'https://linkedin.com/in/your-profile',
          href: 'https://linkedin.com/in/your-profile',
          label: 'LinkedIn',
          value: 'linkedin.com/in/your-profile',
        },
      ],
    },
    footerText:
      'ตอนนี้กำลังแสดง placeholder เพราะยังไม่มีข้อมูล published ใน Payload ให้เพิ่มข้อมูลจริงผ่าน admin panel.',
    hero: {
      eyebrow: 'available for thoughtful engineering roles',
      lead: 'แทนที่ข้อความนี้ด้วย summary จริง: คุณสร้างอะไร ชอบระบบแบบไหน และช่วยทีมประเภทใดได้ดีที่สุด.',
      primaryActionLabel: 'ดู selected projects',
      secondaryActionLabel: 'ดู experience',
      title: 'Portfolio ของ software engineer ที่อธิบายงานเบื้องหลัง code ได้ชัดเจน.',
    },
    metrics: [
      { label: 'suggested reading path', value: '06m' },
      { label: 'core sections', value: '5' },
      { label: 'real impact metrics pending', value: '--' },
    ],
    navigation: {
      about: 'about',
      contact: 'contact',
      cta: 'hire / collaborate',
      experience: 'experience',
      projects: 'projects',
      skills: 'skills',
    },
    profileTerminal: {
      focus: 'backend, product systems, reliable UI',
      name: 'ชื่อของคุณ',
      note: 'ใส่ stack, role และ measurable outcome จริง.',
      proof: 'projects below, with tradeoffs and decisions',
      strength: 'turn ambiguous problems into maintainable releases',
    },
    sectionLabels: {
      contact: {
        eyebrow: '05 / CONTACT',
        note: 'ทำให้ช่องทางติดต่อชัดเจน และแก้ link ได้จาก Payload.',
        title: 'ทำให้ next step ชัดเจน.',
      },
      experience: {
        eyebrow: '02 / EXPERIENCE',
        note: 'แต่ละ role เปิดอ่านรายละเอียดได้ เพื่อให้หน้าไม่ยาวเกินแต่ยังมีเนื้อหาเต็ม.',
        title: 'ประวัติการทำงานที่เห็นการตัดสินใจเชิง engineering.',
      },
      projects: {
        eyebrow: '03 / PROJECTS',
        note: 'ตัวกรองช่วยให้ reviewer ไปที่งานที่สนใจ โดยยังไม่เสีย context ของทั้งหน้า.',
        title: 'Selected work ที่มีรายละเอียดพอให้ประเมิน.',
      },
      skills: {
        eyebrow: '04 / SKILLS',
        note: 'จัด skill เป็นสิ่งที่ใช้แก้ปัญหา ไม่ใช่ list logo ยาว ๆ.',
        title: 'Skills ที่จัดตาม engineering responsibility.',
      },
    },
    siteName: 'Software Engineer Portfolio',
  },
}

const fallbackExperiences: Record<Locale, ExperienceItem[]> = {
  en: [
    {
      company: 'Company name',
      highlights: [
        { text: 'Describe the product surface you owned and the users it served.' },
        { text: 'Explain one technical decision around API boundaries, state, observability, or deployment safety.' },
        { text: 'State measurable outcomes when you have real numbers.' },
      ],
      id: 'fallback-current',
      isCurrent: true,
      roleTitle: 'Software Engineer - Current / Recent Role',
      startDate: '2024-01-01',
    },
    {
      company: 'Company or project',
      highlights: [
        { text: 'Summarize frontend, backend, integrations, infrastructure, or internal tooling scope.' },
        { text: 'Highlight collaboration, code review, incident response, documentation, or mentoring.' },
      ],
      id: 'fallback-previous',
      roleTitle: 'Engineer / Developer - Previous Role',
      startDate: '2022-01-01',
      endDate: '2023-12-31',
    },
  ],
  th: [
    {
      company: 'Company name',
      highlights: [
        { text: 'อธิบาย product surface ที่รับผิดชอบและผู้ใช้ที่เกี่ยวข้องให้ชัด.' },
        { text: 'เล่า technical decision เช่น API boundary, state, observability หรือ deployment safety.' },
        { text: 'ใส่ outcome ที่วัดได้เมื่อมีตัวเลขจริง.' },
      ],
      id: 'fallback-current',
      isCurrent: true,
      roleTitle: 'Software Engineer - Current / Recent Role',
      startDate: '2024-01-01',
    },
    {
      company: 'Company or project',
      highlights: [
        { text: 'สรุป scope งาน frontend, backend, integrations, infrastructure หรือ internal tooling.' },
        { text: 'เน้น collaboration, code review, incident response, documentation หรือ mentoring.' },
      ],
      id: 'fallback-previous',
      roleTitle: 'Engineer / Developer - Previous Role',
      startDate: '2022-01-01',
      endDate: '2023-12-31',
    },
  ],
}

const fallbackProjects: Record<Locale, ProjectItem[]> = {
  en: [
    {
      category: 'backend',
      evidence: 'Evidence to add: repository, architecture note, before/after metric.',
      excerpt:
        'Explain the old pain, the boundary you introduced, how migration worked, and what changed for developers or users.',
      id: 'fallback-api',
      slug: 'api-platform-service-refactor',
      tags: [{ label: 'API design' }, { label: 'migration' }, { label: 'observability' }],
      title: 'API Platform / Service Refactor',
    },
    {
      category: 'frontend',
      evidence: 'Evidence to add: screenshots, user feedback, shipped URL.',
      excerpt:
        'Describe the user workflow, state model, empty/error/loading states, and how the UI reduced ambiguity.',
      id: 'fallback-dashboard',
      slug: 'workflow-ui-dashboard',
      tags: [{ label: 'state' }, { label: 'accessibility' }, { label: 'data UI' }],
      title: 'Workflow UI / Dashboard',
    },
    {
      category: 'tooling',
      evidence: 'Evidence to add: CLI demo, internal doc excerpt, saved time if known.',
      excerpt:
        'Capture the repetitive task, the interface made for teammates, failure modes, and adoption support.',
      id: 'fallback-tooling',
      slug: 'developer-tooling-automation',
      tags: [{ label: 'DX' }, { label: 'CI' }, { label: 'docs' }],
      title: 'Developer Tooling / Automation',
    },
  ],
  th: [
    {
      category: 'backend',
      evidence: 'หลักฐานที่ควรเพิ่ม: repository, architecture note หรือ metric ก่อน/หลัง.',
      excerpt:
        'เล่าปัญหาเดิม boundary ที่ออกแบบ วิธี migrate และสิ่งที่เปลี่ยนสำหรับ developer หรือ user.',
      id: 'fallback-api',
      slug: 'api-platform-service-refactor',
      tags: [{ label: 'API design' }, { label: 'migration' }, { label: 'observability' }],
      title: 'API Platform / Service Refactor',
    },
    {
      category: 'frontend',
      evidence: 'หลักฐานที่ควรเพิ่ม: screenshots, user feedback หรือ shipped URL.',
      excerpt:
        'เล่า workflow ของ user, state model, empty/error/loading states และ UI ลดความกำกวมอย่างไร.',
      id: 'fallback-dashboard',
      slug: 'workflow-ui-dashboard',
      tags: [{ label: 'state' }, { label: 'accessibility' }, { label: 'data UI' }],
      title: 'Workflow UI / Dashboard',
    },
    {
      category: 'tooling',
      evidence: 'หลักฐานที่ควรเพิ่ม: CLI demo, internal doc หรือเวลาที่ประหยัดได้.',
      excerpt:
        'เล่างานซ้ำที่แก้ interface ที่ทำให้ teammate ใช้ failure modes และวิธีช่วยให้คน adopt.',
      id: 'fallback-tooling',
      slug: 'developer-tooling-automation',
      tags: [{ label: 'DX' }, { label: 'CI' }, { label: 'docs' }],
      title: 'Developer Tooling / Automation',
    },
  ],
}

const fallbackSkills: Record<Locale, SkillItem[]> = {
  en: [
    {
      id: 'fallback-product',
      items: [
        { text: 'Translate ambiguous requirements into scoped releases.' },
        { text: 'Design UX states that cover loading, empty, error, and permission paths.' },
        { text: 'Write implementation notes that help reviewers understand tradeoffs.' },
      ],
      title: 'Product engineering',
    },
    {
      id: 'fallback-backend',
      items: [
        { text: 'API boundaries, data modeling, migrations, queue or integration work.' },
        { text: 'Observability habits: logs, traces, alerts, and runbook-quality notes.' },
        { text: 'Reliability work that favors explicit failure handling.' },
      ],
      title: 'Backend systems',
    },
    {
      id: 'fallback-frontend',
      items: [
        { text: 'Responsive UI, accessible controls, and maintainable component structure.' },
        { text: 'Data-heavy screens with clear hierarchy and keyboard-friendly behavior.' },
        { text: 'Performance-minded rendering and careful interaction states.' },
      ],
      title: 'Frontend craft',
    },
  ],
  th: [
    {
      id: 'fallback-product',
      items: [
        { text: 'แปลง requirement ที่ยังไม่ชัดให้เป็น release scope ที่ทำได้จริง.' },
        { text: 'ออกแบบ UX states สำหรับ loading, empty, error และ permission paths.' },
        { text: 'เขียน implementation notes ที่ช่วย reviewer เข้าใจ tradeoffs.' },
      ],
      title: 'Product engineering',
    },
    {
      id: 'fallback-backend',
      items: [
        { text: 'API boundaries, data modeling, migrations, queue หรือ integration work.' },
        { text: 'นิสัยด้าน observability: logs, traces, alerts และ runbook-quality notes.' },
        { text: 'งาน reliability ที่จัดการ failure อย่าง explicit.' },
      ],
      title: 'Backend systems',
    },
    {
      id: 'fallback-frontend',
      items: [
        { text: 'Responsive UI, accessible controls และ component structure ที่ดูแลต่อได้.' },
        { text: 'หน้าจอ data-heavy ที่ hierarchy ชัดและ keyboard-friendly.' },
        { text: 'Rendering ที่ใส่ใจ performance และ interaction states.' },
      ],
      title: 'Frontend craft',
    },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const normalizedLocale = isLocale(locale) ? locale : 'en'

  return {
    description:
      normalizedLocale === 'th'
        ? 'Portfolio ส่วนตัวที่จัดการข้อมูลผ่าน Payload CMS'
        : 'Personal portfolio powered by Payload CMS',
    title: fallback[normalizedLocale].siteName,
  }
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const normalizedLocale = locale
  const { experiences, portfolio, projects, skills } = await getPortfolioPageData(normalizedLocale)
  const projectItems = projects.length ? projects : fallbackProjects[normalizedLocale]
  const categories = Array.from(new Set(projectItems.map((project) => project.category)))

  return (
    <PortfolioClient categories={categories} locale={normalizedLocale}>
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-slate-50/90 backdrop-blur-xl">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex min-h-16 w-page items-center justify-between gap-5"
        >
          <a
            aria-label="Back to top"
            className="inline-flex items-center gap-2.5 font-mono text-sm font-extrabold"
            href={`/${normalizedLocale}#top`}
          >
            <span className="grid size-8 place-items-center rounded-[7px] border border-slate-200 bg-white text-emerald-600">
              &lt;/&gt;
            </span>
            <span>{portfolio.brandLabel}</span>
          </a>
          <button
            aria-controls="navLinks"
            aria-expanded="false"
            className="hidden min-h-10 rounded-[7px] border border-slate-200 bg-white px-3 font-mono text-xs font-extrabold max-[680px]:inline-flex max-[680px]:items-center"
            data-menu-button
            type="button"
          >
            Menu
          </button>
          <div
            className="flex items-center gap-1 font-mono text-xs font-bold text-slate-500 max-[680px]:fixed max-[680px]:left-3.5 max-[680px]:right-3.5 max-[680px]:top-14 max-[680px]:hidden max-[680px]:flex-col max-[680px]:items-stretch max-[680px]:rounded-lg max-[680px]:border max-[680px]:border-slate-200 max-[680px]:bg-white max-[680px]:p-2 max-[680px]:shadow-2xl data-[open=true]:max-[680px]:flex"
            data-nav-links
            id="navLinks"
          >
            <NavLink href="#about" label={portfolio.navigation.about} />
            <NavLink href="#experience" label={portfolio.navigation.experience} />
            <NavLink href="#projects" label={portfolio.navigation.projects} />
            <NavLink href="#skills" label={portfolio.navigation.skills} />
            <NavLink href="#contact" label={portfolio.navigation.contact} />
          </div>
          <div className="flex items-center gap-2 max-[680px]:hidden">
            <Link className="lang-link" href="/en">
              EN
            </Link>
            <Link className="lang-link" href="/th">
              TH
            </Link>
            <a className="cta" href="#contact">
              {portfolio.navigation.cta}
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-page" id="top">
        <section
          aria-labelledby="hero-title"
          className="grid min-h-[calc(100svh-64px)] grid-cols-[minmax(0,1.05fr)_minmax(340px,0.75fr)] items-center gap-8 py-16 max-[920px]:min-h-0 max-[920px]:grid-cols-1 max-[920px]:pt-11"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">
              <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgb(16_185_129_/_0.13)]" />
              {portfolio.hero.eyebrow}
            </div>
            <h1
              className="max-w-[850px] text-balance text-[clamp(44px,7vw,88px)] font-[760] leading-[0.98] tracking-normal text-slate-900 max-[680px]:text-[clamp(38px,13vw,56px)]"
              id="hero-title"
            >
              {portfolio.hero.title}
            </h1>
            <p className="mt-6 max-w-[720px] text-pretty text-[clamp(18px,2vw,22px)] leading-8 text-slate-500 max-[680px]:text-[17px]">
              {portfolio.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <a className="cta" href="#projects">
                {portfolio.hero.primaryActionLabel}
              </a>
              <a className="secondary" href="#experience">
                {portfolio.hero.secondaryActionLabel}
              </a>
            </div>
            <div className="mt-8 grid max-w-[650px] grid-cols-3 gap-2.5 max-[680px]:grid-cols-1">
              {portfolio.metrics.map((metric) => (
                <div
                  className="rounded-lg border border-slate-200 bg-white/75 p-3.5"
                  key={`${metric.value}-${metric.label}`}
                >
                  <strong className="block font-mono text-xl font-extrabold leading-none tabular-nums">
                    {metric.value}
                  </strong>
                  <span className="mt-2 block font-mono text-xs font-bold leading-snug text-slate-500">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ProfileTerminal profile={portfolio.profileTerminal} />
        </section>

        <Section id="about" label={portfolio.about}>
          <div className="grid max-w-[780px] gap-4 text-lg leading-9 text-slate-700">
            {portfolio.about.paragraphs.map((paragraph) => (
              <p key={paragraph.text}>{paragraph.text}</p>
            ))}
          </div>
          {portfolio.about.callout?.text ? (
            <div className="mt-6 rounded-lg border border-l-[3px] border-slate-200 border-l-emerald-500 bg-white p-5">
              {portfolio.about.callout.label ? (
                <strong className="mb-2.5 block font-mono text-xs font-extrabold uppercase tracking-[0.06em]">
                  {portfolio.about.callout.label}
                </strong>
              ) : null}
              <p className="text-slate-700">{portfolio.about.callout.text}</p>
            </div>
          ) : null}
        </Section>

        <Section id="experience" label={portfolio.sectionLabels.experience}>
          <div className="grid gap-4">
            {(experiences.length ? experiences : fallbackExperiences[normalizedLocale]).map((experience) => (
              <details
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                key={experience.id}
                open={Boolean(experience.isCurrent)}
              >
                <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5 marker:hidden max-[680px]:grid-cols-1">
                  <div>
                    <h3 className="text-[22px] font-[760] leading-tight text-slate-900">
                      {experience.roleTitle}
                    </h3>
                    <p className="mt-2 font-mono text-xs font-bold leading-normal text-slate-500">
                      {[experience.company, formatExperienceDates(experience), experience.employmentType, experience.location]
                        .filter(Boolean)
                        .join(' - ')}
                    </p>
                  </div>
                  <span
                    className={[
                      'status-pill',
                      experience.isCurrent ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : '',
                    ].join(' ')}
                  >
                    {experience.isCurrent ? 'current' : 'previous'}
                  </span>
                </summary>
                <div className="border-t border-slate-200 px-5 pb-5">
                  {experience.summary ? (
                    <p className="mt-4 text-slate-700">{experience.summary}</p>
                  ) : null}
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                    {(experience.highlights || []).map((highlight) => (
                      <li key={highlight.text}>{highlight.text}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </Section>

        <Section id="projects" label={portfolio.sectionLabels.projects}>
          <div className="mb-5 flex flex-wrap items-center gap-2.5" data-project-tools />
          <div className="grid grid-cols-2 gap-4 max-[920px]:grid-cols-1">
            {projectItems.map((project) => (
              <article
                className="flex min-h-80 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white"
                data-project-category={project.category}
                key={project.id}
              >
                <ProjectVisual project={project} />
                <div className="flex flex-1 flex-col p-[18px]">
                  <h3 className="text-[22px] font-[760] leading-tight text-slate-900">{project.title}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{project.excerpt}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {(project.tags || []).map((tag) => (
                      <span className="tag" key={tag.label}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 font-mono text-xs font-bold text-slate-500">
                    {project.repoUrl ? <a href={project.repoUrl}>repo</a> : null}
                    {project.liveUrl ? <a href={project.liveUrl}>live</a> : null}
                    {project.evidence ? <span>{project.evidence}</span> : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" label={portfolio.sectionLabels.skills}>
          <div className="grid grid-cols-3 gap-4 max-[920px]:grid-cols-1">
            {(skills.length ? skills : fallbackSkills[normalizedLocale]).map((skill) => (
              <div className="rounded-lg border border-slate-200 bg-white p-5" key={skill.id}>
                <h3 className="font-mono text-sm font-extrabold text-slate-900">{skill.title}</h3>
                {skill.summary ? <p className="mt-3 text-slate-600">{skill.summary}</p> : null}
                <ul className="mt-4 grid list-none gap-2.5 p-0 text-slate-700">
                  {(skill.items || []).map((item) => (
                    <li className="grid grid-cols-[12px_1fr] items-start gap-2.5" key={item.text}>
                      <span className="mt-2.5 size-[7px] rounded-full bg-emerald-500" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" label={portfolio.sectionLabels.contact}>
          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(320px,0.65fr)] items-stretch gap-4 max-[920px]:grid-cols-1">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="text-lg leading-9 text-slate-700">{portfolio.contact.intro}</p>
              <div className="mt-5 grid gap-2.5">
                {portfolio.contact.links.map((link) => (
                  <div
                    className="flex items-center justify-between gap-3 overflow-wrap-anywhere rounded-[7px] border border-slate-200 bg-slate-100 p-3 font-mono text-xs font-bold max-[680px]:grid"
                    key={`${link.label}-${link.value}`}
                  >
                    <a href={link.href}>{link.value}</a>
                    <button
                      className="min-h-8 rounded-md border border-slate-200 bg-white px-2.5 text-[11px] font-extrabold"
                      data-copy={link.copyValue || link.href}
                      type="button"
                    >
                      copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="font-mono text-xs font-extrabold uppercase tracking-[0.06em] text-slate-500">
                No contact backend
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Contact links are managed in Payload. Add email, GitHub, LinkedIn, resume, or calendar links in the
                portfolio global.
              </p>
            </div>
          </div>
        </Section>
      </main>

      <footer className="mx-auto w-page border-t border-slate-200 py-7 pb-10 font-mono text-xs font-bold leading-relaxed text-slate-500">
        {portfolio.footerText}
      </footer>
    </PortfolioClient>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="inline-flex min-h-10 items-center rounded-md px-2.5 hover:bg-white hover:text-slate-900 hover:shadow-[inset_0_0_0_1px_rgb(226_232_240)] data-[active=true]:bg-white data-[active=true]:text-slate-900 data-[active=true]:shadow-[inset_0_0_0_1px_rgb(226_232_240)] max-[680px]:justify-between"
      data-active="false"
      data-nav-link
      href={href}
    >
      {label}
    </a>
  )
}

function ProfileTerminal({ profile }: { profile: PortfolioData['profileTerminal'] }) {
  return (
    <aside
      aria-label="Developer profile summary"
      className="overflow-hidden rounded-lg border border-slate-200 bg-slate-900 text-slate-100 shadow-2xl max-[920px]:order-first"
    >
      <div className="flex h-11 items-center justify-between border-b border-white/10 px-3.5 font-mono text-xs font-bold text-slate-300">
        <span>profile.json</span>
        <span aria-hidden="true" className="inline-flex gap-1.5">
          <i className="block size-2.5 rounded-full bg-rose-400" />
          <i className="block size-2.5 rounded-full bg-amber-400" />
          <i className="block size-2.5 rounded-full bg-emerald-500" />
        </span>
      </div>
      <div className="p-5 font-mono text-sm leading-8">
        <p>
          <span className="text-emerald-400">$</span> cat engineer-profile.json
        </p>
        <p>{'{'}</p>
        <p>
          &nbsp;&nbsp;<span className="text-sky-300">&quot;name&quot;</span>:{' '}
          <span className="text-emerald-100">&quot;{profile.name}&quot;</span>,
        </p>
        <p>
          &nbsp;&nbsp;<span className="text-sky-300">&quot;focus&quot;</span>:{' '}
          <span className="text-emerald-100">&quot;{profile.focus}&quot;</span>,
        </p>
        <p>
          &nbsp;&nbsp;<span className="text-sky-300">&quot;strength&quot;</span>:{' '}
          <span className="text-emerald-100">&quot;{profile.strength}&quot;</span>,
        </p>
        <p>
          &nbsp;&nbsp;<span className="text-sky-300">&quot;proof&quot;</span>:{' '}
          <span className="text-emerald-100">&quot;{profile.proof}&quot;</span>
        </p>
        <p>{'}'}</p>
        {profile.note ? <p className="text-slate-400">{`// ${profile.note}`}</p> : null}
      </div>
    </aside>
  )
}

function ProjectVisual({ project }: { project: ProjectItem }) {
  const image = project.images?.find((item) => item?.url)

  return (
    <div className="grid min-h-32 content-end gap-2 border-b border-slate-200 bg-[linear-gradient(135deg,rgb(241_245_249),rgb(240_249_255))] p-4">
      {image?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={image.alt || project.title} className="h-32 w-full rounded-md object-cover" src={image.url} />
      ) : (
        <div aria-hidden="true" className="grid w-3/4 grid-cols-[0.8fr_1fr_0.65fr] items-end gap-2">
          <i className="block h-10 rounded-[5px] border border-sky-200 bg-sky-50" />
          <i className="block h-20 rounded-[5px] border border-emerald-200 bg-emerald-50" />
          <i className="block h-14 rounded-[5px] border border-sky-200 bg-sky-50" />
        </div>
      )}
      <span className="tag w-fit">{project.category}</span>
    </div>
  )
}

function Section({
  children,
  id,
  label,
}: {
  children: React.ReactNode
  id: string
  label: SectionLabel
}) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="border-t border-slate-200 py-[76px] scroll-mt-20 max-[680px]:py-14"
      data-section
      id={id}
    >
      <div className="grid grid-cols-[minmax(220px,0.38fr)_minmax(0,1fr)] items-start gap-14 max-[920px]:grid-cols-1">
        <div className="sticky top-24 max-[920px]:static">
          <code className="mb-3.5 inline-flex font-mono text-xs font-extrabold text-emerald-600">
            {label.eyebrow}
          </code>
          <h2 className="max-w-[720px] text-balance text-[clamp(30px,4vw,52px)] font-[760] leading-none tracking-normal text-slate-900">
            {label.title}
          </h2>
          {label.note ? <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">{label.note}</p> : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

async function getPortfolioPageData(locale: Locale) {
  try {
    const payload = (await getPayload({ config })) as unknown as PayloadClient

    return {
      experiences: await getCollection<ExperienceItem>(payload, 'experiences', locale),
      portfolio: await getPortfolio(payload, locale),
      projects: await getCollection<ProjectItem>(payload, 'projects', locale),
      skills: await getCollection<SkillItem>(payload, 'skills', locale),
    }
  } catch {
    return {
      experiences: [],
      portfolio: fallback[locale],
      projects: [],
      skills: [],
    }
  }
}

async function getPortfolio(payload: PayloadClient, locale: Locale) {
  try {
    const doc = await payload.findGlobal({
      slug: 'portfolio',
      depth: 2,
      draft: false,
      locale,
    })

    if (isPortfolioData(doc)) return doc
  } catch {
    return fallback[locale]
  }

  return fallback[locale]
}

async function getCollection<T>(
  payload: PayloadClient,
  collection: 'experiences' | 'projects' | 'skills',
  locale: Locale,
) {
  try {
    const result = await payload.find({
      collection,
      depth: 2,
      draft: false,
      limit: 100,
      locale,
      sort: 'order',
      where: {
        featured: {
          equals: true,
        },
      },
    })

    return result.docs as T[]
  } catch {
    return []
  }
}

function formatExperienceDates(experience: ExperienceItem) {
  const start = experience.startDate ? formatYear(experience.startDate) : ''
  const end = experience.isCurrent ? 'present' : experience.endDate ? formatYear(experience.endDate) : ''

  return [start, end].filter(Boolean).join(' to ')
}

function formatYear(value: string) {
  return new Date(value).getUTCFullYear().toString()
}

function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

function isPortfolioData(value: unknown): value is PortfolioData {
  return Boolean(value && typeof value === 'object' && 'siteName' in value)
}
