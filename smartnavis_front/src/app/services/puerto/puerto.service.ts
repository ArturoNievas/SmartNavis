import {Injectable} from '@angular/core';
import {Puerto} from "../../interfaces/puerto";
import {Observable, throwError} from "rxjs";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class PuertoService {
  private readonly puertoUrl: string = '/puerto';

  constructor(private apiService: ApiService) {
  }

  public listarPuertos(): Observable<Puerto[]> {
    return this.apiService.get<Puerto[]>(this.puertoUrl);
  }

  public crearPuerto(puerto: Puerto): Observable<Puerto> {
    return this.apiService.post<Puerto>(this.puertoUrl, puerto);
  }

  public actualizarPuerto(puerto: Puerto): Observable<Puerto> {
    if (!puerto.id) {
      return throwError(() => new Error('No es posible actualizar el puerto (no ID).'));
    }
    return this.apiService.put<Puerto>(`${this.puertoUrl}/${puerto.id}`, puerto);
  }

  public eliminarPuerto(puerto: Puerto): Observable<unknown> {
    if (!puerto.id) {
      return throwError(() => new Error('No es posible eliminar el puerto (no ID).'));
    }
    return this.apiService.delete(`${this.puertoUrl}/${puerto.id}`);
  }
}
