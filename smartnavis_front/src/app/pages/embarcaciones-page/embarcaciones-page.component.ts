import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BienesPageComponent } from '../bienes-page/bienes-page.component';
import { Embarcacion } from '../../interfaces/embarcacion';
import { EmbarcacionService } from '../../services/embarcacion/embarcacion.service';

@Component({
  selector: 'app-embarcaciones-page',
  standalone: true,
  imports: [RouterLink, AppPageComponent, NgFor, NgIf, FormsModule],
  templateUrl: './embarcaciones-page.component.html',
  styleUrl: './embarcaciones-page.component.scss',
})
export class EmbarcacionesPageComponent extends BienesPageComponent<Embarcacion> {
  constructor(protected override bienService: EmbarcacionService) {
    super(bienService);
  }
}
