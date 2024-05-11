import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-embarcaciones-page',
  standalone: true,
  imports: [SectionHeaderComponent],
  templateUrl: './embarcaciones-page.component.html',
  styleUrl: './embarcaciones-page.component.scss'
})
export class EmbarcacionesPageComponent {

}
