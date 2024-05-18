import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppPageComponent } from '../../shared/components/app-page/app-page.component';

import { PublicacionEmbarcacionService } from '../../services/publicacionEmbarcacion/publicacion-embarcacion.service';
import { PublicacionesPageComponent } from './publicaciones-page.component';
import { BienService } from '../../services/bien/bien.service';
import { Embarcacion } from '../../interfaces/embarcacion';

@Component({
  selector: 'app-embarcaciones-publicadas-page',
  standalone: true,
  imports: [NgFor, NgIf, AppPageComponent, FormsModule],
  templateUrl: '../publicaciones-page/publicaciones-page.component.html',
  styleUrl: '../publicaciones-page/publicaciones-page.component.scss',
})
export class EmbarcacionesPublicadasPageComponent extends PublicacionesPageComponent {
  constructor(
    publicacionService: PublicacionEmbarcacionService,
    bienService: BienService<Embarcacion>
  ) {
    super(publicacionService, bienService);
    this.titulo = 'Embarcaciones Publicadas';
  }
}
