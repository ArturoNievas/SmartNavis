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
import { SignupService } from '../../services/signup/signup.service';

@Component({
  selector: 'app-registrarse-page',
  standalone: true,
  imports: [AppPageComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './registrarse-page.component.html',
  styleUrl: './registrarse-page.component.scss',
})
export class RegistrarsePageComponent {
  private error?: {
    message: string;
    field: string;
  };

  constructor(private router: Router, private signUpService: SignupService) {}

  private get usuario() {
    return this.signUpService.getUsuario();
  }

  registrarseForm = new FormGroup({
    nombres: new FormControl(this.usuario?.nombres || '', Validators.required),
    apellidos: new FormControl(
      this.usuario?.apellidos || '',
      Validators.required
    ),
    username: new FormControl(
      this.usuario?.username || '',
      Validators.required
    ),
    tipoDocumento: new FormControl(
      this.usuario?.tipoDocumento || 'dni',
      Validators.required
    ),
    numeroDocumento: new FormControl(
      this.usuario?.numeroDocumento || '',
      Validators.required
    ),
    fechaDeNacimiento: new FormControl(this.usuario?.fechaDeNacimiento || '', [
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
    if (this.registrarseForm.invalid) {
      return;
    }

    this.signUpService.setUsuario({
      dni: this.numeroDocumento!.value,
      nombres: this.nombres!.value,
      apellidos: this.apellidos!.value,
      fechaNacimiento: this.fechaDeNacimiento!.value,
      username: this.username!.value,
    });

    this.router.navigate(['/cambiar-contrasena']);
  }
}
