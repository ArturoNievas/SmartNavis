import { Component, ViewChild } from '@angular/core';
import { PuertoService } from '../../services/puerto/puerto.service';
import { Puerto } from '../../interfaces/puerto';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';

@Component({
  selector: 'app-puertos-page',
  standalone: true,
  imports: [RouterLink, NgIf, NgForOf, AppPageComponent],
  templateUrl: './puertos-page.component.html',
  styleUrl: './puertos-page.component.scss',
})
export class PuertosPageComponent {
  public puertos: Puerto[] = [];

  @ViewChild('puertoNombreInput', { static: false })
  puertoNombreInput!: HTMLInputElement;

  constructor(private puertoService: PuertoService) {}

  public listarPuertos(): void {
    this.puertoService.listarPuertos().subscribe((puertos: Puerto[]) => {
      this.puertos = puertos;
    });
  }

  public crearPuerto(nombre: string): void {
    if (!nombre) {
      return;
    }

    this.puertoService.crearPuerto({ nombre }).subscribe({
      next: (puerto: Puerto) => {
        const index: number = this.puertos.indexOf(puerto);
        if (index === -1) {
          this.puertos.push(puerto);
          this.puertoNombreInput.value = '';
        }
      },
      error: (error: any) => {
        alert('Error al crear el puerto: ' + error?.message);
      },
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
    if (!confirm('¿Seguro que desea eliminar el puerto?')) {
      return;
    }

    this.puertoService.eliminarPuerto(puerto).subscribe({
      next: () => {
        const index: number = this.puertos.indexOf(puerto);
        if (index > -1) {
          this.puertos.splice(index, 1);
        }
      },
      error: (error: any) => {
        alert('Error al eliminar el puerto: ' + error?.message);
      },
    });
  }
}
