import { Injectable, inject } from '@angular/core';
import { DOMAIN_CONFIG } from '../config/domain-config.token';
import { DomainConfig, SectionId } from '../Models/interfaces';

@Injectable({ providedIn: 'root' })
export class LayoutInfoService {
  private cfg: DomainConfig;

  readonly currentSection: SectionId;
  readonly masthead: string;
  readonly altDomain: string;
  readonly nav: { label: string; url: string; disabled: boolean; external: boolean }[];

  readonly isLegendary: boolean;
  readonly isDoggebi: boolean;
  readonly flags: { lsIsActive: boolean; sdIsActive: boolean };

  constructor() {
    this.cfg = inject(DOMAIN_CONFIG); // ✅ now inside valid context

    const host = window.location.hostname.toLowerCase();
    console.log('[LayoutInfo] Host:', host);

    const hostToSection: Record<string, SectionId> = {
      'legendarysisters.com': 'legendarysisters',
      'www.legendarysisters.com': 'legendarysisters',
      'studiodoggebi.com': 'studiodoggebi',
      'www.studiodoggebi.com': 'studiodoggebi',
      'localhost': this.cfg.defaultSection,
    };

    const current = hostToSection[host] ?? this.cfg.defaultSection;
    console.log('[LayoutInfo] Resolved section:', current);

    this.currentSection = current;
    this.masthead = this.cfg.sections[current].masthead;

    const other = this.cfg.order.find(id => id !== current)!;
    this.altDomain = this.cfg.sections[other].domain;

    this.nav = this.cfg.order.map(id => ({
      label: this.cfg.sections[id].label,
      url: id === current ? '/' : `https://www.${this.cfg.sections[id].domain}`,
      disabled: id === current,
      external: id !== current // ✅ explicitly mark external links
    }));

    this.isLegendary = current === 'legendarysisters';
    this.isDoggebi = current === 'studiodoggebi';
    this.flags = {
      lsIsActive: this.isLegendary,
      sdIsActive: this.isDoggebi
    };
  }
}
