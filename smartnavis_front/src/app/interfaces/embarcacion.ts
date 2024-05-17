import { Bien } from './bien';

export interface Embarcacion extends Bien {
  matricula: string;
  nombre: string;
  eslora: number;
  calado: number;
  manga: number;
}
