import {Alquiler} from "./alquiler";
import {Persona} from "./persona";

export interface AlquilerTercero extends Alquiler {
  parentezco: string;
  titular: Persona;
}
