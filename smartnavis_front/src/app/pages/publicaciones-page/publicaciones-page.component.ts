import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublicacionService } from '../../services/publicacion/publicacion.service';
import { NgFor, NgIf } from '@angular/common';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { FormsModule } from '@angular/forms';
import { Bien } from '../../interfaces/bien';
import { Publicacion } from '../../interfaces/publicacion';
import { PublicacionEmbarcacionService } from '../../services/publicacionEmbarcacion/publicacion-embarcacion.service';
import { Permuta } from '../../interfaces/permuta';
import { PermutaService } from '../../services/permuta/permuta.service';
import { AuthService } from '../../services/auth/auth.service';

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
export class PublicacionesPageComponent implements OnInit, OnDestroy {
  titulo: string = 'Publicaciones';
  subtitulo?: string;

  readonly estados = EstadoFormulario;

  todasLasPublicaciones: Publicacion[] = [];
  publicacionesEmbarcaciones: Publicacion[] = [];

  publicacionesSolicitables: Publicacion[] = [];
  publicacionesOfertables: Publicacion[] = [];
  publicacionesConPermutaAceptada: Publicacion[] = [];

  publicacionSeleccionada?: Publicacion;

  publicacionModificada?: Publicacion;

  idPublicacionOfertada?: string;
  publicacionOfertada?: Publicacion;

  estadoFormulario?: EstadoFormulario;
  mensajeFormulario?: { tipo: 'error' | 'exito'; mensaje: string };
  private timeoutId?: number;

  constructor(
    private publicacionService: PublicacionService,
    private publicacionEmbarcacionService: PublicacionEmbarcacionService,
    private permutaService: PermutaService,
    public authService: AuthService
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

        this.obtenerPermutasConPermutaAceptada();
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

  private obtenerPermutasConPermutaAceptada(): void {
    this.publicacionesConPermutaAceptada = this.todasLasPublicaciones.filter(
      (publicacion) =>
        publicacion.__permutasSolicitadas?.some((permuta) => permuta.aceptada)
    );
  }

  protected listarPublicacionesSolicitables(): void {
    this.publicacionesSolicitables = this.todasLasPublicaciones;
    this.filtrarPublicacionesSolicitablesConPermutasAceptadas();
  }

  filtrarPublicacionesSolicitablesConPermutasAceptadas() {
    this.publicacionesSolicitables = this.publicacionesSolicitables.filter(
      (publicacion) =>
        !this.publicacionesConPermutaAceptada.includes(publicacion)
    );
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

    const usuarioEsAdmin = () => this.authService.userIsAdmin();

    const publicacionEsPropia = (publicacion: Publicacion) => {
      return publicacion.bien.titular.id === this.authService.getMe()?.id;
    };

    const titularDiferente = (
      ofertada: Publicacion,
      solicitada: Publicacion
    ) => {
      console.log({ ofertada, solicitada });
      return solicitada.bien.titular.id !== ofertada.bien.titular.id;
    };

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

    // TODO: Obtener publicaciones con permuta aceptada desde el backend
    const publicacionConPermutaAceptada = (publicacion: Publicacion) => {
      return this.publicacionesConPermutaAceptada.some(
        (publicacionAceptada) => publicacionAceptada.id === publicacion.id
      );
    };

    const publicacionesOfertables = ofertables.filter((publicacion) => {
      return (
        (usuarioEsAdmin() || publicacionEsPropia(publicacion)) &&
        titularDiferente(publicacion, this.publicacionSeleccionada!) &&
        publicacionDiferente(publicacion, this.publicacionSeleccionada!) &&
        !ofertadaPreviamente(publicacion, this.publicacionSeleccionada!) &&
        !publicacionConPermutaAceptada(publicacion)
      );
    });

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

  solicitarIntercambio(): void {
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
        next: (permuta: Permuta) => {
          if (!this.publicacionSeleccionada!.__permutasSolicitadas) {
            this.publicacionSeleccionada!.__permutasSolicitadas = [];
          }

          this.publicacionSeleccionada!.__permutasSolicitadas.push({
            id: permuta.id,
            solicitada: this.publicacionSeleccionada!,
            ofertada: this.publicacionOfertada!,
            pendiente: permuta.pendiente,
            aceptada: permuta.aceptada,
            registrada: permuta.registrada,
            finalizada: permuta.finalizada,
          });

          this.resetearFormulario();
          this.cerrarFormulario();
          this.mostrarMensaje('exito', 'Intercambio solicitado con éxito');
        },
        error: (error: any) => {
          console.error('Error al solicitar el intercambio.', error);
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

  aceptarPermuta(permuta: Permuta): void {
    if (!permuta) {
      throw new Error('No existe permuta');
    }

    this.permutaService.aceptarPermuta(permuta).subscribe({
      next: () => {
        permuta.aceptada = true;
        permuta.pendiente = false;
        this.publicacionesConPermutaAceptada.push(permuta.solicitada);
        this.publicacionesConPermutaAceptada.push(permuta.ofertada);
        this.filtrarPublicacionesSolicitablesConPermutasAceptadas();
        this.mostrarMensaje('exito', 'Intercambio aceptado.');
      },
      error: (error: any) => {
        console.error('Error al aceptar permuta.', error);
        this.mostrarMensaje('error', error.message || error);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  public listarSolicitudes(publicacion: Publicacion): void {
    this.publicacionService
      .listarSolicitudes(publicacion)
      .subscribe((solicitudes: Permuta[]) => {
        publicacion.__permutasSolicitadas = solicitudes;
        if (solicitudes.length === 0) {
          alert('La publicación no cuenta con permutas solicitadas.');
        }
      });
  }
}
