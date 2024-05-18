import {Publicacion} from "./publicacion";
import {Persona} from "./persona";

export interface Bien {
  id?: number;
  titular: Persona;
  habilitadoIntercambio: boolean;

  // Uso interno front.

  __publicacion?: Publicacion;
  __isBienPublicado?: boolean;
}
