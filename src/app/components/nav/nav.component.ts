import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DomainConfigService, SiteConfig } from '@services/domain-config.service';

@Component({
  selector: 'sd-nav',
  standalone: true,
  imports: [NgFor],
  template: `
    <nav class="sd-nav">
      <ng-container *ngFor="let button of siteConfig.buttons">
        <a
          *ngIf="button.isActive"
          class="nav-button active"
          [href]="button.href"
        >
          {{ button.label }}
        </a>
        <span
          *ngIf="!button.isActive"
          class="nav-button"
        >
          {{ button.label }}
        </span>
      </ng-container>
    </nav>
  `
})
export class NavComponent {
  siteConfig: SiteConfig;

  constructor(private domainService: DomainConfigService) {
    this.siteConfig = this.domainService.getConfig();
  }
}
