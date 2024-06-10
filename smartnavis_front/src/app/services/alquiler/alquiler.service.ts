import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Alquiler } from '../../interfaces/alquiler';

@Injectable({
  providedIn: 'root',
})
export class AlquilerService {
  private baseUrl = '/alquiler';

  constructor(private apiService: ApiService) {}

  public listarMisAlquileres(): Observable<Alquiler[]> {
    return this.apiService.get(`${this.baseUrl}/me`);
  }
}
