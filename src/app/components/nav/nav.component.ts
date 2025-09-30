import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { LayoutService } from '../../services/layout.service';

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
</nav>
  `,
  styles: [`
    .sd-nav{ display:flex; gap:16px; justify-content:center;
             padding:10px 0 12px; border-bottom:1px solid rgba(0,0,0,.2); }
    .sd-nav a{ padding:6px 10px; border-radius:6px; text-decoration:none; color:#222; }
    .sd-nav a.active{ background:#000; color:#fff; }   /* invert current */
    .sd-nav a.disabled{ pointer-events:none; opacity:1; } /* current link not clickable */
  `]
})
export class NavComponent {
  constructor(public layout: LayoutService) { }
}
