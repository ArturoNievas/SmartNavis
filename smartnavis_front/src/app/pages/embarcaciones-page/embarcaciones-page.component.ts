import { Component, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Embarcacion } from '../../interfaces/embarcacion';
import { EmbarcacionService } from '../../services/embarcacion/embarcacion.service';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { generateMockups, mockups } from '../../shared/mockups';
import { Publicacion } from '../../interfaces/publicacion';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-embarcaciones-page',
  standalone: true,
  imports: [RouterLink, AppPageComponent, NgFor, NgIf, NgModel],
  templateUrl: './embarcaciones-page.component.html',
  styleUrl: './embarcaciones-page.component.scss'
})
export class EmbarcacionesPageComponent {
  
  
  public embarcaciones: Embarcacion[] = [];

  public embarcacionSeleccionada: any = null;
  public nuevaPublicacion = {
    titulo: "",
    descripcion: ""
  }


  /* MÉTODOS */
  constructor(private embarcacionService: EmbarcacionService) {}

  ngOnInit(): void {
    this.listarEmbarcaciones();
    console.log('Embarcaciones:', this.embarcaciones)
  }

  public listarEmbarcaciones(): void {
    this.embarcaciones = generateMockups(mockups.embarcacion, 10);
    
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

  public abrirFormularioDePublicacion(embarcacion: Embarcacion): void {
    this.embarcacionSeleccionada = embarcacion;    
  }

  public publicarEmbarcacion(a: any): void {
    console.log(a)
  }
}
