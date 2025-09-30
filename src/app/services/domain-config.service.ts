import { Injectable } from '@angular/core';

export interface SiteConfig {
  masthead: string;
  activeLabel: string;
  activeHref: string;
  inactiveLabel: string;
}

@Injectable({ providedIn: 'root' })
export class DomainConfigService {
  private readonly configMap: Record<string, SiteConfig> = {
    'studiodoggebi.com': {
      masthead: 'Studio Doggebi',
      activeLabel: 'Studio Doggebi',
      activeHref: 'https://studiodoggebi.com',
      inactiveLabel: 'Legendary Sisters',
    },
    'legendarysisters.com': {
      masthead: 'Legendary Sisters',
      activeLabel: 'Legendary Sisters',
      activeHref: 'https://legendarysisters.com',
      inactiveLabel: 'Studio Doggebi',
    },
  };

  getConfig(): SiteConfig {
    const domain = window.location.hostname.replace(/^www\./, '').toLowerCase();
    return this.configMap[domain] || this.configMap['studiodoggebi.com'];
  }
}
