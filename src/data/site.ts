export type Locale = 'en' | 'th';

export type LocalizedText = Record<Locale, string>;

export interface SiteConfig {
  name: LocalizedText;
  role: LocalizedText;
  bio: LocalizedText;
  email: string;
  social: Array<{ label: string; url: string }>;
  skills: Array<{ name: string; category: LocalizedText }>;
  languages: Array<{ name: LocalizedText; level: LocalizedText }>;
}

export const siteConfig: SiteConfig = {
  name: {
    en: 'Palat Tungsantitham',
    th: 'Palat Tungsantitham',
  },
  role: {
    en: 'Software Engineer',
    th: 'Software Engineer',
  },
  bio: {
    en: 'Software Engineer with 3+ years of experience building and maintaining web applications. Experienced in designing features from requirements, integrating services such as LINE and Microsoft Graph, and bringing AI capabilities into web apps. Worked across frontend and backend using C#, .NET, TypeScript, NestJS, Next.js, Angular, SQL Server, MySQL, and PostgreSQL.',
    th: 'วิศวกรซอฟต์แวร์ที่มีประสบการณ์กว่า 3 ปีในการพัฒนาและดูแลเว็บแอปพลิเคชัน ออกแบบฟีเจอร์ตามความต้องการ เชื่อมต่อบริการอย่าง LINE และ Microsoft Graph รวมถึงนำ AI มาใช้ในเว็บแอป มีประสบการณ์ทั้งงาน Frontend และ Backend ด้วย C#, .NET, TypeScript, NestJS, Next.js, Angular, SQL Server, MySQL และ PostgreSQL',
  },
  email: 'palat.tungsantitham@gmail.com',
  social: [
    { label: 'GitHub', url: 'https://github.com/pxndpalat' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/palat-tungsantitham-340528290' },
  ],
  skills: [
    { name: 'C# / .NET', category: { en: 'Backend development', th: 'พัฒนา Backend' } },
    { name: 'TypeScript / NestJS', category: { en: 'Backend development', th: 'พัฒนา Backend' } },
    { name: 'Next.js / Angular', category: { en: 'Frontend development', th: 'พัฒนา Frontend' } },
    { name: 'SQL Server / MySQL / PostgreSQL', category: { en: 'Databases', th: 'ฐานข้อมูล' } },
    {
      name: 'System integration',
      category: {
        en: 'LINE, Microsoft Graph, and AI services',
        th: 'เชื่อมต่อ LINE, Microsoft Graph และบริการ AI',
      },
    },
  ],
  languages: [
    { name: { en: 'English', th: 'ภาษาอังกฤษ' }, level: { en: 'Basic', th: 'Basic' } },
    { name: { en: 'Thai', th: 'ภาษาไทย' }, level: { en: 'Native', th: 'Native' } },
  ],
};

export const sectionLabels: Record<Locale, Record<string, string>> = {
  en: {
    about: 'About',
    projects: 'Projects',
    experiences: 'Experience',
    educations: 'Education',
    certificates: 'Certificates',
    skills: 'Skills',
    languages: 'Languages',
    social: 'Contact',
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
    social: 'ติดต่อ',
    technologies: 'เทคโนโลยี',
    liveProject: 'ดูผลงาน',
    repository: 'ซอร์สโค้ด',
    viewCertificate: 'ดูใบรับรอง',
  },
};
