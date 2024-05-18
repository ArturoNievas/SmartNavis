import { Component } from '@angular/core';
import { PublicacionService } from '../../services/publicacion/publicacion.service';
import { NgFor, NgIf } from '@angular/common';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { FormsModule } from '@angular/forms';
import { Bien } from '../../interfaces/bien';
import { Publicacion } from '../../interfaces/publicacion';
import { BienService } from '../../services/bien/bien.service';
import { ApiService } from '../../services/api/api.service';

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
  readonly estados: typeof EstadoFormulario = EstadoFormulario;

  publicaciones: any[] = [];
  titulo?: string;

  /*  */
  public publicacionSeleccionada?: undefined | Publicacion;
  public publicacionModificada?: undefined | Publicacion;

  public bienes: any[] = [];
  public bienesDisponiblesParaIntercambiar?: Bien[];

  estadoFormulario: undefined | EstadoFormulario;
  mensajeFormulario?: {
    tipo: 'error' | 'exito';
    mensaje: string;
  };

  /* MÉTODOS */
  constructor(
    private publicacionService: PublicacionService,
    private bienService: BienService<Bien>
  ) {
    this.titulo = 'Publicaciones';
  }

  ngOnInit(): void {
    this.listarPublicaciones();
    this.listarBienes();
  }

  listarPublicaciones(): void {
    this.publicacionService
      .listarPublicaciones()
      .subscribe((publicaciones: any[]) => {
        this.publicaciones = publicaciones;
        console.log(this.publicaciones);
      });
  }

  protected bienAdapter = (bien: Bien | any) => {
    const __dominio = bien?.patente || bien?.partida || bien?.matricula;

    return {
      ...bien,
      __dominio,
    };
  };

  protected listarBienes(): void {
    this.bienService.listarBienes().subscribe((bienes: Bien[]) => {
      this.bienes = bienes.map((bien) => this.bienAdapter(bien));
    });
  }

  seleccionarPublicacion(publicacion: Publicacion): void {
    this.publicacionSeleccionada = publicacion;
    this.publicacionModificada = { ...publicacion };

    if (this.estadoFormulario === this.estados.Intercambiar) {
      this.bienesDisponiblesParaIntercambiar =
        this.obtenerBienesDisponiblesParaIntercambiar();
    }
  }

  abrirFormulario(estado: EstadoFormulario, publicacion: Publicacion): void {
    this.resetearMensajeFormulario();
    this.estadoFormulario = estado;

    if (this.publicacionSeleccionada !== publicacion) {
      this.resetearFormulario();
      this.seleccionarPublicacion(publicacion);
    }
  }

  private obtenerBienesDisponiblesParaIntercambiar(): Bien[] {
    return this.bienes.filter((bien) =>
      this.esBienDisponibleParaIntercambiar(bien)
    );
  }

  private esBienDisponibleParaIntercambiar(bien: Bien): boolean {
    return (
      bien.id !== this.publicacionSeleccionada?.bien.id &&
      this.permutaNoEsRepetida(bien) &&
      this.permutaNoEsMismoTitular(bien)
    );
  }

  private permutaNoEsRepetida(bien: Bien): boolean {
    if (!this.publicacionSeleccionada?.__permutasSolicitadas) {
      return true;
    }

    return !this.publicacionSeleccionada.__permutasSolicitadas.some(
      (permuta) => permuta.solicitada.bien.id === bien.id
    );
  }

  private permutaNoEsMismoTitular(bien: Bien): boolean {
    if (!this.publicacionSeleccionada) {
      return true;
    }

    return this.publicacionSeleccionada.bien.titular.id !== bien.titular.id;
  }

  cerrarFormulario(): void {
    this.resetearMensajeFormulario();

    this.publicacionSeleccionada = undefined;
    this.publicacionModificada = undefined;
    this.estadoFormulario = undefined;
  }

  resetearFormulario(): void {
    this.publicacionModificada = undefined;
    this.bienesDisponiblesParaIntercambiar = undefined;
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
            (publicacion) => publicacion.id === this.publicacionModificada?.id
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
            (publicacion) => publicacion.id === this.publicacionSeleccionada?.id
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
