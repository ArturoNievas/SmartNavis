import { Component } from '@angular/core';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';

@Component({
  selector: 'app-usuario-page',
  standalone: true,
  imports: [AppPageComponent],
  templateUrl: './usuario-page.component.html',
  styleUrl: './usuario-page.component.scss',
})
export class UsuarioPageComponent {}
