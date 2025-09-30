import { Component } from '@angular/core';
import { MastheadComponent } from './components/masthead/masthead.component';
import { NavComponent } from './components/nav/nav.component';
import { BodyComponent } from './components/body/body.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MastheadComponent, NavComponent, BodyComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}
