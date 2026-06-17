'use client'

import { useEffect, useMemo, useState } from 'react'

type PortfolioClientProps = {
  categories: string[]
  children: React.ReactNode
  locale: string
}

export function PortfolioClient({ categories, children, locale }: PortfolioClientProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('about')
  const filters = useMemo(() => ['all', ...categories], [categories])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? window.scrollY / max : 0
      setScrollProgress(Math.max(0, Math.min(1, ratio)))

      let nextActive = 'about'
      for (const section of Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))) {
        if (section.getBoundingClientRect().top <= 140) nextActive = section.id
      }
      setActiveSection(nextActive)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.activeFilter = activeFilter
    document.documentElement.dataset.menuOpen = String(menuOpen)
    document.documentElement.dataset.activeSection = activeSection
  }, [activeFilter, activeSection, menuOpen])

  useEffect(() => {
    const onClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const button = target?.closest<HTMLButtonElement>('[data-copy]')
      if (!button) return

      const value = button.dataset.copy
      if (!value) return

      const original = button.textContent || 'copy'
      try {
        await navigator.clipboard.writeText(value)
        button.textContent = 'copied'
      } catch {
        button.textContent = 'select'
      }
      window.setTimeout(() => {
        button.textContent = original
      }, 1400)
    }

    document.addEventListener('click', onClick)

    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-emerald-500 to-sky-500"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <PortfolioControls
        activeFilter={activeFilter}
        activeSection={activeSection}
        filters={filters}
        menuOpen={menuOpen}
        setActiveFilter={setActiveFilter}
        setMenuOpen={setMenuOpen}
      />
      {children}
    </>
  )
}

type PortfolioControlsProps = {
  activeFilter: string
  activeSection: string
  filters: string[]
  menuOpen: boolean
  setActiveFilter: (filter: string) => void
  setMenuOpen: (open: boolean) => void
}

function PortfolioControls({
  activeFilter,
  activeSection,
  filters,
  menuOpen,
  setActiveFilter,
  setMenuOpen,
}: PortfolioControlsProps) {
  useEffect(() => {
    const projectTools = document.querySelector('[data-project-tools]')
    if (!projectTools) return

    projectTools.replaceChildren()
    filters.forEach((filter) => {
      const button = document.createElement('button')
      button.className = [
        'chip',
        activeFilter === filter ? 'chip-active' : '',
      ].join(' ')
      button.type = 'button'
      button.textContent = filter
      button.addEventListener('click', () => setActiveFilter(filter))
      projectTools.append(button)
    })
  }, [activeFilter, filters, setActiveFilter])

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-project-category]').forEach((project) => {
      const category = project.dataset.projectCategory || ''
      project.hidden = activeFilter !== 'all' && category !== activeFilter
    })
  }, [activeFilter])

  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
      link.dataset.active = String(link.hash === `#${activeSection}`)
    })
  }, [activeSection])

  useEffect(() => {
    const button = document.querySelector<HTMLButtonElement>('[data-menu-button]')
    const nav = document.querySelector<HTMLElement>('[data-nav-links]')
    if (!button || !nav) return

    button.setAttribute('aria-expanded', String(menuOpen))
    nav.dataset.open = String(menuOpen)
  }, [menuOpen])

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('[data-nav-links]')
    if (!nav) return

    const close = () => setMenuOpen(false)
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close))

    return () => nav.querySelectorAll('a').forEach((link) => link.removeEventListener('click', close))
  }, [setMenuOpen])

  useEffect(() => {
    const button = document.querySelector<HTMLButtonElement>('[data-menu-button]')
    if (!button) return

    const toggle = () => setMenuOpen(!menuOpen)
    button.addEventListener('click', toggle)

    return () => button.removeEventListener('click', toggle)
  }, [menuOpen, setMenuOpen])

  return null
}
