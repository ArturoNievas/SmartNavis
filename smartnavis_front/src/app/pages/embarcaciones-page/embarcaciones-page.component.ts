import { Component, OnInit } from '@angular/core';

import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Embarcacion } from '../../interfaces/embarcacion';
import { EmbarcacionService } from '../../services/embarcacion/embarcacion.service';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { generateMockups, mockups } from '../../shared/mockups';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-embarcaciones-page',
  standalone: true,
  imports: [RouterLink, AppPageComponent, NgFor, NgIf, FormsModule],
  templateUrl: './embarcaciones-page.component.html',
  styleUrl: './embarcaciones-page.component.scss',
})
export class EmbarcacionesPageComponent {
  public embarcaciones: Embarcacion[] = [];

  public embarcacionSeleccionada?: any;
  public nuevaPublicacion?: any = {};

  /* MÉTODOS */
  constructor(private embarcacionService: EmbarcacionService) {}

  ngOnInit(): void {
    this.listarEmbarcaciones();
  }

  public listarEmbarcaciones(): void {
    this.embarcaciones = generateMockups(mockups.embarcacion, 10);

    /* this.embarcacionService.listarEmbarcaciones().subscribe((embarcaciones: Embarcacion[]) => {
      this.embarcaciones = embarcaciones;
    }); */
  }

  public crearEmbarcacion(embarcacion: Embarcacion): void {
    this.embarcacionService
      .crearEmbarcacion(embarcacion)
      .subscribe((embarcacion: Embarcacion) => {
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
    });
  }

  public abrirFormularioDePublicacion(embarcacion: Embarcacion): void {
    this.embarcacionSeleccionada = embarcacion;
  }

  public cerrarFormularioDePublicacion(): void {
    this.embarcacionSeleccionada = null;
  }

  public publicarEmbarcacion(): void {}

  public nuevaPublicacionEsValida(): boolean {
    return (
      this.validarTituloPublicacion(this.nuevaPublicacion.titulo) &&
      this.validarDescripcionPublicacion(this.nuevaPublicacion.descripcion)
    );
  }

  private validarTituloPublicacion(value: string): boolean {
    return Boolean(value);
  }

  private validarDescripcionPublicacion(value: string): boolean {
    return Boolean(value) && value.length > 10;
  }
}
