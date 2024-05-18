import {Bien} from "./bien";
import {Permuta} from "./permuta";

export interface Publicacion {
  id?: number;
  titulo: string;
  descripcion: string;
  bien: Bien;

  // Uso interno front.

  __permutasSolicitadas?: Permuta[];
}
