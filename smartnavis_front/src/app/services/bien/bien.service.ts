import { Injectable } from '@angular/core';
import { Publicacion } from '../../interfaces/publicacion';
import { Observable, throwError } from 'rxjs';
import { Bien } from '../../interfaces/bien';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class BienService<T extends Bien> {
  public bienUrl: string = '/bien';

  constructor(public apiService: ApiService) {}

  public listarBienes(): Observable<T[]> {
    return this.apiService.get<T[]>(this.bienUrl);
  }

  public crearBien(bien: T): Observable<T> {
    return this.apiService.post<T>(this.bienUrl, bien);
  }

  public actualizarBien(bien: T): Observable<T> {
    if (!bien.id) {
      return throwError(
        () => new Error('No es posible actualizar el bien (no id).')
      );
    }
    return this.apiService.put<T>(`${this.bienUrl}/${bien.id}`, bien);
  }

  public eliminarBien(bien: T): Observable<unknown> {
    if (!bien.id) {
      return throwError(
        () => new Error('No es posible eliminar el bien (no id).')
      );
    }
    return this.apiService.delete(`${this.bienUrl}/${bien.id}`);
  }

  public publicarBien(publicacion: Publicacion): Observable<Publicacion> {
    return this.apiService.post<Publicacion>(
      `${this.bienUrl}/${publicacion.bien.id}/publicar`,
      publicacion
    );
  }
}
