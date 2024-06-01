import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../interfaces/usuario';
import { Publicacion } from '../../interfaces/publicacion';
import { Embarcacion } from '../../interfaces/embarcacion';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly usuarioUrl: string = '/usuario';

  constructor(private apiService: ApiService) {}

  public obtenerUsuario(id: number): Observable<Usuario> {
    return this.apiService.get<Usuario>(`${this.usuarioUrl}/${id}`);
  }

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

  public buscarUsuarioPorDNI(dni: string) {
    return this.apiService.get<Usuario>(`${this.usuarioUrl}/${dni}`);
  }
}
