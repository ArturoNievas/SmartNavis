import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../services/publicacion/publicacion.service';
import { NgFor, NgIf } from '@angular/common';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { FormsModule } from '@angular/forms';
import { Bien } from '../../interfaces/bien';
import { Publicacion } from '../../interfaces/publicacion';
import { PublicacionEmbarcacionService } from '../../services/publicacionEmbarcacion/publicacion-embarcacion.service';

export enum EstadoFormulario {
  Modificar = 'modificar',
  Intercambiar = 'intercambiar',
  Eliminar = 'eliminar',
}

const bienAdapter = (bien: Bien | any): Bien => {
  const __dominio = bien?.patente || bien?.partida || bien?.matricula;
  return { ...bien, __dominio };
};

/* PÁGINA DE PUBLICACIONES
 * Lista los bienes publicados por los usuarios.
 * Las publicaciones pueden ser de bienes o de embarcaciones con amarra.
 * Las publicaciones de bienes pueden ser solicitadas para intercambiar por publicaciones de embarcaciones con amarra.
 * Las publicaciones de embarcaciones con amarra pueden ser solicitadas para intercambiar por cualquier publicación.
 * Las publicaciones de embarcaciones con amarra pueden ser ofertadas para intercambiar por cualquier publicación.
 *
 * Una publicación A puede ser ofertada para intercambiar por la publicación solicitada B si:
 * - A es una publicación de embarcación con amarra y B es una publicación de bien.
 * - A es una publicación de bien y B es una publicación de embarcación con amarra.
 * - A es una publicación de embarcación con amarra y B es una publicación de embarcación con amarra.
 * - Titular del bien de la publicación A es distinto al titular del bien de la publicación B.
 * - La publicación A no ha sido solicitada previamente para intercambiar por la publicación B.
 */

@Component({
  selector: 'app-publicaciones-page',
  standalone: true,
  imports: [NgFor, NgIf, AppPageComponent, FormsModule],
  templateUrl: './publicaciones-page.component.html',
  styleUrls: ['./publicaciones-page.component.scss'],
})
export class PublicacionesPageComponent implements OnInit {
  titulo: string = 'Publicaciones';
  subtitulo?: string;

  readonly estados = EstadoFormulario;

  todasLasPublicaciones: Publicacion[] = [];
  publicacionesEmbarcaciones: Publicacion[] = [];

  publicacionesSolicitables: Publicacion[] = [];
  publicacionesOfertables: Publicacion[] = [];

  publicacionSeleccionada?: Publicacion;

  publicacionModificada?: Publicacion;

  idPublicacionOfertada?: string;
  publicacionOfertada?: Publicacion;

  estadoFormulario?: EstadoFormulario;
  mensajeFormulario?: { tipo: 'error' | 'exito'; mensaje: string };
  private timeoutId?: number;

  constructor(
    private publicacionService: PublicacionService,
    private publicacionEmbarcacionService: PublicacionEmbarcacionService
  ) {}

  ngOnInit(): void {
    this.listarTodasLasPublicaciones();
    this.listarPublicacionesEmbarcaciones();
  }

  listarTodasLasPublicaciones(): void {
    this.publicacionService
      .listarPublicaciones()
      .subscribe((publicaciones: Publicacion[]) => {
        this.todasLasPublicaciones = publicaciones.map((publicacion) => ({
          ...publicacion,
          bien: bienAdapter(publicacion.bien),
        }));
        this.listarPublicacionesSolicitables();
      });
  }

  listarPublicacionesEmbarcaciones(): void {
    this.publicacionEmbarcacionService
      .listarPublicaciones()
      .subscribe((publicaciones: Publicacion[]) => {
        this.publicacionesEmbarcaciones = publicaciones.map((publicacion) => ({
          ...publicacion,
          bien: bienAdapter(publicacion.bien),
        }));
        this.listarPublicacionesSolicitables();
      });
  }

  protected listarPublicacionesSolicitables(): void {
    this.publicacionesSolicitables = this.todasLasPublicaciones;
  }

  seleccionarPublicacion(publicacion: Publicacion): void {
    this.publicacionSeleccionada = publicacion;
    this.publicacionModificada = { ...publicacion };

    if (this.estadoFormulario === EstadoFormulario.Intercambiar) {
      this.publicacionesOfertables = this.obtenerPublicacionesOfertables();
    }
  }

