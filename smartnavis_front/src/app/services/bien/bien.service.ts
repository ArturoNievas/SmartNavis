import { Injectable } from '@angular/core';
import { Publicacion } from '../../interfaces/publicacion';
import { Observable, throwError } from 'rxjs';
import { Bien } from '../../interfaces/bien';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class BienService {
  private bienUrl: string = '/bien';
  private bienesUrl: string = '/bienes';

  constructor(private apiService: ApiService) {}

  public listarBienes(): Observable<Bien[]> {
    return this.apiService.get<Bien[]>(this.bienesUrl);
  }

  public crearBien(bien: Bien): Observable<Bien> {
    return this.apiService.post<Bien>(this.bienUrl, bien);
  }

  public actualizarBien(bien: Bien): Observable<Bien> {
    if (!bien.id) {
      return throwError(
        () => new Error('No es posible actualizar el bien (no id).'),
      );
    }
    return this.apiService.put<Bien>(`${this.bienUrl}/${bien.id}`, bien);
  }

  public eliminarBien(bien: Bien): Observable<unknown> {
    if (!bien.id) {
      return throwError(
        () => new Error('No es posible eliminar el bien (no id).'),
      );
    }
    return this.apiService.delete(`${this.bienUrl}/${bien.id}`);
  }

  public publicarBien(publicacion: Publicacion): Observable<Publicacion> {
    return this.apiService.post<Publicacion>(
      `${this.bienUrl}/${publicacion.bien.id}/publicar`,
      publicacion,
    );
  }
}
