import { Component, Input } from '@angular/core';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-app-page',
  standalone: true,
  imports: [SectionHeaderComponent, RouterLink],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.scss',
})
export class AppPageComponent {
  @Input() public titulo?: string;
  @Input() public subtitulo?: string;

  constructor() {}
}
