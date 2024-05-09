import {Component} from '@angular/core';
import {PuertoService} from "../../services/puerto/puerto.service";
import {Puerto} from "../../interfaces/puerto";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-puertos-page',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './puertos-page.component.html',
  styleUrl: './puertos-page.component.scss'
})
export class PuertosPageComponent {

  public puertos: Puerto[] = [];

  constructor(private puertoService: PuertoService) {
  }


  public listarPuertos(): void {
    this.puertoService.listarPuertos().subscribe((puertos: Puerto[]) => {
      this.puertos = puertos;
    });
  }

  public crearPuerto(nombre: string): void {
    this.puertoService.crearPuerto({nombre}).subscribe((puerto: Puerto) => {
      const index: number = this.puertos.indexOf(puerto);
      if (index === -1) {
        this.puertos.push(puerto);
      }
    });
  }

  public actualizarPuerto(puerto: Puerto): void {
    const nuevoNombre: string | null = prompt('Nuevo nombre?', puerto.nombre);
    if (nuevoNombre !== null) {
      puerto.nombre = nuevoNombre;
      this.puertoService.actualizarPuerto(puerto).subscribe();
    }
  }

  public eliminarPuerto(puerto: Puerto): void {
    this.puertoService.eliminarPuerto(puerto).subscribe(() => {
      const index: number = this.puertos.indexOf(puerto);
      if (index > -1) {
        this.puertos.splice(index, 1);
      }
    });
  }
}
