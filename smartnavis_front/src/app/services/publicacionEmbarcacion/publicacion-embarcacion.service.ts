import {Injectable} from '@angular/core';
import {PublicacionService} from '../publicacion/publicacion.service';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class PublicacionEmbarcacionService extends PublicacionService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.publicacionUrl = '/publicacion/embarcacion';
  }
}
