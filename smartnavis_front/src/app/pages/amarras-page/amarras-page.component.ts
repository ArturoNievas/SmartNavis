import { Component } from '@angular/core';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Amarra } from '../../interfaces/amarra';
import { AmarraService } from '../../services/amarra/amarra.service';
import { Puerto } from '../../interfaces/puerto';
import { PuertoService } from '../../services/puerto/puerto.service';

@Component({
  selector: 'app-amarras-page',
  standalone: true,
  imports: [RouterLink, AppPageComponent, NgIf, NgFor],
  templateUrl: './amarras-page.component.html',
  styleUrl: './amarras-page.component.scss'
})
export class AmarrasPageComponent {
  amarras: Amarra[] = [];

  constructor(
    private amarraService: AmarraService,
  ) {
    this.listarAmarras()
  }

  public listarAmarras() {
    this.amarraService.listarAmarras().subscribe(
      (amarras) => this.amarras = amarras
    );
  }

  public crearAmarra(amarra: Amarra) {

  }

  public actualizarAmarra(amarra: Amarra) {

  }

  public eliminarAmarra(amarra: Amarra) {

  }

}
