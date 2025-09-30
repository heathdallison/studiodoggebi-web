import { Injectable } from '@angular/core';

export interface SiteConfig {
  masthead: string;
  currentLabel: string;
  otherLabel: string;
  otherHref: string;
}

@Injectable({ providedIn: 'root' })
export class DomainConfigService {
  private readonly configMap: Record<string, SiteConfig> = {
    'studiodoggebi.com': {
      masthead: 'Studio Doggebi',
      currentLabel: 'Studio Doggebi',
      otherLabel: 'Legendary Sisters',
      otherHref: 'https://legendarysisters.com',
    },
    'legendarysisters.com': {
      masthead: 'Legendary Sisters',
      currentLabel: 'Legendary Sisters',
      otherLabel: 'Studio Doggebi',
      otherHref: 'https://studiodoggebi.com',
    },
  };

  getConfig(): SiteConfig {
    const domain = window.location.hostname.replace(/^www\./, '');

    // Force consistent key match
    const normalizedDomain = domain.toLowerCase();

    // Lock fallback to Studio Doggebi
    return this.configMap[normalizedDomain] || this.configMap['studiodoggebi.com'];
  }

}
