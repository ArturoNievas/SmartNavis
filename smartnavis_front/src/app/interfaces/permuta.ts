import {Publicacion} from "./publicacion";

export interface Permuta {
  id?: number;
  solicitada: Publicacion;
  ofertada: Publicacion;
  pendiente: boolean;
  aceptada: boolean;
  registrada: boolean;
  finalizada: boolean;
}
