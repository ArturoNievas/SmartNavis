import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse-page',
  standalone: true,
  imports: [AppPageComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './registrarse-page.component.html',
  styleUrl: './registrarse-page.component.scss',
})
export class RegistrarsePageComponent {
  constructor(private router: Router) {}

  registrarseForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    tipoDocumento: new FormControl('dni', Validators.required),
    numeroDocumento: new FormControl('', Validators.required),
    fechaDeNacimiento: new FormControl('', [
      Validators.required,
      this.validatorEdad.bind(this),
    ]),
  });

  private validatorEdad(control: AbstractControl) {
    const date = new Date(control.value);
    const age = this.calcularEdad(date);

    return age >= 18 ? null : { menorDeEdad: true };
  }

  private calcularEdad(date: Date) {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();

    if (
      today.getMonth() < date.getMonth() ||
      (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())
    ) {
      age--;
    }

    return age;
  }

  get nombre() {
    return this.registrarseForm.get('nombre');
  }

  get apellido() {
    return this.registrarseForm.get('apellido');
  }

  get email() {
    return this.registrarseForm.get('email');
  }

  get tipoDocumento() {
    return this.registrarseForm.get('tipoDocumento');
  }

  get numeroDocumento() {
    return this.registrarseForm.get('numeroDocumento');
  }

  get fechaDeNacimiento() {
    return this.registrarseForm.get('fechaDeNacimiento');
  }

  registrarse() {
    console.log(this.registrarseForm.value);
    this.router.navigate(['/cambiar-contrasena']);
  }
}
