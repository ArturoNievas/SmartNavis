import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Usuario } from '../../../interfaces/usuario';
import { Amarra } from '../../../interfaces/amarra';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-formulario-reasignar',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NgTemplateOutlet],
  templateUrl: './formulario-reasignar.component.html',
  styleUrls: ['./formulario-reasignar.component.scss'],
})
export class FormularioReasignarComponent {
  @Input() amarraSeleccionada?: Amarra;
  @Output() enviarFormulario = new EventEmitter<any>();

  protected usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listarUsuarios();
    this.setupParentezcoValidator();
  }

  /* Listar usuarios */
  private listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error: (error: any) => {
        alert(`Error al listar los usuarios: ${error.message}`);
      },
    });
  }

  protected formulario = new FormGroup({
    usuario: new FormControl<Usuario | undefined>(
      undefined,
      Validators.required
    ),
    usuarioEsPropietario: new FormControl<boolean>(false, Validators.required),
    parentezco: new FormControl('', Validators.required),
  });

  protected get usuario() {
    return this.formulario.get('usuario');
  }

  protected get esPropietario() {
    return this.formulario.get('usuarioEsPropietario');
  }

  protected get parentezco() {
    return this.formulario.get('parentezco');
  }

  private setupParentezcoValidator() {
    this.esPropietario?.valueChanges.subscribe((value) => {
      if (value === false) {
        this.parentezco?.setValidators(Validators.required);
      } else {
        this.parentezco?.clearValidators();
      }
      this.parentezco?.updateValueAndValidity();
    });
  }

  protected onSubmit() {
    if (this.formulario.valid) {
      this.enviarFormulario.emit(this.formulario.value);
    }
  }

  protected onCancel() {
    this.enviarFormulario.emit(null);
    this.reset();
  }

  protected reset() {
    this.formulario.reset();
  }

  /* Buscar usuario por DNI */
  protected buscarUsuariosPorDniForm = new FormGroup({
    dni: new FormControl(''),
  });

  private get dniBuscado() {
    return this.buscarUsuariosPorDniForm.get('dni');
  }

  protected buscarUsuariosPorDni() {
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

  protected seleccionarUsuario(usuario: Usuario) {
    this.formulario.controls.usuario.setValue(usuario);
  }
}
