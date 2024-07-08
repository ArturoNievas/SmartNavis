import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { PublicacionService } from '../../services/publicacion/publicacion.service';
import { Publicacion } from '../../interfaces/publicacion';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Permuta } from '../../interfaces/permuta';
import { PermutaService } from '../../services/permuta/permuta.service';
import { Bien } from '../../interfaces/bien';

enum EstadoFormulario {
  Modificar = 'modificar',
  Eliminar = 'eliminar',
  Publicar = 'publicar',
}

const bienAdapter = (bien: Bien | any): Bien => {
  const __dominio = bien?.patente || bien?.partida || bien?.matricula;
  return { ...bien, __dominio };
};

@Component({
  selector: 'app-mis-publicaciones-page',
  standalone: true,
  imports: [AppPageComponent, NgFor, NgIf, FormsModule],
  templateUrl: './mis-publicaciones-page.component.html',
  styleUrl: './mis-publicaciones-page.component.scss',
})
export class MisPublicacionesPageComponent implements OnInit, OnDestroy {
  titulo = 'Mis Publicaciones';
  readonly estados = EstadoFormulario;

  publicaciones: Publicacion[] = [];
  publicacionSeleccionada?: Publicacion;
  publicacionModificada?: Publicacion;
  nuevaPublicacion?: {
    titulo: string;
    descripcion: string;
    tipoBien: 'automotor' | 'embarcacion' | 'inmueble';
    dominio: string;
  };

  estadoFormulario?: EstadoFormulario;
  mensajeFormulario?: { tipo: 'error' | 'exito'; mensaje: string };
  private timeoutId?: number;

  constructor(
    private publicacionService: PublicacionService,
    private permutaService: PermutaService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.publicacionService
      .listarMisPublicaciones()
      .subscribe((publicaciones) => {
        this.publicaciones = publicaciones;
        publicaciones.forEach((publicacion) => {
          publicacion.bien = bienAdapter(publicacion.bien);
          this.publicacionService
            .listarSolicitudes(publicacion)
            .subscribe((permutas) => {
              publicacion.__permutasSolicitadas = permutas;
            });
        });
      });
  }

  seleccionarPublicacion(publicacion: Publicacion): void {
    this.publicacionSeleccionada = publicacion;
    this.publicacionModificada = { ...publicacion };
  }

  abrirFormulario(estado: EstadoFormulario, publicacion?: Publicacion): void {
    this.resetearMensajeFormulario();
    this.estadoFormulario = estado;
    this.nuevaPublicacion = {
      titulo: '',
      descripcion: '',
      tipoBien: 'automotor',
      dominio: '',
    };

    if (publicacion && this.publicacionSeleccionada !== publicacion) {
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
        const index = this.publicaciones.findIndex(
          (publicacion) => publicacion.id === this.publicacionModificada?.id
        );
        if (index !== -1) {
          this.publicaciones[index] = {
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

  eliminarPublicacion(): void {
    if (!this.publicacionSeleccionada) {
      throw new Error('No existe publicación seleccionada o datos inválidos');
    }

    this.publicacionService
      .eliminarPublicacion(this.publicacionSeleccionada)
      .subscribe({
        next: () => {
          this.publicaciones = this.eliminarPublicacionDeLista(
            this.publicaciones
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

  public nuevaPublicacionEsValida() {
    return (
      this.nuevaPublicacion?.titulo &&
      this.nuevaPublicacion?.descripcion &&
      this.nuevaPublicacion?.tipoBien &&
      this.nuevaPublicacion?.dominio
    );
  }

  public crearPublicacion() {
    if (!this.nuevaPublicacionEsValida()) return;
    let nuevaPublicacion = {
      titulo: this.nuevaPublicacion?.titulo,
      descripcion: this.nuevaPublicacion?.descripcion,
      bien: {},
    };
    if (this.nuevaPublicacion?.tipoBien === 'inmueble') {
      nuevaPublicacion.bien = {
        partida: this.nuevaPublicacion.dominio,
      };
    } else if (this.nuevaPublicacion?.tipoBien === 'automotor') {
      nuevaPublicacion.bien = {
        patente: this.nuevaPublicacion.dominio,
      };
    } else {
      nuevaPublicacion.bien = {
        matricula: this.nuevaPublicacion?.dominio,
      };
    }

    this.publicacionService.publicarBien(nuevaPublicacion).subscribe({
      next: (publicacion) => {
        this.publicaciones.push(publicacion);
        this.cerrarFormulario();
        this.resetearFormulario();
        this.mostrarMensaje('exito', 'Bien publicado correctamente');
      },
      error: (error) => {
        this.mostrarMensaje('error', error.message || error);
      },
    });
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
    this.seleccionarPublicacion(publicacion);
    console.log('Listar solicitudes', publicacion.__permutasSolicitadas);
  }
}
