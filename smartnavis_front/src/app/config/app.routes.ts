import { Routes } from '@angular/router';

import { HomePageComponent } from '../pages/home-page/home-page.component';
import { PuertosPageComponent } from '../pages/puertos-page/puertos-page.component';
import { EmbarcacionesPageComponent } from '../pages/embarcaciones-page/embarcaciones-page.component';
import { BienesPageComponent } from '../pages/bienes-page/bienes-page.component';

import { PublicacionesPageComponent } from '../pages/publicaciones-page/publicaciones-page.component';
import { EmbarcacionesPublicadasPageComponent } from '../pages/publicaciones-page/embarcaciones-publicadas-page.component';

export const routes: Routes = [
  { path: 'home', title: 'YateMate', component: HomePageComponent },
  { path: 'puertos', title: 'Puertos', component: PuertosPageComponent },
  {
    path: 'embarcaciones',
    title: 'Embarcaciones | YateMate',
    component: EmbarcacionesPageComponent,
  },
  {
    path: 'bienes',
    title: 'Bienes | YateMate',
    component: BienesPageComponent,
  },
  {
    path: 'publicaciones/embarcaciones',
    title: 'Publicaciones | YateMate',
    component: EmbarcacionesPublicadasPageComponent,
  },
  {
    path: 'publicaciones',
    title: 'Publicaciones | YateMate',
    component: PublicacionesPageComponent,
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
