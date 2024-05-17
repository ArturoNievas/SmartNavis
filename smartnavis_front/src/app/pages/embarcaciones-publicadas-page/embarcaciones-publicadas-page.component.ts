import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppPageComponent } from '../../shared/components/app-page/app-page.component';

import { PublicacionService } from '../../services/publicacion/publicacion.service';
import { PublicacionEmbarcacionService } from '../../services/publicacionEmbarcacion/publicacion-embarcacion.service';

const publicaciones: any[] = [];

@Component({
  selector: 'app-embarcaciones-publicadas-page',
  standalone: true,
  imports: [NgFor, NgIf, AppPageComponent, FormsModule],
  templateUrl: './embarcaciones-publicadas-page.component.html',
  styleUrl: './embarcaciones-publicadas-page.component.scss',
})
export class EmbarcacionesPublicadasPageComponent {
  publicaciones: any[] = [];

  constructor(private publicacionService: PublicacionEmbarcacionService) {}

  ngOnInit(): void {
    this.listarPublicaciones();
  }

  public listarEmbarcacionesPublicadas(): void {
    this.publicaciones = publicaciones;
  }

  private listarPublicaciones(): void {
    this.publicacionService
      .listarPublicaciones()
      .subscribe((publicaciones: any[]) => {
        this.publicaciones = publicaciones;
      });
  }
}
