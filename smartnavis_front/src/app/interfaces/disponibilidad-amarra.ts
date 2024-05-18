import {Amarra} from "./amarra";

export interface DisponibilidadAmarra {
  id?: number;
  amarra: Amarra;
  inicio: string; // Format: YYYY-MM-DDTHH:mm:ss.sssZ
  fin: string; // Format: YYYY-MM-DDTHH:mm:ss.sssZ
}
