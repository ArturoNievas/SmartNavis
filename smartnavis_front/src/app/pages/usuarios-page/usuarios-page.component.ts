import { Component, OnInit } from '@angular/core';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { Usuario } from '../../interfaces/usuario';
import { Embarcacion } from '../../interfaces/embarcacion';
import { Publicacion } from '../../interfaces/publicacion';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [NgFor, NgIf, AppPageComponent],
  templateUrl: './usuarios-page.component.html',
  styleUrl: './usuarios-page.component.scss',
})
export class UsuariosPageComponent implements OnInit {
  public titulo: string = 'Usuarios';

  public usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  public ngOnInit(): void {
    this.listarUsuarios();
  }

  public listarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

  public listarEmbarcaciones(usuario: Usuario): void {
    this.usuarioService
      .listarEmbarcaciones(usuario)
      .subscribe((embarcaciones: Embarcacion[]) => {
        usuario.__embarcaciones = embarcaciones;
        if (embarcaciones.length === 0) {
          alert('El usuario no cuenta con embarcaciones.');
        }
      });
  }

  public listarPublicaciones(usuario: Usuario): void {
    this.usuarioService
      .listarPublicaciones(usuario)
      .subscribe((publicaciones: Publicacion[]) => {
        usuario.__publicaciones = publicaciones;
        if (publicaciones.length === 0) {
          alert('El usuario no cuenta con publicaciones.');
        }
      });
  }

  public eliminarUsuario(usuario: Usuario): void {
    const confirmacion = confirm(
      '¿Está seguro que desea eliminar la cuenta del usuario?'
    );
    if (!confirmacion) return;

    this.usuarioService.eliminarUsuario(usuario).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter((u) => u.id !== usuario.id);
      },
      error: (error: any) => {
        alert(`Error al eliminar el usuario: ${error.message}`);
      },
    });
  }
}
