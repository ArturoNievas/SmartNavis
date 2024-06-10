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
import { PropietarioFormComponent } from './components/propietario-form/propietario-form.component';

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
    PropietarioFormComponent,
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

  @ViewChild('propietarioForm', { static: false })
  propietarioForm!: PropietarioFormComponent;

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

    // Propietario
    usuarioEsPropietario: new FormControl<boolean>(false),
    propietario: new FormControl<Persona | undefined>(undefined),
    parentezco: new FormControl<string | undefined>(''),
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

  get usuarioEsPropietario() {
    return this.asignarAmarraForm.get('usuarioEsPropietario');
  }

  get propietario() {
    return this.asignarAmarraForm.get('propietario');
  }

  get parentezco() {
    return this.asignarAmarraForm.get('parentezco');
  }

  /* Manejo de formularios */
  protected formularios = [
    'USUARIO',
    'EMBARCACION',
    'PROPIETARIO',
    'AMARRA',
    'RESUMEN',
  ];

  public formularioActual = this.formularios[0];
  siguienteFormulario() {
    const indice = this.formularios.indexOf(this.formularioActual);
    if (indice < this.formularios.length - 1) {
      this.formularioActual = this.formularios[indice + 1];
    }

    this.actualizarFormulario();
  }

  anteriorFormulario() {
    const indice = this.formularios.indexOf(this.formularioActual);
    if (indice > 0) {
      this.formularioActual = this.formularios[indice - 1];
    }

    this.actualizarFormulario();
  }

  private actualizarFormulario() {
    console.log(this.asignarAmarraForm.value);

    if (this.formularioActual === 'PROPIETARIO') {
      this.actualizarPropietarioForm();
    }

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

    this.propietarioForm.reset();
    this.parentezcoForm.reset();
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
  protected seleccionarUsuario(usuario: Usuario) {
    this.asignarAmarraForm.controls.usuario.setValue(usuario);
  }

  /* Cargar embarcación */
  protected cargarEmbarcacion(embarcacion: any) {
    this.asignarAmarraForm.controls.embarcacion.setValue(embarcacion);
  }

  protected usuarioEsPropietarioChangeHandler() {
    const usuarioEsPropietario = this.usuarioEsPropietario?.value;

    if (usuarioEsPropietario) {
      this.propietario?.setValue(this.usuario?.value as Persona);
      this.propietarioForm.setFormulario(this.usuario?.value as Persona);
      this.propietarioForm.disable();
    } else {
      this.propietario?.setValue(undefined);
      this.propietarioForm.reset();
      this.propietarioForm.enable();
    }
  }

  protected actualizarPropietarioForm() {
    const usuarioEsPropietario = this.usuarioEsPropietario?.value;

    if (usuarioEsPropietario) {
      this.propietario?.setValue(this.usuario?.value as Persona);
      this.propietarioForm.setFormulario(this.usuario?.value as Persona);
      this.propietarioForm.disable();
      this.parentezcoForm.reset();
      this.cargarParentezco();
    } else {
      if (this.propietario?.value) {
        this.propietarioForm.enable();
        this.propietarioForm.setFormulario(this.propietario?.value as Persona);
      } else {
        this.propietarioForm.enable();
        this.propietarioForm.reset();
      }
    }
  }

  /* Cargar propietario */
  protected parentezcoForm = new FormGroup({
    parentezco: new FormControl('', Validators.required),
  });

  get parentezcoFormParentezco() {
    return this.parentezcoForm.get('parentezco');
  }

  protected cargarPropietario(propietario: any) {
    this.asignarAmarraForm.controls.propietario.setValue(propietario);
  }

  protected cargarParentezco() {
    this.asignarAmarraForm.controls.parentezco.setValue(
      this.parentezcoFormParentezco?.value
    );
  }

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
    if (this.usuarioEsPropietario?.value) {
      this.asignarAmarraTitular();
    } else {
      this.asignarAmarraTercero();
    }
  }

  private asignarAmarraTitular() {
    const { usuario, embarcacion, amarra } = this.asignarAmarraForm.value;
    if (!usuario?.id || !embarcacion || !amarra?.id) {
      alert('Faltan datos para asignar la amarra');
      return;
    }

    this.amarraService
      .asignarAmarraTitular({
        titularId: usuario.id,
        amarraId: amarra.id,
        embarcacion,
      })
      .subscribe({
        next: () => {
          this.asignarAmarraExitoso();
        },
        error: (error: any) => {
          this.asignarAmarraFallido(error);
        },
      });
  }

  private asignarAmarraTercero() {
    const { usuario, embarcacion, amarra, propietario, parentezco } =
      this.asignarAmarraForm.value;
    if (
      !usuario?.id ||
      !embarcacion ||
      !amarra?.id ||
      !propietario?.dni ||
      !parentezco
    ) {
      alert('Faltan datos para asignar la amarra');
      return;
    }

    this.amarraService
      .asignarAmarraTercero({
        titularId: usuario.id,
        duenio: propietario,
        parentezco,
        embarcacion,
        amarraId: amarra.id,
      })
      .subscribe({
        next: () => {
          this.asignarAmarraExitoso();
        },
        error: (error: any) => {
          this.asignarAmarraFallido(error);
        },
      });
  }

  private asignarAmarraExitoso() {
    alert('Amarra asignada correctamente');
    this.reiniciarFormulario();
  }

  private asignarAmarraFallido(error: any) {
    alert(`Error al asignar la amarra: ${error.message}`);
  }
}
