import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {Permuta} from '../../interfaces/permuta';
import {Observable} from 'rxjs';
import {Bien} from '../../interfaces/bien';
import {Publicacion} from '../../interfaces/publicacion';

/* public listarPublicaciones(): Observable<Publicacion[]> {
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
    const { __permutasSolicitadas, ..._publicacion } = publicacion;

    console.log(_publicacion);

    return this.apiService.post<Publicacion>(
      `${this.publicacionUrl}/${publicacion.bien.id}/publicar`,
      _publicacion
    );
  }

  public solicitarIntercambio(
    publicacionSolicitada: Publicacion,
    publicacionOfertada: Publicacion
  ): any {
    return this.apiService.post(
      `${this.publicacionUrl}/${publicacionSolicitada.bien.id}/solicitar`,
      publicacionOfertada.id
    );
  } */

/* POST ../permuta/{:id}/aceptar */

@Injectable({
  providedIn: 'root',
})
export class PermutaService {
  protected readonly permutaUrl: string = '/permuta';

  constructor(private apiService: ApiService) {
  }

  public aceptarPermuta(permuta: Permuta): Observable<any> {
    return this.apiService.post<null>(
      `${this.permutaUrl}/${permuta.id}/aceptar`,
      null
    );
  }
}

interface _Permuta extends Permuta {
  [key: string]: any;
}

const removeFrontAttrs = (permuta: _Permuta): Permuta => {
  for (const key in permuta) {
    if (key.startsWith('__')) {
      delete permuta[key as keyof Permuta];
    }
    if (typeof permuta[key] === 'object') {
      permuta[key] = removeFrontAttrs(permuta[key]);
    }
  }

  return permuta as Permuta;
};
