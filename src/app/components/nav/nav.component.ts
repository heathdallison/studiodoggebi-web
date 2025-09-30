import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';
import { LayoutService } from '../../services/layout.service';
import { DomainConfigService, SiteConfig } from '../../services/domain-config.service';

@Component({
  selector: 'sd-nav',
  standalone: true,
  imports: [RouterLink, NgFor, NgClass],
  template: `
<nav class="sd-nav">
  <a *ngFor="let item of layout.nav()"
     [routerLink]="item.url?.startsWith('/') ? item.url : null"
     [attr.href]="!item.url?.startsWith('/') ? item.url : null"
     [ngClass]="{ active: item.disabled, disabled: item.disabled }">
    {{ item.label }}
  </a>
  <a [href]="siteConfig.navLink.href">{{ siteConfig.navLink.label }}</a>
</nav>
  `,
  styles: [/* same styles */]
})
export class NavComponent {
  siteConfig: SiteConfig;

  constructor(
    public layout: LayoutService,
    private domainService: DomainConfigService
  ) {
    this.siteConfig = this.domainService.getConfig();
  }
}
