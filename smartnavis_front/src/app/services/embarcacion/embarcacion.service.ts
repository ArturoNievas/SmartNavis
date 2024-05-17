import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Embarcacion } from '../../interfaces/embarcacion';
import { Publicacion } from '../../interfaces/publicacion';

@Injectable({
  providedIn: 'root',
})
export class EmbarcacionService {
  private embarcacionUrl: string = '/embarcacion';

  constructor(private apiService: ApiService) {}

  public listarEmbarcaciones(): Observable<Embarcacion[]> {
    return this.apiService.get<Embarcacion[]>(this.embarcacionUrl + 'es');
  }

  public crearEmbarcacion(embarcacion: Embarcacion): Observable<Embarcacion> {
    return this.apiService.post<Embarcacion>(this.embarcacionUrl, embarcacion);
  }

  public actualizarEmbarcacion(
    embarcacion: Embarcacion,
  ): Observable<Embarcacion> {
    if (!embarcacion.matricula) {
      return throwError(
        () =>
          new Error('No es posible actualizar la embarcacion (no matricula).'),
      );
    }
    return this.apiService.put<Embarcacion>(
      `${this.embarcacionUrl}/${embarcacion.matricula}`,
      embarcacion,
    );
  }

  public eliminarEmbarcacion(embarcacion: Embarcacion): Observable<unknown> {
    if (!embarcacion.matricula) {
      return throwError(
        () =>
          new Error('No es posible eliminar la embarcacion (no matricula).'),
      );
    }
    return this.apiService.delete(
      `${this.embarcacionUrl}/${embarcacion.matricula}`,
    );
  }

  public publicarEmbarcacion(
    publicacion: Publicacion,
  ): Observable<Publicacion> {
    return this.apiService.post<Publicacion>(
      `${this.embarcacionUrl}/${publicacion.bien.id}/publicar`,
      publicacion,
    );
  }
}
