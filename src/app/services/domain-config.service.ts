import { Injectable } from '@angular/core';

export interface SiteConfig {
  masthead: string;
  lsIsActive: boolean;
  sdIsActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class DomainConfigService {
  private readonly domain = window.location.hostname.replace(/^www\./, '').toLowerCase();

  getConfig(): SiteConfig {
    const isLegendary = this.domain === 'legendarysisters.com';

    return {
      masthead: isLegendary ? 'Legendary Sisters' : 'Studio Doggebi',
      lsIsActive: !isLegendary, // LS is active when we're on SD
      sdIsActive: isLegendary   // SD is active when we're on LS
    };
  }
}
