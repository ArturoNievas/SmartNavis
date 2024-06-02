import { Component, OnInit } from '@angular/core';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { Usuario } from '../../interfaces/usuario';
import { Embarcacion } from '../../interfaces/embarcacion';
import { Publicacion } from '../../interfaces/publicacion';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { debounce } from 'lodash';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [NgFor, NgIf, AppPageComponent, ReactiveFormsModule],
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

  public buscarUsuariosForm = new FormGroup({
    dni: new FormControl(''),
  });

  get dniBuscado() {
    return this.buscarUsuariosForm.get('dni');
  }

  public ultimoDniBuscado: string = '';

  public buscarUsuarios() {
    if (this.buscarUsuariosForm.invalid) return;
    if (!this.dniBuscado?.value) return;

    const currentDni = this.dniBuscado.value.toString().trim();
    if (currentDni === this.ultimoDniBuscado) return;
    this.debouncedBuscarUsuariosPorDNI(currentDni);
  }

  private debouncedBuscarUsuariosPorDNI = debounce((dni: string) => {
    this.__buscarUsuariosPorDNI(dni);
  }, 500);

  private __buscarUsuariosPorDNI(dni: string): void {
    console.log(dni);
    this.ultimoDniBuscado = dni;

    this.usuarioService.buscarUsuariosPorDNI(dni).subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error: (error: any) => {
        alert(`Error al buscar el usuario: ${error.message}`);
      },
    });
  }
}
