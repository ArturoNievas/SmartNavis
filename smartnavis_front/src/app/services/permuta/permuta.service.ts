import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Permuta } from '../../interfaces/permuta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermutaService {
  protected readonly permutaUrl: string = '/permuta';

  constructor(private apiService: ApiService) {}

  public aceptarPermuta(permuta: Permuta): Observable<any> {
    return this.apiService.post<null>(
      `${this.permutaUrl}/${permuta.id}/aceptar`,
      null
    );
  }

  public registrarPermuta(permuta: Permuta): Observable<Permuta> {
    return this.apiService.post<Permuta>(
      `${this.permutaUrl}/${permuta.id}/registrar`
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
