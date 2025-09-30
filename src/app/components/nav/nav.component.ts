import { Component } from '@angular/core';
import { DomainConfigService, SiteConfig } from '@services/domain-config.service';

@Component({
  selector: 'sd-nav',
  standalone: true,
  imports: [],
  template: `
    <nav class="sd-nav">
      <a class="nav-button active" [href]="siteConfig.activeHref">{{ siteConfig.activeLabel }}</a>
      <span class="nav-button">{{ siteConfig.inactiveLabel }}</span>
    </nav>
  `
})
export class NavComponent {
  siteConfig: SiteConfig;

  constructor(private domainService: DomainConfigService) {
    this.siteConfig = this.domainService.getConfig();
  }
}
