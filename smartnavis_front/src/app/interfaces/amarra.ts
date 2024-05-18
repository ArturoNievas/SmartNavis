import {Puerto} from "./puerto";

export interface Amarra {
  id?: number;
  nombre: string;
  eslora: number;
  calado: number;
  manga: number;
  puerto: Puerto;
}
