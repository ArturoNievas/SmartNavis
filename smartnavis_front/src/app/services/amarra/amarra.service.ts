import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, throwError } from 'rxjs';
import { Amarra } from '../../interfaces/amarra';

@Injectable({
  providedIn: 'root'
})
export class AmarraService {
  private baseUrl = '/amarra';

  constructor(private apiService: ApiService) { }

  public listarAmarras(): Observable<Amarra[]> {
    return this.apiService.get(this.baseUrl);
  }

  public crearAmarra(amarra: Amarra): Observable<Amarra> {
    return this.apiService.post(this.baseUrl, amarra);
  }

  public actualizarAmarra(amarra: Amarra): Observable<Amarra> {
    if (!amarra.id) {
      return throwError(
        () => new Error('No es posible actualizar la amarra (no id)')
      );
    }
    return this.apiService.put(`${this.baseUrl}/${amarra.id}`, amarra);
  }

  public eliminarAmarra(amarra: Amarra): Observable<unknown> {
    if (!amarra.id) {
      return throwError(
        () => new Error('No es posible eliminar la amarra (no id)')
      );
    }
    return this.apiService.delete(`${this.baseUrl}/${amarra.id}`);
  }
}