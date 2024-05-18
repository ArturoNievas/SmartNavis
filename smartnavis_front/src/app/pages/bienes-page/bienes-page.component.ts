import {Component} from '@angular/core';
import {Bien} from '../../interfaces/bien';
import {BienService} from '../../services/bien/bien.service';
import {Publicacion} from '../../interfaces/publicacion';
import {RouterLink} from '@angular/router';
import {AppPageComponent} from '../../shared/components/app-page/app-page.component';
import {NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-bienes-page',
  standalone: true,
  imports: [RouterLink, AppPageComponent, NgFor, NgIf, FormsModule],
  templateUrl: './bienes-page.component.html',
  styleUrl: './bienes-page.component.scss',
})
export class BienesPageComponent<T extends Bien> {
  public bienes: T[] = [];
  public bienSeleccionado?: T;

  public nuevaPublicacion: any = {
    titulo: '',
    descripcion: '',
  };

  public mensajeFormulario?: {
    tipo: 'error' | 'exito';
    mensaje: string;
  };

  constructor(protected bienService: BienService<T>) {
  }

  ngOnInit(): void {
    this.listarBienes();
  }

  protected bienAdapter = (bien: T) => {
    const dominio = bien?.__patente || bien?.__partida || bien?.__matricula;

    return {
      ...bien,
      dominio,
    };
  };

  protected listarBienes(): void {
    this.bienService.listarBienes().subscribe((bienes: T[]) => {
      this.bienes = bienes.map((bien) => this.bienAdapter(bien));
      console.log(this.bienes);
    });
  }

  public abrirFormularioDePublicacion(bien: T): void {
    this.resetearMensajeFormulario();

    if (this.bienSeleccionado !== bien) {
      this.resetearFormularioDePublicacion();
      this.bienSeleccionado = bien;
    }
  }

  public cerrarFormularioDePublicacion(): void {
    this.resetearMensajeFormulario();

    this.bienSeleccionado = undefined;
  }

  public resetearFormularioDePublicacion(): void {
    this.nuevaPublicacion = {};
  }

  private resetearMensajeFormulario(): void {
    this.mensajeFormulario = undefined;
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

  public publicarBien(): void {
    if (!this.bienSeleccionado) {
      throw new Error('no existe....');
    }

    const {__dominio, ...bien} = this.bienSeleccionado;
    const nuevaPublicacion: Publicacion = {
      ...this.nuevaPublicacion,
      bien,
    };

    this.bienService.publicarBien(nuevaPublicacion).subscribe({
      next: () => {
        this.bienSeleccionado!.__isBienPublicado = true;

        this.resetearFormularioDePublicacion();
        this.cerrarFormularioDePublicacion();

        this.mensajeFormulario = {
          tipo: 'exito',
          mensaje: 'Bien publicado con éxito.',
        };
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
}
