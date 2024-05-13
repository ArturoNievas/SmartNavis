import { Component } from '@angular/core';
import { AppPageComponent } from '../../components/app-page/app-page.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-embarcaciones-publicadas-page',
  standalone: true,
  imports: [NgFor, NgIf, AppPageComponent],
  templateUrl: './embarcaciones-publicadas-page.component.html',
  styleUrl: './embarcaciones-publicadas-page.component.scss'
})
export class EmbarcacionesPublicadasPageComponent {
  publicaciones: any[] = []

  constructor() {
  }
  
  ngOnInit(): void {
    this.listarEmbarcacionesPublicadas();
  }

  public listarEmbarcacionesPublicadas(): void {
    console.log('Listando embarcaciones publicadas')
  }


}
