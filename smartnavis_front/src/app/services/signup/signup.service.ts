import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../interfaces/usuario';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private signupUrl = '/auth/signup';

  constructor(private apiService: ApiService) {}

  public signUp(usuario: {
    nombres: string;
    apellidos: string;
    username: string;
    password: string;
    tipoDocumento: string;
    numeroDocumento: string;
    fechaDeNacimiento: string;
  }): Observable<Usuario> {
    return this.apiService.post<Usuario>(this.signupUrl, usuario);
  }
}
