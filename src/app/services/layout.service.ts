import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOMAIN_CONFIG } from '../config/domain-config.token';   // only the token
import { DomainConfig, SectionId } from '../types/section';      // types live here

@Injectable({ providedIn: 'root' })

export class LayoutService {
  private cfg = inject<DomainConfig>(DOMAIN_CONFIG);
  private router = inject(Router);

  private _section = signal<SectionId>(this.cfg.defaultSection);
  section = this._section.asReadonly();

  masthead = signal(this.cfg.sections[this.cfg.defaultSection].masthead);
  altDomain = signal(this.cfg.sections[this.cfg.defaultSection].domain);

  nav = signal<{ label: string; url: string; disabled: boolean }[]>(
    this.cfg.order.map(id => ({
      label: this.cfg.sections[id].label,
      url: id === this._section() ? '/' : `https://www.${this.cfg.sections[id].domain}`,
      disabled: id === this._section()
    }))
  );

  private sectionFromHost(): SectionId {
    const host = (typeof window !== 'undefined' ? window.location.host : '').toLowerCase();
    const hit = this.cfg.order.find(id =>
      host.endsWith(this.cfg.sections[id].domain.toLowerCase())
    );
    return hit ?? this.cfg.defaultSection;
  }

constructor() {
  const current = this.sectionFromHost();

  this._section.set(current);
  this.masthead.set(this.cfg.sections[current].masthead);

  const other = this.cfg.order.find(id => id !== current)!;
  this.altDomain.set(this.cfg.sections[other].domain);

  // Nav: current brand -> '/', others -> absolute https links
  this.nav.set(
    this.cfg.order.map(id => ({
      label: this.cfg.sections[id].label,
      url:   id === current ? '/' : `https://www.${this.cfg.sections[id].domain}`,
      disabled: id === current
    }))
  );
}

}
