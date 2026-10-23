import saved from '../content/site.json';

type Localized<T> = Record<'mk' | 'en', T>;
interface ServiceCopy { title: string; short: string; description: string; scope: string[] }
interface SiteContent {
  home: Localized<{ tagline: string; imageAlt: string }> & { image: string };
  about: Localized<{ aboutTitle: string; aboutBody: string; certificatesTitle: string; certificatesBody: string }>;
  services: Record<'metal-structures' | 'machine-maintenance' | 'gas-pipelines', Localized<ServiceCopy>>;
  business: Localized<{ note?: string }> & { email: string };
  gallery: (Localized<{ title: string; description?: string }> & {
    kind: 'image' | 'video'; image: string; video?: string; visible: boolean; illustrative: boolean;
  })[];
}

// The build validates this file before rendering; optional editor fields stay optional.
export default saved as SiteContent;
