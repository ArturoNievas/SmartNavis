import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Publicacion } from '../../interfaces/publicacion';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  protected publicacionUrl: string;
  protected publicacionesUrl: string;

  constructor(private apiService: ApiService) {
    this.publicacionUrl = '/publicacion';
    this.publicacionesUrl = '/publicacion';
  }

  public listarPublicaciones(): Observable<Publicacion[]> {
    return this.apiService.get<Publicacion[]>(this.publicacionesUrl);
  }

  public crearPublicacion(publicacion: Publicacion): Observable<Publicacion> {
    return this.apiService.post<Publicacion>(this.publicacionUrl, publicacion);
  }

  public actualizarPublicacion(
    publicacion: Publicacion
  ): Observable<Publicacion> {
    if (!publicacion.id) {
      return throwError(
        () => new Error('No es posible actualizar la publicacion (no id).')
      );
    }
    return this.apiService.put<Publicacion>(
      `${this.publicacionUrl}/${publicacion.id}`,
      publicacion
    );
  }

  public eliminarPublicacion(publicacion: Publicacion): Observable<unknown> {
    if (!publicacion.id) {
      return throwError(
        () => new Error('No es posible eliminar la publicacion (no id).')
      );
    }
    return this.apiService.delete(`${this.publicacionUrl}/${publicacion.id}`);
  }

  public publicarPublicacion(
    publicacion: Publicacion
  ): Observable<Publicacion> {
    return this.apiService.post<Publicacion>(
      `${this.publicacionUrl}/${publicacion.bien.id}/publicar`,
      publicacion
    );
  }
}