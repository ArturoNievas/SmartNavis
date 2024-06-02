import { Component, OnInit } from '@angular/core';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Persona } from '../../interfaces/persona';
import { Embarcacion } from '../../interfaces/embarcacion';
import { Amarra } from '../../interfaces/amarra';

@Component({
  selector: 'app-asignar-amarra-page',
  standalone: true,
  imports: [AppPageComponent, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './asignar-amarra-page.component.html',
  styleUrl: './asignar-amarra-page.component.scss',
})
export class AsignarAmarraPageComponent implements OnInit {
  public usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  public asignarAmarraForm = new FormGroup({
    usuario: new FormControl<Usuario | null>(null, Validators.required),
    usuarioEsPropietario: new FormControl<boolean>(false),
    propietario: new FormControl<Persona | null>(null),
    embarcacion: new FormControl<Embarcacion | null>(null, Validators.required),
    amarra: new FormControl<Amarra | null>(null, Validators.required),
  });

  get usuario() {
    return this.asignarAmarraForm.get('usuario');
  }

  get usuarioEsPropietario() {
    return this.asignarAmarraForm.get('usuarioEsPropietario');
  }

  get propietario() {
    return this.asignarAmarraForm.get('propietario');
  }

  get embarcacion() {
    return this.asignarAmarraForm.get('embarcacion');
  }

  get amarra() {
    return this.asignarAmarraForm.get('amarra');
  }

  /* Buscar usuario por DNI */

  public buscarUsuariosPorDniForm = new FormGroup({
    dni: new FormControl(''),
  });

  get dniBuscado() {
    return this.buscarUsuariosPorDniForm.get('dni');
  }

  public buscarUsuariosPorDni() {
    if (this.buscarUsuariosPorDniForm.invalid) return;
    if (!this.dniBuscado?.value) return;

    this.usuarioService.buscarUsuariosPorDNI(this.dniBuscado.value).subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error: (error: any) => {
        alert(`Error al buscar el usuario: ${error.message}`);
      },
    });
  }
}
