import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { DomainConfigService, SiteConfig } from '@services/domain-config.service';

@Component({
  selector: 'sd-nav',
  standalone: true,
  imports: [NgIf],
  template: `
    <nav class="sd-nav">
      <a
        *ngIf="siteConfig.lsIsActive"
        class="nav-button active"
        href="https://legendarysisters.com"
      >
        Legendary Sisters
      </a>
      <span
        *ngIf="!siteConfig.lsIsActive"
        class="nav-button"
      >
        Legendary Sisters
      </span>

      <a
        *ngIf="siteConfig.sdIsActive"
        class="nav-button active"
        href="https://studiodoggebi.com"
      >
        Studio Doggebi
      </a>
      <span
        *ngIf="!siteConfig.sdIsActive"
        class="nav-button"
      >
        Studio Doggebi
      </span>
    </nav>
  `
})
export class NavComponent {
  siteConfig: SiteConfig;

  constructor(private domainService: DomainConfigService) {
    this.siteConfig = this.domainService.getConfig();
  }
}
