export type Locale = 'en' | 'th';

export type LocalizedText = Record<Locale, string>;

export interface SiteConfig {
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
  email: string;
  social: Array<{ label: string; url: string }>;
  skills: Array<{ name: string; category: LocalizedText }>;
  languages: Array<{ name: LocalizedText; level: LocalizedText }>;
}

/** Replace every PLACEHOLDER value with your own profile details. */
export const siteConfig: SiteConfig = {
  name: 'PLACEHOLDER NAME',
  role: {
    en: 'PLACEHOLDER ROLE',
    th: 'PLACEHOLDER ตำแหน่ง',
  },
  bio: {
    en: 'PLACEHOLDER: Add a short introduction about yourself here.',
    th: 'PLACEHOLDER: เพิ่มคำแนะนำตัวสั้น ๆ ของคุณที่นี่',
  },
  email: 'hello@example.com',
  social: [
    { label: 'GitHub', url: 'https://github.com/your-username' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/your-username' },
  ],
  skills: [
    {
      name: 'PLACEHOLDER Skill',
      category: { en: 'PLACEHOLDER Category', th: 'PLACEHOLDER หมวดหมู่' },
    },
  ],
  languages: [
    {
      name: { en: 'English', th: 'ภาษาอังกฤษ' },
      level: { en: 'PLACEHOLDER level', th: 'PLACEHOLDER ระดับ' },
    },
    {
      name: { en: 'Thai', th: 'ภาษาไทย' },
      level: { en: 'PLACEHOLDER level', th: 'PLACEHOLDER ระดับ' },
    },
  ],
};

export const sectionLabels: Record<Locale, Record<string, string>> = {
  en: {
    about: 'About',
    projects: 'Projects',
    experiences: 'Experiences',
    educations: 'Educations',
    certificates: 'Certificates',
    skills: 'Skills',
    languages: 'Languages',
    social: 'Social links',
    technologies: 'Technologies',
    liveProject: 'Live project',
    repository: 'Repository',
    viewCertificate: 'View certificate',
  },
  th: {
    about: 'เกี่ยวกับฉัน',
    projects: 'ผลงาน',
    experiences: 'ประสบการณ์',
    educations: 'การศึกษา',
    certificates: 'ใบรับรอง',
    skills: 'ทักษะ',
    languages: 'ภาษา',
    social: 'ลิงก์โซเชียล',
    technologies: 'เทคโนโลยี',
    liveProject: 'ดูผลงาน',
    repository: 'ซอร์สโค้ด',
    viewCertificate: 'ดูใบรับรอง',
  },
};
