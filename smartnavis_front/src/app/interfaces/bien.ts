import {Publicacion} from "./publicacion";
import {Persona} from "./persona";

export interface Bien {
  id?: number;
  titular: Persona;
  habilitadoIntercambio: boolean;

  // Uso interno front.

  __publicacion?: Publicacion;
  __isBienPublicado?: boolean;
  __dominio?: string;
  __patente?: string;
  __partida?: string;
  __matricula?: string;
}
