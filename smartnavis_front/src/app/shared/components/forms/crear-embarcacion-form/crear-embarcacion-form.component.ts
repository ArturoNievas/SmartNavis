import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-crear-embarcacion-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-embarcacion-form.component.html',
  styleUrl: './crear-embarcacion-form.component.scss',
})
export class CrearEmbarcacionFormComponent {
  @Output() enviarFormulario = new EventEmitter<any>();

  constructor() {}

  protected modificar = false;
  protected formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    matricula: new FormControl('', Validators.required),
    eslora: new FormControl('', Validators.required),
    manga: new FormControl('', Validators.required),
    calado: new FormControl('', Validators.required),
  });

  protected get nombre() {
    return this.formulario.get('nombre');
  }

  protected get matricula() {
    return this.formulario.get('matricula');
  }

  protected get eslora() {
    return this.formulario.get('eslora');
  }

  protected get manga() {
    return this.formulario.get('manga');
  }

  protected get calado() {
    return this.formulario.get('calado');
  }

  protected onSubmit() {
    this.enviarFormulario.emit(this.formulario.value);
    this.modificar = true;
  }

  public reset() {
    this.formulario.reset();
    this.modificar = false;
  }
}