  protected obtenerPublicacionesOfertables(): Publicacion[] {
    if (!this.publicacionSeleccionada) {
      return [];
    }

    const publicacionSeleccionadaEsEmbarcacionConAmarra =
      this.publicacionesEmbarcaciones.some(
        (publicacion) => publicacion.id === this.publicacionSeleccionada?.id
      );

    const ofertables = publicacionSeleccionadaEsEmbarcacionConAmarra
      ? this.todasLasPublicaciones
      : this.publicacionesEmbarcaciones;

    const titularDiferente = (ofertada: Publicacion, solicitada: Publicacion) =>
      solicitada.bien.titular !== ofertada.bien.titular;

    const publicacionDiferente = (
      ofertada: Publicacion,
      solicitada: Publicacion
    ) => solicitada.id !== ofertada.id;

    const ofertadaPreviamente = (
      ofertada: Publicacion,
      solicitada: Publicacion
    ) =>
      solicitada.__permutasSolicitadas?.some(
        (permuta) => permuta.ofertada.id === ofertada.id
      );

    const publicacionesOfertables = ofertables.filter(
      (publicacion) =>
        titularDiferente(publicacion, this.publicacionSeleccionada!) &&
        publicacionDiferente(publicacion, this.publicacionSeleccionada!) &&
        !ofertadaPreviamente(publicacion, this.publicacionSeleccionada!)
    );

    return publicacionesOfertables;
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
    this.resetearFormulario();
    this.resetearMensajeFormulario();
    this.publicacionSeleccionada = undefined;
    this.estadoFormulario = undefined;
  }

  resetearFormulario(): void {
    this.publicacionModificada = undefined;
    this.idPublicacionOfertada = undefined;
    this.publicacionOfertada = undefined;
    this.publicacionesOfertables = [];
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

    const { __permutasSolicitadas, ...publicacion } =
      this.publicacionModificada;

    this.publicacionService.actualizarPublicacion(publicacion).subscribe({
      next: () => {
        const index = this.todasLasPublicaciones.findIndex(
          (publicacion) => publicacion.id === this.publicacionModificada?.id
        );
        if (index !== -1) {
          this.todasLasPublicaciones[index] = {
            ...this.publicacionModificada!,
          };
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

    if (this.idPublicacionOfertada) {
      this.publicacionOfertada = this.todasLasPublicaciones.find(
        (publicacion) => {
          return (
            publicacion.id?.toString() ===
            this.idPublicacionOfertada?.toString()
          );
        }
      );
    }

    if (!this.publicacionOfertada) {
      throw new Error('No existe publicación ofertada');
    }

    this.publicacionService
      .solicitarIntercambio(
        this.publicacionSeleccionada,
        this.publicacionOfertada
      )
      .subscribe({
        next: () => {
          if (!this.publicacionSeleccionada!.__permutasSolicitadas) {
            this.publicacionSeleccionada!.__permutasSolicitadas = [];
          }

          this.publicacionSeleccionada!.__permutasSolicitadas.push({
            solicitada: this.publicacionSeleccionada!,
            ofertada: this.publicacionOfertada!,
            pendiente: true,
            aceptada: false,
            registrada: false,
            finalizada: false,
          });

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
      throw new Error('No existe publicación seleccionada o datos inválidos');
    }

    this.publicacionService
      .eliminarPublicacion(this.publicacionSeleccionada)
      .subscribe({
        next: () => {
          this.todasLasPublicaciones = this.eliminarPublicacionDeLista(
            this.todasLasPublicaciones
          );
          this.publicacionesEmbarcaciones = this.eliminarPublicacionDeLista(
            this.publicacionesEmbarcaciones
          );
          this.publicacionesSolicitables = this.eliminarPublicacionDeLista(
            this.publicacionesSolicitables
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

  private eliminarPublicacionDeLista(lista: Publicacion[]): Publicacion[] {
    if (!this.publicacionSeleccionada) {
      return lista;
    }

    return lista.filter(
      (publicacion) => publicacion.id !== this.publicacionSeleccionada!.id
    );
  }

  private mostrarMensaje(tipo: 'exito' | 'error', mensaje: string): void {
    this.mensajeFormulario = { tipo, mensaje };

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      this.mensajeFormulario = undefined;
    }, 10000);
  }
}
