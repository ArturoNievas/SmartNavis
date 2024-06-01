import { Component, OnInit } from '@angular/core';
import { AppPageComponent } from '../../shared/components/app-page/app-page.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { allPages } from '../../config/app.routes';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

@Component({
  selector: 'app-usuario-page',
  standalone: true,
  imports: [AppPageComponent, RouterLink],
  templateUrl: './usuario-page.component.html',
  styleUrl: './usuario-page.component.scss',
})
export class UsuarioPageComponent implements OnInit {
  public allPages = allPages;
  public titulo: string = 'Perfil de usuario';

  public idUsuario?: string;

  public usuario?: Usuario;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idUsuario = params['idUsuario'];
      this.usuarioService.obtenerUsuario(idUsuario).subscribe((usuario) => {
        this.idUsuario = idUsuario;
        this.usuario = usuario;

        this.titulo = `Perfil de ${capitalize(usuario.username)}`;
      });
    });
  }
}
