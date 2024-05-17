import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppPageComponent } from '../../shared/components/app-page/app-page.component';

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

  constructor() {}

  ngOnInit(): void {
    this.listarEmbarcacionesPublicadas();
  }

  public listarEmbarcacionesPublicadas(): void {
    this.publicaciones = publicaciones;
  }
}
