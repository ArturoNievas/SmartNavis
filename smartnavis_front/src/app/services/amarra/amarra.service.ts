import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, throwError } from 'rxjs';
import { Amarra } from '../../interfaces/amarra';
import { Embarcacion } from '../../interfaces/embarcacion';
import { Persona } from '../../interfaces/persona';

@Injectable({
  providedIn: 'root',
})
export class AmarraService {
  private baseUrl = '/amarra';

  constructor(private apiService: ApiService) {}

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

  public asignarAmarraTitular({
    titularId,
    amarraId,
    embarcacion,
  }: {
    titularId: number;
    amarraId: number;
    embarcacion: Embarcacion;
  }): Observable<unknown> {
    return this.apiService.post(`${this.baseUrl}/${amarraId}/alquilarTitular`, {
      titularId,
      embarcacion,
    });
  }

  public asignarAmarraTercero({
    titularId,
    duenio,
    parentezco,
    amarraId,
    embarcacion,
  }: {
    titularId: number;
    duenio: Persona;
    parentezco: string;
    amarraId: number;
    embarcacion: Embarcacion;
  }) {
    return this.apiService.post(`${this.baseUrl}/${amarraId}/alquilarTercero`, {
      duenio,
      parentezco,
      titularId,
      embarcacion,
    });
  }

  public desasignarAmarra(amarra: Amarra): Observable<unknown> {
    if (!amarra.id) {
      return throwError(
        () => new Error('No es posible desasignar la amarra (no id)')
      );
    }

    return this.apiService.put(`${this.baseUrl}/${amarra.id}/liberar`, {});
  }

  public reasignarAmarra({
    amarraId,
    usuarioId,
    usuarioEsPropietario,
    parentezco,
  }: {
    amarraId: number;
    usuarioId: number;
    usuarioEsPropietario: boolean;
    parentezco: string | null;
  }) {
    if (usuarioEsPropietario) {
      return this.reasignarAmarraTitular(amarraId, usuarioId);
    } else {
      return this.reasignarAmarraTercero(amarraId, usuarioId, parentezco!);
    }
  }

  private reasignarAmarraTitular(amarraId: number, usuarioId: number) {
    console.log('Reasignar titular');
    return this.apiService.post(
      `${this.baseUrl}/${amarraId}/reasignarTitular`,
      {
        usuarioId,
      }
    );
  }

  private reasignarAmarraTercero(
    amarraId: number,
    usuarioId: number,
    parentezco: string
  ) {
    console.log('Reasignar tercero');
    return this.apiService.post(
      `${this.baseUrl}/${amarraId}/reasignarTercero`,
      {
        usuarioId,
        parentezco,
      }
    );
  }
}
