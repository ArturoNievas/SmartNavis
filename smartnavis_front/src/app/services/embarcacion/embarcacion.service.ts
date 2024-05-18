import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Embarcacion } from '../../interfaces/embarcacion';
import { BienService } from '../bien/bien.service';

@Injectable({
  providedIn: 'root',
})
export class EmbarcacionService extends BienService<Embarcacion> {
  constructor(apiService: ApiService) {
    super(apiService);
    this.bienUrl = '/embarcacion';
    this.bienesUrl = '/embarcaciones';
  }
}
