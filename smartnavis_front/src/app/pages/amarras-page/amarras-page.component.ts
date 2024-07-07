import { Component, OnInit } from '@angular/core';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Amarra } from '../../interfaces/amarra';
import { AmarraService } from '../../services/amarra/amarra.service';
import { Puerto } from '../../interfaces/puerto';
import { PuertoService } from '../../services/puerto/puerto.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormularioReasignarComponent } from './formulario-reasignar/formulario-reasignar.component';
import { Usuario } from '../../interfaces/usuario';

export enum EstadoFormulario {
  Crear = 'crear',
  Modificar = 'modificar',
  Eliminar = 'eliminar',
  Reasignar = 'reasignar',
}

class FormularioAmarra extends FormGroup<{
  nombre: FormControl<string | null>;
  idPuerto: FormControl<number | null>;
  manga: FormControl<number | null>;
  eslora: FormControl<number | null>;
  calado: FormControl<number | null>;
}> {}

@Component({
  selector: 'app-amarras-page',
  standalone: true,
  imports: [
    RouterLink,
    AppPageComponent,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    NgTemplateOutlet,
    FormularioReasignarComponent,
  ],
  templateUrl: './amarras-page.component.html',
  styleUrl: './amarras-page.component.scss',
})
export class AmarrasPageComponent implements OnInit {
  amarras: Amarra[] = [];
  puertos: Puerto[] = [];
  amarraSeleccionada?: Amarra;

  puertoSelect = new FormControl(-1);
  puertoSeleccionado?: Puerto;

  readonly estados = EstadoFormulario;
  estadoFormulario?: EstadoFormulario;
  mensajeFormulario?: { tipo: 'exito' | 'error'; mensaje: string };

  formulario = new FormularioAmarra({
    nombre: new FormControl(),
    idPuerto: new FormControl(),
    manga: new FormControl(),
    eslora: new FormControl(),
    calado: new FormControl(),
  });

  constructor(
    private amarraService: AmarraService,
    private puertoService: PuertoService
  ) {}

  ngOnInit() {
    this.listarPuertos();
  }

  public listarPuertos() {
    this.puertoService
      .listarPuertos()
      .subscribe((puertos) => (this.puertos = puertos));
  }

  public listarAmarras(puerto: Puerto) {
    if (!puerto?.id) {
      this.amarras = [];
      return;
    }

    this.puertoService.listarAmarras(puerto).subscribe((amarras) => {
      this.amarras = amarras;
    });
  }

  public crearAmarra(formulario: FormularioAmarra) {
    let nuevaAmarra: Amarra = {
      nombre: formulario.value.nombre!,
      puerto: this.puertos.find((p) => p.id == formulario.value.idPuerto)!,
      manga: formulario.value.manga!,
      eslora: formulario.value.eslora!,
      calado: formulario.value.calado!,
    };
    console.log('Amarra creada:', nuevaAmarra);
    this.amarraService.crearAmarra(nuevaAmarra).subscribe({
      next: (amarra) => {
        this.seleccionarPuerto(String(amarra.puerto.id));
        this.cerrarFormulario();
        this.mostrarMensaje('exito', 'Amarra creada con éxito.');
      },
      error: (error: Error) => {
        this.cerrarFormulario();
        this.mostrarMensaje('error', error.message);
      },
    });
  }

  public modificarAmarra(formulario: FormularioAmarra) {
    let amarraActualizada: Amarra = {
      id: this.amarraSeleccionada!.id,
      nombre: formulario.value.nombre!,
      puerto: this.amarraSeleccionada!.puerto,
      manga: formulario.value.manga!,
      eslora: formulario.value.eslora!,
      calado: formulario.value.calado!,
    };
    this.amarraService.actualizarAmarra(amarraActualizada).subscribe({
      next: (amarra) => {
        this.seleccionarPuerto(String(amarra.puerto.id));
        this.cerrarFormulario();
        this.mostrarMensaje('exito', 'Amarra modificada con éxito.');
      },
      error: (error: Error) => {
        this.cerrarFormulario();
        this.mostrarMensaje('error', error.message);
      },
    });
  }

  hayCambios(): boolean {
    return (
      this.amarraSeleccionada!.nombre !== this.formulario.value.nombre ||
      this.amarraSeleccionada!.puerto.id !== this.formulario.value.idPuerto ||
      this.amarraSeleccionada!.manga !== this.formulario.value.manga ||
      this.amarraSeleccionada!.eslora !== this.formulario.value.eslora ||
      this.amarraSeleccionada!.calado !== this.formulario.value.calado
    );
  }

