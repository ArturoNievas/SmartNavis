import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppPageComponent } from '../../shared/components/app-page/app-page.component';

import { mockups } from '../../shared/mockups';

const publicaciones = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  titulo: `Embarcación ${i + 1}`,
  descripcion: `Descripción de la embarcación ${i + 1}`,
  bien: mockups.embarcacion(i + 1),
  permutacionesSolicitadas: [],
}));

@Component({
  selector: 'app-embarcaciones-publicadas-page',
  standalone: true,
  imports: [NgFor, NgIf, AppPageComponent, FormsModule],
  templateUrl: './embarcaciones-publicadas-page.component.html',
  styleUrl: './embarcaciones-publicadas-page.component.scss',
})
export class EmbarcacionesPublicadasPageComponent {
  publicaciones: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.listarEmbarcacionesPublicadas();
  }

  public listarEmbarcacionesPublicadas(): void {
    this.publicaciones = publicaciones;
  }
}
