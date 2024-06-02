import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  constructor() {}

  @Output() enviarFormulario = new EventEmitter<any>();

  formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    matricula: new FormControl('', Validators.required),
    eslora: new FormControl('', Validators.required),
    manga: new FormControl('', Validators.required),
    calado: new FormControl('', Validators.required),
  });

  get nombre() {
    return this.formulario.get('nombre');
  }

  get matricula() {
    return this.formulario.get('matricula');
  }

  get eslora() {
    return this.formulario.get('eslora');
  }

  get manga() {
    return this.formulario.get('manga');
  }

  get calado() {
    return this.formulario.get('calado');
  }

  onSubmit() {
    this.enviarFormulario.emit(this.formulario.value);
  }
}
