import {Usuario} from "./usuario";
import {Permuta} from "./permuta";

export interface Mensaje {
  id?: number;
  texto: string;
  fecha: string; // Format: YYYY-MM-DDTHH:mm:ss.sssZ
  permuta: Permuta;
  autor: Usuario;
}
