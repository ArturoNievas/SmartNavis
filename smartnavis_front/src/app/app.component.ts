import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SectionHeaderComponent } from './components/section-header/section-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smartnavis_front';
}
