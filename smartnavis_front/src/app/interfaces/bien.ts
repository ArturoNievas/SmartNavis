export interface Bien {
  id: number;
  titular: any;
  habilitadoIntercambio: boolean;
  publicado?: boolean;

  dominio?: string;
  patente?: string;
  partida?: string;
  matricula?: string;
}
