export interface Me {
  id: number;
  dni: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string; // Format: YYYY-MM-DDT00:00:00.000+00:00
  habilitadaIntercambio: boolean;
  username: string;
  role: 'ADMINISTRADOR' | 'USUARIO';
}
