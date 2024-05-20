import {Persona} from "./persona";
import {Publicacion} from "./publicacion";
import {Embarcacion} from "./embarcacion";

export interface Usuario extends Persona {
  username: string;

  // Uso interno front.

  __publicaciones?: Publicacion[];
  __embarcaciones?: Embarcacion[];
}
