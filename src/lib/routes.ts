import content from '../data/content';
export type Language = 'mk' | 'en';
export type Page = 'home' | 'services' | 'projects' | 'about' | 'contact' | 'quote' | 'privacy' | 'services/metal-structures' | 'services/machine-maintenance' | 'services/gas-pipelines' | `projects/${string}`;
export const pages: Page[] = ['home', 'services', 'services/metal-structures', 'services/machine-maintenance', 'services/gas-pipelines', 'projects', 'about', 'contact', 'quote', 'privacy', ...content.projects.filter(project => project.visible).map(project => `projects/${project.slug}` as const)];
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const asset = (path: string) => `${base}/${path.replace(/^\//, '')}`;
export const route = (page: Page | '404', lang: Language = 'mk') => `${base}/${lang === 'en' ? 'en/' : ''}${page === 'home' ? '' : `${page}/`}`;
export const absolute = (path: string) => new URL(path, import.meta.env.SITE).href;
