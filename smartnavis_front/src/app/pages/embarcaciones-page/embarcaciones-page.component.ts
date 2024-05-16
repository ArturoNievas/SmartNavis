import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import {NgIf, NgFor} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Embarcacion} from '../../interfaces/embarcacion';
import {EmbarcacionService} from '../../services/embarcacion/embarcacion.service';
import {AppPageComponent} from '../../shared/components/app-page/app-page.component';
import {generateMockups, mockups} from '../../shared/mockups';

import {FormsModule} from '@angular/forms';
import {Publicacion} from '../../interfaces/publicacion';

const embarcacionesPublicadas: any[] = [];

@Component({
  selector: 'app-embarcaciones-page',
  standalone: true,
  imports: [RouterLink, AppPageComponent, NgFor, NgIf, FormsModule],
  templateUrl: './embarcaciones-page.component.html',
  styleUrl: './embarcaciones-page.component.scss',
})
export class EmbarcacionesPageComponent {
  public embarcaciones: Embarcacion[] = [];

  public embarcacionSeleccionada?: Embarcacion;
  public nuevaPublicacion?: any = {};

  public mensajeFormulario?: {
    tipo: 'error' | 'exito';
    mensaje: string;
  };

  /* MÉTODOS */
  constructor(private embarcacionService: EmbarcacionService) {
  }

  ngOnInit(): void {
    this.listarEmbarcaciones();
  }

  public listarEmbarcaciones(): void {
    this.embarcacionService.listarEmbarcaciones().subscribe((embarcaciones: Embarcacion[]) => {
      this.embarcaciones = embarcaciones;
    });
  }

  public abrirFormularioDePublicacion(embarcacion: Embarcacion): void {
    this.embarcacionSeleccionada = embarcacion;
  }

  public cerrarFormularioDePublicacion(): void {
    this.embarcacionSeleccionada = undefined;
  }

  public resetearFormularioDePublicacion(): void {
    this.nuevaPublicacion = {};
  }

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

  public publicarEmbarcacion(): void {
    if (!this.embarcacionSeleccionada) {
      throw new Error("no existe...."); // FIXME:
    }
    const nuevaPublicacion: Publicacion = {
      titulo: this.nuevaPublicacion.titulo,
      descripcion: this.nuevaPublicacion.descripcion,
      bien: this.embarcacionSeleccionada,
    };

    /* Publicar embarcación */
    //embarcacionesPublicadas.push();
    this.embarcacionService.publicarEmbarcacion(nuevaPublicacion).subscribe(() => {
      this.embarcacionSeleccionada!.publicada = true;

      const index = this.embarcaciones.findIndex(
        (embarcacion) => embarcacion.id === this.embarcacionSeleccionada?.id,
      );
      //this.embarcaciones.splice(index, 1);

      this.mensajeFormulario = {
        tipo: 'exito',
        mensaje: 'Embarcación publicada con éxito.',
      };

      this.resetearFormularioDePublicacion();
      this.cerrarFormularioDePublicacion();
    }, (error) => {
      console.error('Error al publicar embarcación.', error);

      this.mensajeFormulario = {
        tipo: 'error',
        mensaje: 'Error al publicar embarcación Inténtelo de nuevo más tarde. ' + error,
      };
    });
  }
}
