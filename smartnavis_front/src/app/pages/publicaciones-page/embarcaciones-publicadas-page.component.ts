import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppPageComponent } from '../../shared/components/app-page/app-page.component';

import { PublicacionEmbarcacionService } from '../../services/publicacionEmbarcacion/publicacion-embarcacion.service';
import { PublicacionesPageComponent } from './publicaciones-page.component';
import { PublicacionService } from '../../services/publicacion/publicacion.service';

@Component({
  selector: 'app-embarcaciones-publicadas-page',
  standalone: true,
  imports: [NgFor, NgIf, AppPageComponent, FormsModule],
  templateUrl: '../publicaciones-page/publicaciones-page.component.html',
  styleUrl: '../publicaciones-page/publicaciones-page.component.scss',
})
export class EmbarcacionesPublicadasPageComponent extends PublicacionesPageComponent {
  constructor(
    publicacionService: PublicacionService,
    publicacionEmbarcacionService: PublicacionEmbarcacionService
  ) {
    super(publicacionService, publicacionEmbarcacionService);
    this.titulo = 'Embarcaciones Publicadas';
  }

  protected override listarPublicacionesSolicitables(): void {
    this.publicacionesSolicitables = this.publicacionesEmbarcaciones;
  }
}
