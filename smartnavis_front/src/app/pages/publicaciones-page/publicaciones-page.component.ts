import { Component, OnInit } from '@angular/core';
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

const bienAdapter = (bien: Bien | any): Bien => {
  const __dominio = bien?.patente || bien?.partida || bien?.matricula;
  return { ...bien, __dominio };
};

@Component({
  selector: 'app-publicaciones-page',
  standalone: true,
  imports: [NgFor, NgIf, AppPageComponent, FormsModule],
  templateUrl: './publicaciones-page.component.html',
  styleUrls: ['./publicaciones-page.component.scss'],
})
export class PublicacionesPageComponent implements OnInit {
  readonly estados = EstadoFormulario;

  publicaciones: Publicacion[] = [];
  titulo: string = 'Publicaciones';

  publicacionSeleccionada?: Publicacion;
  publicacionModificada?: Publicacion;

  publicacionOfertadaId?: string;

  publicacionesDisponiblesParaIntercambiar?: Publicacion[];

  estadoFormulario?: EstadoFormulario;
  mensajeFormulario?: { tipo: 'error' | 'exito'; mensaje: string };

  // Añade el atributo para almacenar el ID del timeout
  private timeoutId?: number;

  constructor(private publicacionService: PublicacionService) {}

  ngOnInit(): void {
    this.listarPublicaciones();
  }

  listarPublicaciones(): void {
    this.publicacionService
      .listarPublicaciones()
      .subscribe((publicaciones: Publicacion[]) => {
        this.publicaciones = publicaciones.map((publicacion) => ({
          ...publicacion,
          bien: bienAdapter(publicacion.bien),
        }));
      });
  }

  seleccionarPublicacion(publicacion: Publicacion): void {
    this.publicacionSeleccionada = publicacion;
    this.publicacionModificada = { ...publicacion };

    if (this.estadoFormulario === EstadoFormulario.Intercambiar) {
      this.publicacionesDisponiblesParaIntercambiar =
        this.obtenerPublicacionesDisponiblesParaIntercambiar();
    }
  }

  abrirFormulario(estado: EstadoFormulario, publicacion: Publicacion): void {
    this.resetearMensajeFormulario();
    this.estadoFormulario = estado;

    if (this.publicacionSeleccionada !== publicacion) {
      this.resetearFormulario();
      this.seleccionarPublicacion(publicacion);
    }

    if (estado === EstadoFormulario.Intercambiar) {
      this.publicacionesDisponiblesParaIntercambiar =
        this.obtenerPublicacionesDisponiblesParaIntercambiar();
    }
  }

  private obtenerPublicacionesDisponiblesParaIntercambiar(): Publicacion[] {
    return this.publicaciones.filter((publicacion) =>
      this.esPublicacionDisponibleParaIntercambiar(publicacion)
    );
  }

  private esPublicacionDisponibleParaIntercambiar(
    publicacion: Publicacion
  ): boolean {
    return (
      publicacion.id !== this.publicacionSeleccionada?.id &&
      !this.permutaEsRepetida(publicacion) &&
      !this.permutaEsDelMismoTitular(publicacion)
    );
  }

  private permutaEsRepetida(publicacion: Publicacion): boolean {
    if (!this.publicacionSeleccionada?.__permutasSolicitadas) {
      return false;
    }
    return this.publicacionSeleccionada.__permutasSolicitadas.some(
      (permuta) => permuta.ofertada.id === publicacion.id
    );
  }

  private permutaEsDelMismoTitular(publicacion: Publicacion): boolean {
    return (
      this.publicacionSeleccionada?.bien.titular.id ===
      publicacion.bien.titular.id
    );
  }

  cerrarFormulario(): void {
    this.resetearFormulario();
    this.resetearMensajeFormulario();
    this.publicacionSeleccionada = undefined;
    this.estadoFormulario = undefined;
  }

  resetearFormulario(): void {
    this.publicacionModificada = undefined;
    this.publicacionesDisponiblesParaIntercambiar = undefined;
  }

  resetearMensajeFormulario(): void {
    this.mensajeFormulario = undefined;
  }

