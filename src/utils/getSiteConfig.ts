export interface SiteConfig {
  masthead: string;
  navLink: {
    label: string;
    href: string;
  };
}

export function getSiteConfig(hostname: string): SiteConfig {
  const domain = hostname.replace(/^www\./, '');

  const config: Record<string, SiteConfig> = {
    'studiodoggebi.com': {
      masthead: 'Studio Doggebi',
      navLink: {
        label: 'Legendary Sisters',
        href: 'https://www.legendarysisters.com',
      },
    },
    'legendarysisters.com': {
      masthead: 'Legendary Sisters',
      navLink: {
        label: 'Studio Doggebi',
        href: 'https://www.studiodoggebi.com',
      },
    },
  };

  return config[domain] || config['studiodoggebi.com'];
}
