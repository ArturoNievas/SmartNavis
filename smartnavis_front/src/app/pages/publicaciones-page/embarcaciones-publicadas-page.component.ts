import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppPageComponent } from '../../shared/components/app-page/app-page.component';

import { PublicacionEmbarcacionService } from '../../services/publicacionEmbarcacion/publicacion-embarcacion.service';
import { PublicacionesPageComponent } from './publicaciones-page.component';
import { PublicacionService } from '../../services/publicacion/publicacion.service';
import { PermutaService } from '../../services/permuta/permuta.service';
import { Permuta } from '../../interfaces/permuta';
import { AuthService } from '../../services/auth/auth.service';
import { AmarraService } from '../../services/amarra/amarra.service';
import { Amarra } from '../../interfaces/amarra';
import { AlquilerService } from '../../services/alquiler/alquiler.service';
import { Alquiler } from '../../interfaces/alquiler';
import { Embarcacion } from '../../interfaces/embarcacion';

@Component({
  selector: 'app-embarcaciones-publicadas-page',
  standalone: true,
  imports: [NgFor, NgIf, AppPageComponent, FormsModule],
  templateUrl: '../publicaciones-page/publicaciones-page.component.html',
  styleUrl: '../publicaciones-page/publicaciones-page.component.scss',
})
export class EmbarcacionesPublicadasPageComponent extends PublicacionesPageComponent {
  constructor(
    publicacionService: PublicacionService,
    publicacionEmbarcacionService: PublicacionEmbarcacionService,
    permutaService: PermutaService,
    authService: AuthService,
    private alquilerService: AlquilerService
  ) {
    super(
      publicacionService,
      publicacionEmbarcacionService,
      permutaService,
      authService
    );
    this.titulo = 'Embarcaciones Publicadas';
  }

  private embarcacionesConAmarra: Embarcacion[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.listarAlquileres();
  }

  protected listarAlquileres(): void {
    this.alquilerService
      .listarAlquileres()
      .subscribe((alquileres: Alquiler[]) => {
        this.embarcacionesConAmarra = alquileres.map(
          ({ embarcacion }) => embarcacion
        );
        this.listarPublicacionesSolicitables();
      });
  }

  protected override listarPublicacionesSolicitables(): void {
    this.publicacionesSolicitables = this.publicacionesEmbarcaciones.filter(
      (publicacion) =>
        this.embarcacionesConAmarra.some(({ id }) => id === publicacion.bien.id)
    );

    this.filtrarPublicacionesSolicitablesConPermutasAceptadas();
  }

  public override aceptarPermuta(permuta: Permuta): void {
    super.aceptarPermuta(permuta);
    this.publicacionesSolicitables = this.publicacionesSolicitables.filter(
      (publicacion) => publicacion.id !== permuta.ofertada.id
    );
  }
}