  publicacionModificadaEsValida(): boolean {
    return (
      this.validarCampo(this.publicacionModificada?.titulo) &&
      this.validarCampo(this.publicacionModificada?.descripcion) &&
      this.hayCambios(this.publicacionSeleccionada, this.publicacionModificada)
    );
  }

  private validarCampo(value?: string): boolean {
    return Boolean(value && value.trim());
  }

  private hayCambios(anterior?: Publicacion, actual?: Publicacion): boolean {
    if (!anterior || !actual) {
      return false;
    }
    return (
      anterior.titulo.trim() !== actual.titulo.trim() ||
      anterior.descripcion.trim() !== actual.descripcion.trim()
    );
  }

  modificarPublicacion(): void {
    if (!this.publicacionSeleccionada) {
      throw new Error('No existe publicación seleccionada o datos inválidos');
    }

    if (!this.publicacionModificada) {
      throw new Error('No hay cambios en la publicación');
    }

    this.publicacionService
      .actualizarPublicacion(this.publicacionModificada!)
      .subscribe({
        next: () => {
          const index = this.publicaciones.findIndex(
            (publicacion) => publicacion.id === this.publicacionModificada?.id
          );
          if (index !== -1) {
            this.publicaciones[index] = { ...this.publicacionModificada! };
          }
          this.resetearFormulario();
          this.cerrarFormulario();
          this.mostrarMensaje('exito', 'Publicación modificada correctamente');
        },
        error: (error) => {
          console.error('Error al modificar publicación.', error);
          this.mostrarMensaje('error', error.message || error);
        },
      });
  }

  intercambiarPublicacion(): void {
    if (!this.publicacionSeleccionada) {
      throw new Error('No existe publicación seleccionada');
    }

    if (!this.publicacionOfertadaId) {
      console.log(this.publicacionOfertadaId);
      throw new Error('No existe publicación ofertada id');
    }

    const publicacionOfertada = this.publicaciones.find((publicacion) => {
      console.log(publicacion.id, this.publicacionOfertadaId);
      return +publicacion.id! === +this.publicacionOfertadaId!;
    });

    if (!publicacionOfertada) {
      throw new Error('No existe publicación ofertada');
    }

    this.publicacionService
      .solicitarIntercambio(this.publicacionSeleccionada, publicacionOfertada)
      .subscribe({
        next: () => {
          if (!this.publicacionSeleccionada!.__permutasSolicitadas) {
            this.publicacionSeleccionada!.__permutasSolicitadas = [];
          }
          this.publicacionSeleccionada!.__permutasSolicitadas.push({
            solicitada: this.publicacionSeleccionada!,
            ofertada: publicacionOfertada!,
            pendiente: true,
            aceptada: false,
            registrada: false,
            finalizada: false,
          });

          console.log(this.publicaciones);

          this.resetearFormulario();
          this.cerrarFormulario();
          this.mostrarMensaje(
            'exito',
            'Publicación intercambiada correctamente'
          );
        },
        error: (error: any) => {
          console.error('Error al intercambiar publicación.', error);
          this.mostrarMensaje('error', error.message || error);
        },
      });
  }

  eliminarPublicacion(): void {
    if (!this.publicacionSeleccionada) {
      throw new Error('No existe publicación seleccionada');
    }

    this.publicacionService
      .eliminarPublicacion(this.publicacionSeleccionada)
      .subscribe({
        next: () => {
          this.publicaciones = this.publicaciones.filter(
            (publicacion) => publicacion.id !== this.publicacionSeleccionada?.id
          );
          this.resetearFormulario();
          this.cerrarFormulario();
          this.mostrarMensaje('exito', 'Publicación eliminada correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar publicación.', error);
          this.mostrarMensaje('error', error.message || error);
        },
      });
  }

  private mostrarMensaje(tipo: 'exito' | 'error', mensaje: string): void {
    this.mensajeFormulario = { tipo, mensaje };

    // Limpia cualquier timeout existente antes de establecer uno nuevo
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      this.mensajeFormulario = undefined;
    }, 10000);
  }
}
