import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Persona } from '../../../../interfaces/persona';

@Component({
  selector: 'app-propietario-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './propietario-form.component.html',
  styleUrl: './propietario-form.component.scss',
})
export class PropietarioFormComponent {
  @Output() enviarFormulario = new EventEmitter<any>();

  constructor() {}

  protected modificar = false;
  protected formulario = new FormGroup({
    dni: new FormControl<number | undefined>(undefined, Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
  });

  protected get dni() {
    return this.formulario.get('dni');
  }

  protected get nombres() {
    return this.formulario.get('nombres');
  }

  protected get apellidos() {
    return this.formulario.get('apellidos');
  }

  protected get fechaNacimiento() {
    return this.formulario.get('fechaNacimiento');
  }

  protected onSubmit() {
    this.enviarFormulario.emit(this.formulario.value);
    this.modificar = true;
  }

  public reset() {
    this.formulario.reset();
    this.formulario.enable();
    this.modificar = false;
  }

  public setFormulario(propietario: Persona) {
    if (!propietario) return;

    const { dni, nombres, apellidos, fechaNacimiento } = propietario;

    this.formulario.setValue({
      dni,
      nombres,
      apellidos,
      fechaNacimiento: fechaNacimiento.split('T')[0],
    });
    this.formulario.disable();
    this.modificar = false;
  }
}
