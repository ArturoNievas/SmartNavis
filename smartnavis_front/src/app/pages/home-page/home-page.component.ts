import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { allPages } from '../../config/app.routes';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, SectionHeaderComponent, AppPageComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  public allPages = allPages;

  constructor() {}
}
