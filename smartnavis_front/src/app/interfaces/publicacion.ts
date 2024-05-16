import {Bien} from "./bien";

export interface Publicacion {
  id?: number;
  titulo: string;
  descripcion: string;
  bien: Bien;
  permutasSolicitadas?: any[]; // FIXME: cambiar tipo
}
