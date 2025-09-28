import { Injectable, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
      url:   this.cfg.sections[id].path,
      disabled: id === this._section()
    }))
  );

  constructor() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const current =
        this.cfg.order.find(id => this.router.url.startsWith(this.cfg.sections[id].path))
        ?? this.cfg.defaultSection;

      this._section.set(current);
      this.masthead.set(this.cfg.sections[current].masthead);

      // altDomain = the OTHER section's domain (first one in order that isn't current)
      const other = this.cfg.order.find(id => id !== current)!;
      this.altDomain.set(this.cfg.sections[other].domain);

      this.nav.set(
        this.cfg.order.map(id => ({
          label: this.cfg.sections[id].label,
          url:   this.cfg.sections[id].path,
          disabled: id === current
        }))
      );
    });
  }
}
