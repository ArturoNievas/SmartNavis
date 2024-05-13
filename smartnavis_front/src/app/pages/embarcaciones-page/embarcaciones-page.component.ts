import { Component, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';

import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Embarcacion } from '../../interfaces/embarcacion';
import { EmbarcacionService } from '../../services/embarcacion/embarcacion.service';
import { AppPageComponent } from '../../components/app-page/app-page.component';


const embarcacionesMockup = Array.from({ length: 4 }).map((_, i) => ({
  matricula: `matricula-${i}`,
  nombre: `nombre-${i}`,
  eslora: 0,
  calado: 0,
  manga: 0
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
