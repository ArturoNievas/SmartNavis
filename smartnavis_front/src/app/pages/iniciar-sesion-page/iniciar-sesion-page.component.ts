import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';

@Component({
  selector: 'app-iniciar-sesion-page',
  standalone: true,
  imports: [AppPageComponent, ReactiveFormsModule],
  templateUrl: './iniciar-sesion-page.component.html',
  styleUrl: './iniciar-sesion-page.component.scss',
})
export class IniciarSesionPageComponent {
  constructor(private authService: AuthService) {}

  error?: {
    message: string;
    field: string;
  };

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.invalid) return;

    if (this.error) this.error = undefined;

    const username = this.username!.value || '';
    const password = this.password!.value || '';

    this.authService.login({ username, password }).subscribe({
      next: () => {
        this.authService.redirectToHome();
      },
      error: (error: any) => {
        if (error.status === 401) {
          this.error = {
            message: 'Credenciales incorrectas.',
            field: 'username',
          };
        } else {
          this.error = {
            message: error.error,
            field: '',
          };
        }
      },
    });
  }
}
