import { Component, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';

import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Embarcacion } from '../../interfaces/embarcacion';
import { EmbarcacionService } from '../../services/embarcacion/embarcacion.service';
import { AppPageComponent } from '../../components/app-page/app-page.component';


/* export interface Bien {
    id: number;
    titular: any;
    publicacion: any;
    habilitadoIntercambio: boolean;
} 
  


export interface Embarcacion extends Bien {
    matricula: string;
    nombre: string;
    eslora: number;
    calado: number;
    manga: number;
}
*/

const embarcacionesMockup = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  matricula: `MAT-${i + 1}`,
  nombre: `Embarcacion ${i + 1}`,
  eslora: 10 + i,
  calado: 5 + i,
  manga: 3 + i,
  habilitadoIntercambio: true,
  titular: null,
}))


@Component({
  selector: 'app-embarcaciones-page',
  standalone: true,
  imports: [RouterLink, AppPageComponent, NgFor, NgIf],
  templateUrl: './embarcaciones-page.component.html',
  styleUrl: './embarcaciones-page.component.scss'
})
export class EmbarcacionesPageComponent {
  public embarcaciones: Embarcacion[] = [];

  constructor(private embarcacionService: EmbarcacionService) {}

  ngOnInit(): void {
    this.listarEmbarcaciones();
    console.log('Embarcaciones:', this.embarcaciones)
  }

  public listarEmbarcaciones(): void {
    this.embarcaciones = embarcacionesMockup;
    
    /* this.embarcacionService.listarEmbarcaciones().subscribe((embarcaciones: Embarcacion[]) => {
      this.embarcaciones = embarcaciones;
    }); */
  }

  public crearEmbarcacion(embarcacion: Embarcacion): void {
    this.embarcacionService.crearEmbarcacion(embarcacion).subscribe((embarcacion: Embarcacion) => {
      const index: number = this.embarcaciones.indexOf(embarcacion);
      if (index === -1) {
        this.embarcaciones.push(embarcacion);
      }
    });
  }

  public actualizarEmbarcacion(embarcacion: Embarcacion): void {
    // TODO: Implementar
  }

  public eliminarEmbarcacion(embarcacion: Embarcacion): void {
    this.embarcacionService.eliminarEmbarcacion(embarcacion).subscribe(() => {
      const index: number = this.embarcaciones.indexOf(embarcacion);
      
      if (index > -1) {
        this.embarcaciones.splice(index, 1);
      }
    })
  }
}
