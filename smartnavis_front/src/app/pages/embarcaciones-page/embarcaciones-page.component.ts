import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Embarcacion } from '../../interfaces/embarcacion';
import { EmbarcacionService } from '../../services/embarcacion/embarcacion.service';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';

import { FormsModule } from '@angular/forms';
import { Publicacion } from '../../interfaces/publicacion';

@Component({
  selector: 'app-embarcaciones-page',
  standalone: true,
  imports: [RouterLink, AppPageComponent, NgFor, NgIf, FormsModule],
  templateUrl: './embarcaciones-page.component.html',
  styleUrl: './embarcaciones-page.component.scss',
})
export class EmbarcacionesPageComponent {
  public embarcaciones: Embarcacion[] = [];

  public nuevaPublicacion: any = {
    titulo: '',
    descripcion: '',
    bien: undefined,
  };

  public mensajeFormulario?: {
    tipo: 'error' | 'exito';
    mensaje: string;
  };

  /* MÉTODOS */
  constructor(private embarcacionService: EmbarcacionService) {}

  ngOnInit(): void {
    this.listarEmbarcaciones();
  }

  private listarEmbarcaciones(): void {
    this.embarcacionService
      .listarEmbarcaciones()
      .subscribe((embarcaciones: Embarcacion[]) => {
        this.embarcaciones = embarcaciones;
      });
  }

  /* MÉTODOS DE PUBLICACIÓN */
  public abrirFormularioDePublicacion(embarcacion: Embarcacion): void {
    this.resetearMensajeFormulario();

    if (this.nuevaPublicacion.bien !== embarcacion) {
      this.resetearFormularioDePublicacion();
      this.nuevaPublicacion.bien = embarcacion;
    }
  }

  public cerrarFormularioDePublicacion(): void {
    this.resetearMensajeFormulario();
    this.nuevaPublicacion.bien = undefined;
  }

  public resetearFormularioDePublicacion(): void {
    this.nuevaPublicacion = {};
  }

  private resetearMensajeFormulario(): void {
    this.mensajeFormulario = undefined;
  }

  /* VALIDACIONES */
  public nuevaPublicacionEsValida(): boolean {
    return (
      this.validarTituloPublicacion(this.nuevaPublicacion?.titulo) &&
      this.validarDescripcionPublicacion(this.nuevaPublicacion?.descripcion)
    );
  }

  private validarTituloPublicacion(value: any): boolean {
    return Boolean(value);
  }

  private validarDescripcionPublicacion(value: any): boolean {
    return Boolean(value);
  }

  /* PUBLICACIÓN */
  public publicarEmbarcacion(): void {
    /* 
      - La embarcación debe estar habilitada para ser intercambiada.
      - El titular de la embarcación debe estar habilitado para intercambiar bienes.
      - Una embarcación no puede ser publicada más de una vez.
    */

    if (!this.nuevaPublicacion.bien) {
      throw new Error('no existe....'); // FIXME:
    }

    const nuevaPublicacion: Publicacion = {
      ...this.nuevaPublicacion,
      bien: this.nuevaPublicacion.bien,
    };

    this.embarcacionService.publicarEmbarcacion(nuevaPublicacion).subscribe({
      next: () => {
        this.nuevaPublicacion.bien!.publicada = true;

        this.resetearFormularioDePublicacion();
        this.cerrarFormularioDePublicacion();

        this.mensajeFormulario = {
          tipo: 'exito',
          mensaje: 'Embarcación publicada con éxito.',
        };
      },
      error: (error) => {
        console.error('Error al publicar embarcación.', error);

        this.mensajeFormulario = {
          tipo: 'error',
          mensaje: error,
        };
      },
    });
  }
}
