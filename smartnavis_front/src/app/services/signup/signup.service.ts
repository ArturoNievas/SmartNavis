import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../interfaces/usuario';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private signupUrl = '/auth/signup';
  private usuario?: any;

  constructor(private apiService: ApiService) {}

  public setUsuario({
    dni,
    nombres,
    apellidos,
    fechaNacimiento,
    username,
  }: any): void {
    this.usuario = {
      dni,
      nombres,
      apellidos,
      fechaNacimiento,
      username,
      password: dni.toString().padStart(8, '0'),
    };
  }

  public getUsuario(): any {
    return this.usuario;
  }

  public setPassword(password: string): void {
    if (this.usuario) {
      this.usuario.password = password;
    }
  }

  public getUsername(): string {
    return this.usuario?.username;
  }

  public signUp(): Observable<Usuario> {
    if (!this.usuario) throw new Error('Usuario no definido');

    return this.apiService.post<Usuario>(this.signupUrl, this.usuario);
  }
}
