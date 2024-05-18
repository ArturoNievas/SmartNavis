export interface Persona {
  id?: number;
  dni: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string; // Format: YYYY-MM-DDTHH:mm:ss.sssZ
  habilitadaIntercambio: boolean;
}
