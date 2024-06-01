import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { PuertosPageComponent } from '../pages/puertos-page/puertos-page.component';
import { EmbarcacionesPageComponent } from '../pages/embarcaciones-page/embarcaciones-page.component';
import { BienesPageComponent } from '../pages/bienes-page/bienes-page.component';
import { PublicacionesPageComponent } from '../pages/publicaciones-page/publicaciones-page.component';
import { EmbarcacionesPublicadasPageComponent } from '../pages/publicaciones-page/embarcaciones-publicadas-page.component';
import { UsuariosPageComponent } from '../pages/usuarios-page/usuarios-page.component';
import { RegistrarsePageComponent } from '../pages/registrarse-page/registrarse-page.component';
import { IniciarSesionPageComponent } from '../pages/iniciar-sesion-page/iniciar-sesion-page.component';
import { AmarrasPageComponent } from '../pages/amarras-page/amarras-page.component';
import { UsuarioPageComponent } from '../pages/usuario-page/usuario-page.component';
import { UsuarioEmbarcacionesPageComponent } from '../pages/usuario-embarcaciones-page/usuario-embarcaciones-page.component';
import { UsuarioPublicacionesPageComponent } from '../pages/usuario-publicaciones-page/usuario-publicaciones-page.component';

const pages: any = {
  homepage: {
    path: '',
    title: 'Homepage',
    label: 'Inicio',
    component: HomePageComponent,
  },

  /* Manejo de sesiones */
  registrarse: {
    path: 'registrarse',
    title: 'Registrarse',
    component: RegistrarsePageComponent,
  },

  iniciarSesion: {
    path: 'iniciar-sesion',
    title: 'Iniciar sesión',
    component: IniciarSesionPageComponent,
  },

  /* Administración de puertos */

  puertos: {
    path: 'puertos',
    title: 'Puertos',
    component: PuertosPageComponent,
  },

  /* Administración de amarras */

  amarras: {
    path: 'amarras',
    title: 'Amarras',
    component: AmarrasPageComponent,
  },

  /* Administración de usuarios */

  usuarios: {
    path: 'usuarios',
    title: 'Usuarios',
    label: 'Lista de Usuarios',
    component: UsuariosPageComponent,
  },

  usuario: {
    path: 'usuarios/:idUsuario',
    title: 'Perfil de usuario',
    component: UsuarioPageComponent,
  },

  embarcacionesDeUsuario: {
    path: 'usuarios/:idUsuario/embarcaciones',
    relativePath: 'embarcaciones',
    title: 'Embarcaciones de usuario',
    component: UsuarioEmbarcacionesPageComponent,
  },

  publicacionesDeUsuario: {
    path: 'usuarios/:idUsuario/publicaciones',
    relativePath: 'publicaciones',
    title: 'Publicaciones de usuario',
    component: UsuarioPublicacionesPageComponent,
  },

  /* Bienes */

  bienes: {
    path: 'bienes',
    title: 'Bienes',
    label: 'Lista de bienes',
    component: BienesPageComponent,
  },

  embarcaciones: {
    path: 'embarcaciones',
    title: 'Embarcaciones',
    label: 'Lista de embarcaciones',
    component: EmbarcacionesPageComponent,
  },

  /* Publicaciones */

  publicaciones: {
    path: 'publicaciones',
    title: 'Publicaciones',
    label: 'Publicaciones',
    component: PublicacionesPageComponent,
  },

  embarcacionesPublicadas: {
    path: 'publicaciones/embarcaciones',
    title: 'Publicaciones',
    label: 'Publicaciones de embarcaciones',
    component: EmbarcacionesPublicadasPageComponent,
  },
};

const addLabelIfMissing = (page: any): any => {
  if (!page.label) {
    page.label = page.title;
  }
  return page;
};

export const allPages: any = Object.fromEntries(
  Object.entries(pages).map(([key, page]) => [key, addLabelIfMissing(page)])
);

const pagesToRoutes = () => {
  return Object.values(allPages).map((page: any) => page);
};

export const routes: Routes = [
  ...pagesToRoutes(),
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
