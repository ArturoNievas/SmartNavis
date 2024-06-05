import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { JsonPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { isFinite } from 'lodash';

@Component({
  selector: 'app-registrarse-page',
  standalone: true,
  imports: [AppPageComponent, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './registrarse-page.component.html',
  styleUrl: './registrarse-page.component.scss',
})
export class RegistrarsePageComponent {
  error?: {
    message: string;
    field: string;
  };

  constructor(private authService: AuthService) {}

  loading: boolean = false;

  registrarseForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
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

  get nombres() {
    return this.registrarseForm.get('nombres');
  }

  get apellidos() {
    return this.registrarseForm.get('apellidos');
  }

  get username() {
    return this.registrarseForm.get('username');
  }

  get password() {
    return this.registrarseForm.get('password');
  }

  get numeroDocumento() {
    return this.registrarseForm.get('numeroDocumento');
  }

  get fechaDeNacimiento() {
    return this.registrarseForm.get('fechaDeNacimiento');
  }

  registrarse() {
    if (this.registrarseForm.invalid) {
      return;
    }

    if (this.error) {
      this.error = undefined;
    }

    const nombres = this.nombres!.value || '';
    const apellidos = this.apellidos!.value || '';
    const username = this.username!.value || '';
    const password = this.password!.value || '';
    const numeroDocumento = this.numeroDocumento!.value || '';
    const fechaDeNacimiento = this.fechaDeNacimiento!.value || '';

    if (!isFinite(numeroDocumento)) {
      this.error = {
        message: 'El número de documento debe ser un número.',
        field: 'numeroDocumento',
      };
      return;
    }

    this.loading = true;

    this.authService
      .signup({
        dni: parseInt(numeroDocumento, 10),
        nombres,
        apellidos,
        username,
        password,
        fechaNacimiento: fechaDeNacimiento,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.authService.redirectToHome();
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;

          if (error.status === 400) {
            if (error?.message === 'La persona y/o el usuario ya existen.') {
              this.error = {
                message: 'La persona y/o el usuario ya existen.',
                field: 'username',
              };
            } else if (
              error?.message === 'La persona debe ser mayor de edad.'
            ) {
              this.error = {
                message: 'La persona debe ser mayor de edad.',
                field: 'fechaDeNacimiento',
              };
            } else {
              this.error = {
                message: 'Error inesperado.',
                field: '',
              };
            }
          } else {
            this.error = {
              message: error.message || 'Error inesperado.',
              field: '',
            };
          }
        },
      });
  }
}
