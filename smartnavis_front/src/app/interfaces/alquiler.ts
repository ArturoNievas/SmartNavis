import {Amarra} from "./amarra";
import {Embarcacion} from "./embarcacion";

export interface Alquiler {
  id?: number;
  amarra?: Amarra;
  embarcacion: Embarcacion;
  inicio: string; // Format: YYYY-MM-DDTHH:mm:ss.sssZ
  fin: string; // Format: YYYY-MM-DDTHH:mm:ss.sssZ
}
