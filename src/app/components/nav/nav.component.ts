import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { LayoutService } from '../../services/layout.service';
import { DomainConfigService, SiteConfig } from '../../services/domain-config.service';

@Component({
  selector: 'sd-nav',
  standalone: true,
  imports: [RouterLink, NgFor, NgClass, NgIf],
  template: `
<nav class="sd-nav">
  <ng-container *ngFor="let item of layout.nav()">
    <!-- Internal route -->
    <a *ngIf="item.url?.startsWith('/')"
       [routerLink]="item.url"
       [ngClass]="{ active: item.disabled, disabled: item.disabled }">
      {{ item.label }}
    </a>

    <!-- External link -->
    <a *ngIf="!item.url?.startsWith('/')"
       [attr.href]="item.url"
       [ngClass]="{ active: item.disabled, disabled: item.disabled }">
      {{ item.label }}
    </a>
  </ng-container>

  <!-- Domain switch link -->
  <a [href]="siteConfig.navLink.href">{{ siteConfig.navLink.label }}</a>
</nav>
  `,
  styles: [`
    .sd-nav{ display:flex; gap:16px; justify-content:center;
             padding:10px 0 12px; border-bottom:1px solid rgba(0,0,0,.2); }
    .sd-nav a{ padding:6px 10px; border-radius:6px; text-decoration:none; color:#222; }
    .sd-nav a.active{ background:#000; color:#fff; }
    .sd-nav a.disabled{ pointer-events:none; opacity:1; }
  `]
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
