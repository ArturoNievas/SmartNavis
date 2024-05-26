import { Component, OnInit } from '@angular/core';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Amarra } from '../../interfaces/amarra';
import { AmarraService } from '../../services/amarra/amarra.service';
import { Puerto } from '../../interfaces/puerto';
import { PuertoService } from '../../services/puerto/puerto.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export enum EstadoFormulario {
  Crear = 'crear',
  Modificar = 'modificar',
  Eliminar = 'eliminar',
}

class FormularioAmarra extends FormGroup<{
  nombre: FormControl<string | null>,
  manga: FormControl<number | null>,
  eslora: FormControl<number | null>,
  calado: FormControl<number | null>,
}>{}

@Component({
  selector: 'app-amarras-page',
  standalone: true,
  imports: [RouterLink, AppPageComponent, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './amarras-page.component.html',
  styleUrl: './amarras-page.component.scss'
})
export class AmarrasPageComponent implements OnInit {
  amarras: Amarra[] = [];
  puertos: Puerto[] = [];
  amarraSeleccionada?: Amarra;
  puertoSeleccionado?: Puerto;

  readonly estados = EstadoFormulario;
  estadoFormulario?: EstadoFormulario;
  mensajeFormulario?: {tipo: 'exito' | 'error', mensaje: string};

  formulario= new FormularioAmarra({
    nombre: new FormControl(''),
    manga: new FormControl(0.0),
    eslora: new FormControl(0.0),
    calado: new FormControl(0.0),
  });

  constructor(
    private amarraService: AmarraService,
    private puertoService: PuertoService,
  ) {
  }

  ngOnInit() {
    this.listarPuertos();
  }

  public listarPuertos() {
    this.puertoService.listarPuertos().subscribe(
      (puertos) => this.puertos = puertos
    );
  }

  public listarAmarras(puerto: Puerto) {
    this.amarraService.listarAmarras().subscribe(
      (amarras) => this.amarras = amarras.filter(
        (amarra) => amarra.puerto.id == puerto.id
      )
    );
  }

  public crearAmarra(formulario: FormularioAmarra) {

  }

  public modificarAmarra(formulario: FormularioAmarra) {
    let amarraActualizada: Amarra = {
      id: this.amarraSeleccionada!.id,
      nombre: formulario.value.nombre!,
      puerto: this.amarraSeleccionada!.puerto,
      manga: formulario.value.manga!,
      eslora: formulario.value.eslora!,
      calado: formulario.value.calado!,
    }
    this.amarraService.actualizarAmarra(amarraActualizada).subscribe({
      next: () => {
        this.listarAmarras(this.amarraSeleccionada!.puerto);
        console.error('Debería modificar la amarra en la API.');

        this.cerrarFormulario();
        this.mostrarMensaje('exito', 'Amarra modificada con éxito.')
      },
      error: (error: Error) => {
        this.cerrarFormulario();
        this.mostrarMensaje('error', error.message)
      }
    })
  }

  hayCambios(): boolean {
    return (
      this.amarraSeleccionada!.nombre != this.formulario.value.nombre
      || this.amarraSeleccionada!.manga != this.formulario.value.manga
      || this.amarraSeleccionada!.eslora != this.formulario.value.eslora
      || this.amarraSeleccionada!.calado != this.formulario.value.calado
    )
  }

  esValido(): boolean {
    return (
      Boolean(this.formulario.value.nombre)
      && Boolean(this.formulario.value.manga)
      && Boolean(this.formulario.value.eslora)
      && Boolean(this.formulario.value.calado)
    )
  }

  public eliminarAmarra(amarra: Amarra) {

  }

  mostrarMensaje(tipo: 'exito' | 'error', mensaje: string) {
    this.mensajeFormulario = {tipo, mensaje}
    window.setTimeout(
      () => {this.mensajeFormulario = undefined},
      10000
    )
  }

  seleccionarPuerto(nombrePuerto: string) {
    this.puertoSeleccionado = this.puertos.find(p => p.nombre == nombrePuerto);
    this.listarAmarras(this.puertoSeleccionado!);
  }

  seleccionarAmarra(amarra: Amarra) {
    this.amarraSeleccionada = amarra;
  }

  public abrirFormulario(estado: EstadoFormulario, amarra?: Amarra) {
    this.resetearMensajeFormulario();

    this.estadoFormulario = estado;
    this.amarraSeleccionada = amarra;
    switch (this.estadoFormulario) {
      case EstadoFormulario.Modificar:
        this.formulario.controls.nombre.setValue(amarra!.nombre);
        this.formulario.controls.manga.setValue(amarra!.manga);
        this.formulario.controls.eslora.setValue(amarra!.eslora);
        this.formulario.controls.calado.setValue(amarra!.calado);
        break;
      case EstadoFormulario.Crear:
        // TODO
        break;
      case EstadoFormulario.Eliminar:
        // TODO
        break;
    }
  }

  resetearMensajeFormulario() {
    this.mensajeFormulario = undefined;
  }

  cerrarFormulario() {
    this.resetearMensajeFormulario();
    this.amarraSeleccionada = undefined;
  }
}
