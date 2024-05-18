import { Component } from '@angular/core';
import { PublicacionService } from '../../services/publicacion/publicacion.service';
import { NgFor, NgIf } from '@angular/common';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { FormsModule } from '@angular/forms';
import { Bien } from '../../interfaces/bien';
import { Publicacion } from '../../interfaces/publicacion';

export enum EstadoFormulario {
  Modificar = 'modificar',
  Intercambiar = 'intercambiar',
  Eliminar = 'eliminar',
}

@Component({
  selector: 'app-publicaciones-page',
  standalone: true,
  imports: [NgFor, NgIf, AppPageComponent, FormsModule],
  templateUrl: './publicaciones-page.component.html',
  styleUrl: './publicaciones-page.component.scss',
})
export class PublicacionesPageComponent {
  publicaciones: any[] = [];
  titulo?: string;

  estados: typeof EstadoFormulario = EstadoFormulario;

  public publicacionSeleccionada?: undefined | Publicacion;
  public publicacionModificada?: undefined | Publicacion;

  estadoFormulario: undefined | EstadoFormulario;

  mensajeFormulario?: {
    tipo: 'error' | 'exito';
    mensaje: string;
  };

  constructor(private publicacionService: PublicacionService) {
    this.titulo = 'Publicaciones';
  }

  ngOnInit(): void {
    this.listarPublicaciones();
  }

  listarPublicaciones(): void {
    this.publicacionService
      .listarPublicaciones()
      .subscribe((publicaciones: any[]) => {
        this.publicaciones = publicaciones;
        console.log(this.publicaciones);
      });
  }

  seleccionarPublicacion(publicacion: Publicacion): void {
    this.publicacionSeleccionada = publicacion;
    this.publicacionModificada = { ...publicacion };
  }

  abrirFormulario(estado: EstadoFormulario, publicacion: Publicacion): void {
    this.resetearMensajeFormulario();

    this.estadoFormulario = estado;
    if (this.publicacionSeleccionada !== publicacion) {
      this.resetearFormulario();
      this.seleccionarPublicacion(publicacion);
    }
  }

  cerrarFormulario(): void {
    this.resetearMensajeFormulario();

    this.publicacionSeleccionada = undefined;
    this.publicacionModificada = undefined;
    this.estadoFormulario = undefined;
  }

  resetearFormulario(): void {
    this.publicacionModificada = undefined;
  }

  resetearMensajeFormulario(): void {
    this.mensajeFormulario = undefined;
  }

  /* MODIFICAR PUBLICACION */
  private validarModificacion(value: any): boolean {
    return Boolean(value);
  }
  publicacionModificadaEsValida(): boolean {
    return (
      this.validarModificacion(this.publicacionModificada?.titulo) &&
      this.validarModificacion(this.publicacionModificada?.descripcion) &&
      this.hayCambios(this.publicacionSeleccionada, this.publicacionModificada)
    );
  }

  private hayCambios(anterior: any, actual: any): boolean {
    return (
      anterior.titulo.trim() !== actual.titulo.trim() ||
      anterior.descripcion.trim() !== actual.descripcion.trim()
    );
  }

  modificarPublicacion(): void {
    if (!this.publicacionSeleccionada) {
      throw new Error('No existe publicación seleccionada'); // TODO: Fix this
    }

    const manejadorTimeout = crearManejadorTimeout();

    this.publicacionService
      .actualizarPublicacion(this.publicacionModificada!)
      .subscribe({
        next: () => {
          const modificada = this.publicaciones.findIndex(
            (publicacion) => publicacion.id === this.publicacionModificada?.id,
          );
          this.publicaciones[modificada] = { ...this.publicacionModificada };

          this.resetearFormulario();
          this.cerrarFormulario();

          this.mensajeFormulario = {
            tipo: 'exito',
            mensaje: 'Publicación modificada correctamente',
          };
          manejadorTimeout.limpiarTimeout();
          manejadorTimeout.establecerTimeout(() => {
            this.mensajeFormulario = undefined;
          }, 10000);
        },
        error: (error) => {
          console.error('Error al publicar bien.', error);
          this.mensajeFormulario = {
            tipo: 'error',
            mensaje: error,
          };
        },
      });
  }

  /* INTERCAMBIAR PUBLICACION */
  intercambiarPublicacion() {}

  /* ELIMINAR PUBLICACION */
  eliminarPublicacion(): void {
    if (!this.publicacionSeleccionada) {
      throw new Error('No existe publicación seleccionada');
    }

    const manejadorTimeout = crearManejadorTimeout();

    this.publicacionService
      .eliminarPublicacion(this.publicacionSeleccionada)
      .subscribe({
        next: () => {
          const eliminada = this.publicaciones.findIndex(
            (publicacion) =>
              publicacion.id === this.publicacionSeleccionada?.id,
          );
          this.publicaciones.splice(eliminada, 1);

          this.resetearFormulario();
          this.cerrarFormulario();

          this.mensajeFormulario = {
            tipo: 'exito',
            mensaje: 'Publicación eliminada correctamente',
          };
          manejadorTimeout.limpiarTimeout();
          manejadorTimeout.establecerTimeout(() => {
            this.mensajeFormulario = undefined;
          }, 10000);
        },
        error: (error) => {
          console.error('Error al eliminar publicación.', error);
          this.mensajeFormulario = {
            tipo: 'error',
            mensaje: error,
          };
        },
      });
  }
}

const crearManejadorTimeout = () => {
  let timeoutId: any;

  return {
    establecerTimeout: (callback: () => void, delay: number) => {
      timeoutId = setTimeout(callback, delay);
    },
    limpiarTimeout: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    },
  };
};
