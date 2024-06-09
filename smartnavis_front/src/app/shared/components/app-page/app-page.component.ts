import { Component, Input } from '@angular/core';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { ModalComponent } from '../modal/modal.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-app-page',
  standalone: true,
  imports: [SectionHeaderComponent, RouterLink, NgIf, ModalComponent],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.scss',
})
export class AppPageComponent {
  @Input() public titulo?: string;
  @Input() public subtitulo?: string;

  constructor(public authService: AuthService) {}

  logout() {
    this.authService
      .doLogout()
      .subscribe(() => this.authService.redirectToHome());
  }
}
