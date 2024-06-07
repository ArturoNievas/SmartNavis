import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { CrearEmbarcacionFormComponent } from '../../shared/components/forms/crear-embarcacion-form/crear-embarcacion-form.component';

import { AmarraService } from '../../services/amarra/amarra.service';
import { PuertoService } from '../../services/puerto/puerto.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

import { Amarra } from '../../interfaces/amarra';
import { Embarcacion } from '../../interfaces/embarcacion';
import { Persona } from '../../interfaces/persona';
import { Puerto } from '../../interfaces/puerto';
import { Usuario } from '../../interfaces/usuario';

import { allPages } from '../../config/app.routes';

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
    RouterLink,
  ],
  templateUrl: './asignar-amarra-page.component.html',
  styleUrl: './asignar-amarra-page.component.scss',
})
export class AsignarAmarraPageComponent implements OnInit {
  public allPages = allPages;
  public usuarios: Usuario[] = [];

  @ViewChild('crearEmbarcacionForm', { static: false })
  crearEmbarcacionForm!: CrearEmbarcacionFormComponent;

  constructor(
    private usuarioService: UsuarioService,
    private puertoService: PuertoService,
    private amarraService: AmarraService
  ) {}

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
  public asignarAmarraForm = new FormGroup({
    usuario: new FormControl<Usuario | undefined>(
      undefined,
      Validators.required
    ),
    embarcacion: new FormControl<Embarcacion | undefined>(
      undefined,
      Validators.required
    ),
    amarra: new FormControl<Amarra | undefined>(undefined, Validators.required),
  });

  get usuario() {
    return this.asignarAmarraForm.get('usuario');
  }

  get embarcacion() {
    return this.asignarAmarraForm.get('embarcacion');
  }

  get amarra() {
    return this.asignarAmarraForm.get('amarra');
  }

  get formularios() {
    return ['USUARIO', 'EMBARCACION', 'AMARRA', 'RESUMEN'];
  }

  public formularioActual = this.formularios[0];
  siguienteFormulario() {
    const indice = this.formularios.indexOf(this.formularioActual);
    if (indice < this.formularios.length - 1) {
      this.formularioActual = this.formularios[indice + 1];
    }

    this.actualizarFormularioActual();
  }

  anteriorFormulario() {
    const indice = this.formularios.indexOf(this.formularioActual);
    if (indice > 0) {
      this.formularioActual = this.formularios[indice - 1];
    }

    this.actualizarFormularioActual();
  }

  private actualizarFormularioActual() {
    console.log(this.asignarAmarraForm.value);

    if (this.formularioActual === 'AMARRA') {
      this.listarPuertos();
      this.cargarAmarras();
    }
  }

  private reiniciarFormulario = () => {
    this.asignarAmarraForm.reset();
    this.formularioActual = this.formularios[0];

    this.buscarUsuariosPorDniForm.reset();

    this.listarUsuarios();

    this.puerto = undefined;
    this.amarrasDisponibles = [];

    this.crearEmbarcacionForm.reset();
  };

  /* Buscar usuario por DNI */
  public buscarUsuariosPorDniForm = new FormGroup({
    dni: new FormControl(''),
  });

  get dniBuscado() {
    return this.buscarUsuariosPorDniForm.get('dni');
  }

  public buscarUsuariosPorDni() {
    if (!this.dniBuscado?.value) {
      this.listarUsuarios();
    } else {
      this.usuarioService
        .buscarUsuariosPorDNI(this.dniBuscado.value)
        .subscribe({
          next: (usuarios: Usuario[]) => {
            if (this.dniBuscado?.value) {
              this.usuarios = usuarios;
            }
          },
          error: (error: any) => {
            alert(`Error al buscar el usuario: ${error.message}`);
          },
        });
    }
  }

  /* Seleccionar usuario */
  public seleccionarUsuario(usuario: Usuario) {
    this.asignarAmarraForm.controls.usuario.setValue(usuario);
  }

  /* Cargar embarcación */
  public cargarEmbarcacion(embarcacion: any) {
    this.asignarAmarraForm.controls.embarcacion.setValue(embarcacion);
  }

  /* Cargar propietario */

  /* Elegir amarra */
  public puertos: Puerto[] = [];
  public puerto?: Puerto | undefined = undefined;

  public amarrasDisponibles: any = [];

  public listarPuertos() {
    this.puertoService
      .listarPuertos()
      .subscribe((puertos) => (this.puertos = puertos));
  }

  public seleccionarPuerto(e: any) {
    const idPuerto = e.target.value;

    if (idPuerto != String(this.puerto?.id)) {
      this.puerto = this.puertos.find((p: Puerto) => p.id == Number(idPuerto));

      this.cargarAmarras();
    }
  }

  public cargarAmarras() {
    if (!this.puerto || !this.embarcacion) {
      this.amarrasDisponibles = [];
      return;
    }

    this.puertoService.listarAmarras(this.puerto).subscribe({
      next: (amarras: Amarra[]) => {
        this.amarrasDisponibles = this.filtrarAmarrasDisponibles(amarras);
      },
      error: (error: any) => {
        alert(`Error al cargar las amarras: ${error.message}`);
      },
    });
  }

  private filtrarAmarrasDisponibles(amarras: Amarra[]): Amarra[] {
    return amarras.filter(
      (amarra: Amarra) =>
        this.amarraEstaDisponible(amarra) &&
        this.amarraDimensionesValidas(amarra)
    );
  }

  private amarraEstaDisponible(amarra: Amarra): boolean {
    return Boolean(amarra?.disponible);
  }

  private amarraDimensionesValidas = (amarra: Amarra): boolean => {
    if (!this.embarcacion) return false;
    if (!this.embarcacion.valid) return false;
    const { eslora, manga, calado } = this.embarcacion.value!;

    return (
      amarra?.eslora >= eslora &&
      amarra?.manga >= manga &&
      amarra?.calado >= calado
    );
  };

  public seleccionarAmarra(amarra: Amarra) {
    this.asignarAmarraForm.controls.amarra.setValue(amarra);
  }

  /* Asignar amarra */
  public asignarAmarra() {
    const { usuario, embarcacion, amarra } = this.asignarAmarraForm.value;

    if (!usuario?.id || !embarcacion || !amarra?.id) {
      alert('Faltan datos para asignar la amarra');
      return;
    }

    this.amarraService
      .asignarAmarraTitular(usuario.id, amarra.id, embarcacion)
      .subscribe({
        next: () => {
          alert('Amarra asignada correctamente');
          this.reiniciarFormulario();
        },
        error: (error: any) => {
          alert(`Error al asignar la amarra: ${error.message}`);
        },
      });
  }
}