  esValido(): boolean {
    return (
      Boolean(this.formulario.value.nombre) &&
      Boolean(this.formulario.value.idPuerto) &&
      Boolean(this.formulario.value.manga) &&
      Boolean(this.formulario.value.eslora) &&
      Boolean(this.formulario.value.calado)
    );
  }

  public eliminarAmarra(amarra: Amarra) {
    console.log('Inicio Page.eliminarAmarra');
    this.amarraService.eliminarAmarra(amarra).subscribe({
      next: () => {
        this.seleccionarPuerto(String(amarra.puerto.id));
        this.cerrarFormulario();
        this.mostrarMensaje('exito', 'Amarra eliminada con éxito.');
      },
      error: (error: Error) => {
        this.cerrarFormulario();
        this.mostrarMensaje('error', error.message);
      },
    });
  }

  mostrarMensaje(tipo: 'exito' | 'error', mensaje: string) {
    this.mensajeFormulario = { tipo, mensaje };
    window.setTimeout(() => {
      this.mensajeFormulario = undefined;
    }, 10000);
  }

  seleccionarPuerto(idPuerto: string) {
    if (idPuerto != String(this.puertoSeleccionado?.id)) {
      this.puertoSelect.setValue(Number(idPuerto));
    }
    this.puertoSeleccionado = this.puertos.find(
      (p) => p.id == Number(idPuerto)
    );
    this.listarAmarras(this.puertoSeleccionado!);
  }

  seleccionarAmarra(amarra: Amarra) {
    this.amarraSeleccionada = amarra;
  }

  public abrirFormulario(estado: EstadoFormulario, amarra?: Amarra) {
    this.resetearMensajeFormulario();

    this.estadoFormulario = estado;
    switch (this.estadoFormulario) {
      case EstadoFormulario.Modificar:
        this.amarraSeleccionada = amarra!;
        this.formulario.controls.nombre.setValue(
          this.amarraSeleccionada.nombre
        );
        this.formulario.controls.idPuerto.setValue(
          this.amarraSeleccionada.puerto.id!
        );
        this.formulario.controls.manga.setValue(this.amarraSeleccionada.manga);
        this.formulario.controls.eslora.setValue(
          this.amarraSeleccionada.eslora
        );
        this.formulario.controls.calado.setValue(
          this.amarraSeleccionada.calado
        );
        break;
      case EstadoFormulario.Crear:
        this.formulario.controls.nombre.setValue(null);
        this.formulario.controls.idPuerto.setValue(null);
        this.formulario.controls.manga.setValue(null);
        this.formulario.controls.eslora.setValue(null);
        this.formulario.controls.calado.setValue(null);
        break;
      case EstadoFormulario.Eliminar:
        this.amarraSeleccionada = amarra!;
        break;
      case EstadoFormulario.Reasignar:
        this.amarraSeleccionada = amarra!;
        break;
    }
  }

  resetearMensajeFormulario() {
    this.mensajeFormulario = undefined;
  }

  cerrarFormulario() {
    console.log('Formulario:', this.estadoFormulario);
    this.estadoFormulario = undefined;
    this.amarraSeleccionada = undefined;
  }

  desasignarAmarra(amarra: Amarra) {
    if (!confirm('¿Está seguro de que desea desasignar la amarra?')) return;

    this.amarraService.desasignarAmarra(amarra).subscribe({
      next: () => {
        this.mostrarMensaje('exito', 'Amarra desasignada con éxito.');
        if (this.puertoSeleccionado || amarra.puerto.id) {
          const puerto = this.puertoSeleccionado || amarra.puerto;
          this.listarAmarras(puerto);
        }
      },
      error: (error: Error) => {
        this.mostrarMensaje('error', error.message);
      },
    });
  }

  reasignarAmarra(
    formularioReasignar: {
      parentezco: string | null;
      usuario: Usuario;
      usuarioEsPropietario: boolean;
    } | null
  ) {
    if (!this.amarraSeleccionada?.id) return;

    if (!formularioReasignar) {
      this.cerrarFormulario();

      return;
    }

    const { id: amarraId } = this.amarraSeleccionada;
    const { usuario, usuarioEsPropietario, parentezco } = formularioReasignar;

    this.amarraService
      .reasignarAmarra({
        amarraId,
        usuarioId: usuario.id!,
        usuarioEsPropietario,
        parentezco,
      })
      .subscribe({
        next: () => {
          this.mostrarMensaje('exito', 'Amarra reasignada con éxito.');
          this.cerrarFormulario();
        },
        error: (error: Error) => {
          this.mostrarMensaje('error', error.message);
          this.cerrarFormulario();
        },
      });
  }
}
