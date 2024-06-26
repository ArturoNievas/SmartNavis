import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { EMPTY, Observable, throwError } from 'rxjs';
import { Usuario } from '../../interfaces/usuario';
import { Publicacion } from '../../interfaces/publicacion';
import { Embarcacion } from '../../interfaces/embarcacion';
import { debounce } from 'lodash';
import { Administrador } from '../../interfaces/administrador';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly usuarioUrl: string = '/usuario';
  private readonly adminUrl: string = '/administrador';

  constructor(private apiService: ApiService) {}

  public listarUsuarios(): Observable<Usuario[]> {
    return this.apiService.get<Usuario[]>(this.usuarioUrl);
  }

  public listarEmbarcaciones(usuario: Usuario): Observable<Embarcacion[]> {
    return this.apiService.get<Embarcacion[]>(
      `${this.usuarioUrl}/${usuario.id}/embarcacion`
    );
  }

  public listarPublicaciones(usuario: Usuario): Observable<Publicacion[]> {
    return this.apiService.get<Publicacion[]>(
      `${this.usuarioUrl}/${usuario.id}/publicacion`
    );
  }

  public eliminarUsuario(usuario: Usuario): Observable<unknown> {
    if (!usuario.id) {
      return new Observable((observer) => {
        observer.error(new Error('No es posible eliminar el usuario (no ID).'));
      });
    }

    if (usuario.__esAdmin) {
      return new Observable((observer) => {
        observer.error(
          new Error('No es posible eliminar un usuario administrador.')
        );
      });
    }

    return this.apiService.delete(`${this.usuarioUrl}/${usuario.id}`);
  }

  // Buscar usuario por dni

  private debouncedBuscarUsuariosPorDNI = debounce(
    (dni: string, observer: any) => {
      this._buscarUsuariosPorDNI(dni).subscribe(observer);
    },
    200,
    { leading: false, trailing: true }
  );

  public buscarUsuariosPorDNI(dni: string): Observable<Usuario[]> {
    dni = dni.toString().trim();

    if (!dni) {
      return throwError(
        () =>
          new Error('No es posible buscar usuario por DNI (No se ingresó DNI).')
      );
    }

    return new Observable<Usuario[]>((observer) => {
      this.debouncedBuscarUsuariosPorDNI(dni, observer);
    });
  }

  private _buscarUsuariosPorDNI(dni: string): Observable<Usuario[]> {
    return this.apiService.get<Usuario[]>(`/usuario/buscar/dni/${dni}`);
  }

  // Buscar usuario por username

  private debouncedBuscarUsuariosPorUsername = debounce(
    (username: string, observer: any) => {
      this._buscarUsuariosPorUsername(username).subscribe(observer);
    },
    200,
    { leading: false, trailing: true }
  );

  public buscarUsuariosPorUsername(username: string): Observable<Usuario[]> {
    username = username.trim();

    if (!username) {
      return throwError(
        () =>
          new Error(
            'No es posible buscar usuario por username (No se ingresó username).'
          )
      );
    }

    return new Observable<Usuario[]>((observer) => {
      this.debouncedBuscarUsuariosPorUsername(username, observer);
    });
  }

  private _buscarUsuariosPorUsername(username: string): Observable<Usuario[]> {
    return this.apiService.get<Usuario[]>(
      `/usuario/buscar/username/${username}`
    );
  }

  public promoverUsuario(usuario: Usuario): Observable<Administrador> {
    if (!usuario.id) {
      return throwError(
        () => new Error('No es posible promover al usuario (no ID).')
      );
    }
    return this.apiService.post<Administrador>(
      `${this.usuarioUrl}/${usuario.id}/promover`
    );
  }

  public degradarUsuario(usuario: Usuario): Observable<Usuario> {
    if (!usuario.id) {
      return throwError(
        () => new Error('No es posible degradar al usuario (no ID).')
      );
    }
    return this.apiService.post<Usuario>(
      `${this.adminUrl}/${usuario.id}/degradar`
    );
  }
}
