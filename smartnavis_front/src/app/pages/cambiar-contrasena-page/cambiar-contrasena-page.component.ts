import { Component } from '@angular/core';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-contrasena-page',
  standalone: true,
  imports: [AppPageComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './cambiar-contrasena-page.component.html',
  styleUrl: './cambiar-contrasena-page.component.scss',
})
export class CambiarContrasenaPageComponent {
  protected contrasenaForm: FormGroup;

  constructor(private router: Router) {
    this.contrasenaForm = new FormGroup({
      contrasenaNueva: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      contrasenaNuevaRepetida: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.contrasenaForm.get('contrasenaNueva')?.valueChanges.subscribe(() => {
      this.actualizarValidadores();
    });

    const contrasenaNuevaRepetidaControl = this.contrasenaForm.get(
      'contrasenaNuevaRepetida'
    );
    if (contrasenaNuevaRepetidaControl) {
      contrasenaNuevaRepetidaControl.setValidators([
        Validators.required,
        Validators.minLength(8),
        this.validatorContrasenas.bind(this),
      ]);
    }
  }

  private actualizarValidadores() {
    const contrasenaNuevaRepetidaControl = this.contrasenaForm.get(
      'contrasenaNuevaRepetida'
    );
    if (contrasenaNuevaRepetidaControl) {
      contrasenaNuevaRepetidaControl.updateValueAndValidity();
    }
  }

  private validatorContrasenas(control: AbstractControl) {
    const contrasenaNuevaRepetida = control.value;

    return this.contrasenaNueva?.value === contrasenaNuevaRepetida
      ? null
      : { contrasenasNoCoinciden: true };
  }

  get contrasenaNueva() {
    return this.contrasenaForm.get('contrasenaNueva');
  }

  get contrasenaNuevaRepetida() {
    return this.contrasenaForm.get('contrasenaNuevaRepetida');
  }

  cambiarContrasena() {
    if (this.contrasenaForm.valid) {
      console.log('Contraseña cambiada');
    }

    this.router.navigate(['/registrarse']);
  }
}
