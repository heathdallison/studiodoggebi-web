import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sd-nav',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  @Input() nav: { label: string; url: string; disabled?: boolean; external?: boolean }[] = [];
}
