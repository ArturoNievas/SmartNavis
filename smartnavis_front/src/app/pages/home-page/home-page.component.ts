import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';
import { AppPageComponent } from '../../components/app-page/app-page.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    SectionHeaderComponent,
    AppPageComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
}
