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
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Persona } from '../../interfaces/persona';
import { Embarcacion } from '../../interfaces/embarcacion';
import { Amarra } from '../../interfaces/amarra';
import { CrearEmbarcacionFormComponent } from '../../shared/components/forms/crear-embarcacion-form/crear-embarcacion-form.component';

@Component({
  selector: 'app-asignar-amarra-page',
  standalone: true,
  imports: [
    AppPageComponent,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    NgTemplateOutlet,
    CrearEmbarcacionFormComponent,
  ],
  templateUrl: './asignar-amarra-page.component.html',
  styleUrl: './asignar-amarra-page.component.scss',
})
export class AsignarAmarraPageComponent implements OnInit {
  public usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  /* Listar usuarios */
  public listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error: (error: any) => {
        alert(`Error al listar los usuarios: ${error.message}`);
      },
    });
  }

  /* FORMULARIOS PARA ASIGNAR AMARRA */
  private formularios = ['USUARIO', 'EMBARCACION', 'PROPIETARIO', 'AMARRA'];
  public formularioActual = this.formularios[0];

  siguienteFormulario() {
    const indice = this.formularios.indexOf(this.formularioActual);
    if (indice < this.formularios.length - 1) {
      this.formularioActual = this.formularios[indice + 1];
    }
  }

  anteriorFormulario() {
    const indice = this.formularios.indexOf(this.formularioActual);
    if (indice > 0) {
      this.formularioActual = this.formularios[indice - 1];
    }
  }

  /* Asignar amarra */
  public asignarAmarraForm = new FormGroup({
    usuario: new FormControl<Usuario | undefined>(
      undefined,
      Validators.required
    ),
    usuarioEsPropietario: new FormControl<boolean>(false),
    propietario: new FormControl<Persona | undefined>(undefined),
    embarcacion: new FormControl<Embarcacion | undefined>(
      undefined,
      Validators.required
    ),
    amarra: new FormControl<Amarra | undefined>(undefined, Validators.required),
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
    const dni = this.dniBuscado?.value;

    if (!dni) {
      this.listarUsuarios();
    } else {
      this.usuarioService.buscarUsuariosPorDNI(dni).subscribe({
        next: (usuarios: Usuario[]) => {
          // Comprobar si cambió el valor desde que se hizo la búsqueda
          // Puede ocurrir si el usuario escribe un DNI y luego borra el campo
          if (this.dniBuscado?.value === dni) {
            this.usuarios = usuarios;
          }
        },
        error: (error: any) => {
          alert(`Error al buscar el usuario: ${error.message}`);
        },
      });
    }
  }

  /* Elegir usuario */

  public seleccionarUsuario(usuario: Usuario) {
    this.asignarAmarraForm.controls.usuario.setValue(usuario);
    this.siguienteFormulario();
  }

  /* Cargar embarcación */
  public cargarEmbarcacion(embarcacion: any) {
    this.asignarAmarraForm.controls.embarcacion.setValue(embarcacion);
    this.siguienteFormulario();
  }

  /* Elegir amarra */

  /* Asignar amarra */
}
