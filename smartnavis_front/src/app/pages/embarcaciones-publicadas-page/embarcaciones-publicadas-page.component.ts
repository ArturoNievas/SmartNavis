import { Component } from '@angular/core';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { NgFor, NgIf } from '@angular/common';
import { mockups } from '../../shared/mockups';
import { CardDePublicacionComponent } from '../../shared/components/card-de-publicacion/card-de-publicacion.component';
import { FormControl, FormsModule, NgModel } from '@angular/forms';

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
  imports: [
    NgFor,
    NgIf,
    AppPageComponent,
    CardDePublicacionComponent,
    FormsModule,
  ],
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
