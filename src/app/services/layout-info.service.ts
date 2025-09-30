import { Injectable, inject } from '@angular/core';
import { DOMAIN_CONFIG } from '../config/domain-config.token';
import { DomainConfig, SectionId } from '../types/section';

@Injectable({ providedIn: 'root' })
export class LayoutInfoService {
  private cfg = inject<DomainConfig>(DOMAIN_CONFIG);

  readonly currentSection: SectionId;
  readonly masthead: string;
  readonly altDomain: string;
  readonly nav: { label: string; url: string; disabled: boolean }[];

  // ✅ Brand flags for conditional logic
  readonly isLegendary: boolean;
  readonly isDoggebi: boolean;
  readonly flags: { lsIsActive: boolean; sdIsActive: boolean };

  constructor() {
    const host = window.location.hostname.toLowerCase();

    const current = this.cfg.order.find(id => {
      const domain = this.cfg.sections[id].domain.toLowerCase();
      return host === domain || host === `www.${domain}`;
    }) ?? this.cfg.defaultSection;

    this.currentSection = current;
    this.masthead = this.cfg.sections[current].masthead;

    const other = this.cfg.order.find(id => id !== current)!;
    this.altDomain = this.cfg.sections[other].domain;

    this.nav = this.cfg.order.map(id => ({
      label: this.cfg.sections[id].label,
      url: id === current ? '/' : `https://www.${this.cfg.sections[id].domain}`,
      disabled: id === current
    }));

    this.isLegendary = current === 'legendarysisters';
    this.isDoggebi = current === 'studiodoggebi';
    this.flags = {
      lsIsActive: this.isLegendary,
      sdIsActive: this.isDoggebi
    };
  }
}
