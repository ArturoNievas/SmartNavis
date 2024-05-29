import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = '/auth';
  private loginUrl = this.authUrl + '/login';
  private logoutUrl = this.authUrl + '/logout';
  private signupUrl = this.authUrl + '/signup';

  private usuario = null;

  getUsuario() {
    return this.usuario;
  }

  constructor(private apiService: ApiService) {}

  public signup(usuario: {
    nombres: string;
    apellidos: string;
    username: string;
    password: string;
    numeroDocumento: string;
    fechaDeNacimiento: string;
  }): Observable<any> {
    return this.apiService.post(this.signupUrl, usuario);
  }

  public login(usuario: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.apiService.post(this.loginUrl, usuario);
  }

  public logout(): Observable<any> {
    return this.apiService.post(this.logoutUrl, {});
  }
}
