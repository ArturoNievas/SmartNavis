import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    SectionHeaderComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
}
