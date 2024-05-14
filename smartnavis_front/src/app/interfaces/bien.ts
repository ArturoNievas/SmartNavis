import { Publicacion } from "./publicacion";

export interface Bien {
    id: number;
    titular: any;
    publicacion?: Publicacion;
    habilitadoIntercambio: boolean;
}