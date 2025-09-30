import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { DomainConfigService, SiteConfig } from '@services/domain-config.service';

@Component({
  selector: 'sd-nav',
  standalone: true,
  imports: [NgIf],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  siteConfig: SiteConfig;

  constructor(private domainService: DomainConfigService) {
    this.siteConfig = this.domainService.getConfig();
  }
}
