import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { allPages } from '../../config/app.routes';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { AlquilerService } from '../../services/alquiler/alquiler.service';
import { Alquiler } from '../../interfaces/alquiler';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, SectionHeaderComponent, AppPageComponent, NgIf],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  public allPages = allPages;

  protected misAlquileres: Alquiler[] = [];

  constructor(
    public authService: AuthService,
    public alquilerService: AlquilerService
  ) {}

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      this.alquilerService.listarMisAlquileres().subscribe({
        next: (alquileres: Alquiler[]) => {
          this.misAlquileres = alquileres;
        },
        error: (e) => {
          console.error('Error al listar alquileres:', e?.message ?? e);
        },
      });
    }
  }
}
