import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { PuertoService } from '../../services/puerto/puerto.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Amarra } from '../../interfaces/amarra';
import { CommonModule } from '@angular/common';
import { Puerto } from '../../interfaces/puerto';

enum TipoAlerta {
  error = 'error',
  info = 'info',
}

@Component({
  selector: 'app-amarras-disponibles-page',
  standalone: true,
  imports: [CommonModule, RouterLink, AppPageComponent, ReactiveFormsModule],
  templateUrl: './amarras-disponibles-page.component.html',
  styleUrl: './amarras-disponibles-page.component.scss',
})
export class AmarrasDisponiblesPageComponent implements OnInit {
  amarras: Amarra[] = [];
  puertos: Puerto[] = [];

  formularioFiltro = new FormGroup({
    idPuerto: new FormControl(-1),
    manga: new FormControl<number | null>(null),
    eslora: new FormControl<number | null>(null),
    calado: new FormControl<number | null>(null),
  });

  mensajeAlerta?: {
    tipo: TipoAlerta;
    mensaje: string;
  };

  constructor(private puertoService: PuertoService) {}

  ngOnInit(): void {
    this.listarPuertos();
  }

  public listarPuertos() {
    this.puertoService.listarPuertos().subscribe((puertos) => {
      this.puertos = puertos;
    });
  }

  listarAmarras() {
    if (!this.formularioValido()) {
      this.amarras = [];
      this.mostrarMensaje(TipoAlerta.error, 'Por favor, seleccione un puerto.');
      return;
    }
    let formulario = { ...this.formularioFiltro.value };
    let puerto = this.puertos.find((p) => p.id == formulario.idPuerto)!!;
    this.puertoService
      .listarAmarrasDisponibles(
        puerto,
        formulario.manga ?? null,
        formulario.eslora ?? null,
        formulario.calado ?? null
      )
      .subscribe({
        next: (amarras) => {
          if (!amarras || !amarras.length) {
            this.amarras = [];
            return this.mostrarMensaje(
              TipoAlerta.info,
              'Ninguna amarra coincide con el criterio de búsqueda.'
            );
          }
          this.amarras = amarras;
        },
        error: (error: Error) => {
          this.amarras = [];
          this.mostrarMensaje(TipoAlerta.error, error.message);
        },
      });
  }

  formularioValido(): boolean {
    return this.formularioFiltro.value.idPuerto != -1;
  }

  mostrarMensaje(tipo: TipoAlerta, mensaje: string) {
    this.mensajeAlerta = { tipo, mensaje };
  }
}
