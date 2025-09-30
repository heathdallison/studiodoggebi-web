// src/app/services/domain-config.service.ts
import { Injectable } from '@angular/core';

export interface SiteConfig {
  masthead: string;
  navLink: {
    label: string;
    href: string;
  };
}

@Injectable({ providedIn: 'root' })
export class DomainConfigService {
  private readonly configMap: Record<string, SiteConfig> = {
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

  getConfig(): SiteConfig {
    const domain = window.location.hostname.replace(/^www\./, '');
    return this.configMap[domain] || this.configMap['studiodoggebi.com'];
  }
}
