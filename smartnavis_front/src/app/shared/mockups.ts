/*

export interface Bien {
    id: number;
    titular: any;
    publicacion?: Publicacion;
    habilitadoIntercambio: boolean;
}

export interface Embarcacion extends Bien {
    matricula: string;
    nombre: string;
    eslora: number;
    calado: number;
    manga: number;
}

export interface Publicacion {
  id: number;
  titulo: string;
  descripcion: string;
  bien: any;
  __permutasSolicitadas: any[];
}
*/

import { Bien } from "../interfaces/bien"

const bien = (id: number) => {
    return {
        id: id,
        titular: null,
        publicacion: null,
        habilitadoIntercambio: true,
    }
}

const embarcacion = (id: number) => {
    return {
        ...bien(id),
        matricula: `MAT-${id}`,
        nombre: `Embarcacion ${id}`,
        eslora: 10,
        calado: 5,
        manga: 3,
    }
}

export const generateMockups = (mockup: any, quantity: number) => {
    return Array.from({ length: quantity }, (_, index) => mockup(index + 1))
}

export const mockups = {
    bien,
    embarcacion,
}
