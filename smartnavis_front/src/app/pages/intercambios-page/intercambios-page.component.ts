import { Component, OnInit } from '@angular/core';
import { Permuta } from '../../interfaces/permuta';
import { PublicacionService } from '../../services/publicacion/publicacion.service';
import { Publicacion } from '../../interfaces/publicacion';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { JsonPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Bien } from '../../interfaces/bien';
import { PermutaService } from '../../services/permuta/permuta.service';

function bienAdapter(bien: Bien | any) {
  const __dominio = bien?.patente || bien?.partida || bien?.matricula;

  return {
    ...bien,
    __dominio,
  };
}

@Component({
  selector: 'app-intercambios-page',
  standalone: true,
  imports: [AppPageComponent, NgIf, NgFor, NgTemplateOutlet, JsonPipe],
  templateUrl: './intercambios-page.component.html',
  styleUrl: './intercambios-page.component.scss',
})
export class IntercambiosPageComponent implements OnInit {
  protected intercambios: any[] = [];

  protected mensajeFormulario?: { tipo: 'exito' | 'error'; mensaje: string };

  constructor(
    private publicacionService: PublicacionService,
    private permutaService: PermutaService
  ) {}

  ngOnInit(): void {
    this.listarPublicaciones();
  }

  private listarPublicaciones() {
    this.publicacionService
      .listarPublicaciones()
      .subscribe((publicaciones: Publicacion[]) => {
        this.listarIntercambios(publicaciones);
      });
  }

  private listarIntercambios(publicaciones: Publicacion[]) {
    this.intercambios = [];

    publicaciones.forEach((publicacion) => {
      this.publicacionService
        .listarSolicitudes(publicacion)
        .subscribe((solicitudes) => {
          if (solicitudes.length) {
            const aceptada: any = solicitudes.find(
              (solicitud) => solicitud.aceptada && !solicitud.finalizada
            );

            if (aceptada) {
              aceptada.solicitada.bien = bienAdapter(aceptada.solicitada.bien);
              aceptada.ofertada.bien = bienAdapter(aceptada.ofertada.bien);

              aceptada.__habilitada = this.intercambioHabilitado(aceptada);

              this.intercambios.push(aceptada);
            }
          }
        });
    });
  }

  private bienHabilitado = (bien: Bien) => {
    return bien.habilitadoIntercambio && bien.titular.habilitadaIntercambio;
  };

  private intercambioHabilitado = (intercambio: Permuta) => {
    return (
      this.bienHabilitado(intercambio.solicitada.bien) &&
      this.bienHabilitado(intercambio.ofertada.bien)
    );
  };

  private resetearMensajeFormulario() {
    this.mensajeFormulario = undefined;
  }

  private mostrarMensaje(tipo: 'exito' | 'error', mensaje: string) {
    this.mensajeFormulario = { tipo, mensaje };
    window.setTimeout(() => {
      this.mensajeFormulario = undefined;
    }, 10000);
  }

  protected registrarIntercambio(intercambio: Permuta) {
    console.log('registrarIntercambio');

    this.resetearMensajeFormulario();
    this.permutaService.registrarPermuta(intercambio).subscribe({
      next: () => {
        console.log('next');
        this.mostrarMensaje('exito', 'Intercambio registrado con éxito.');
        this.listarPublicaciones();
      },
      error: (error: any) => {
        console.error('error: ', error);
        this.mostrarMensaje('error', error.message);
        this.listarPublicaciones();
      },
    });
  }
}
