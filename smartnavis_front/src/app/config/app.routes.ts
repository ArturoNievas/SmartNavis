import {Routes} from '@angular/router';
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {PuertosPageComponent} from "../pages/puertos-page/puertos-page.component";
import { EmbarcacionesPageComponent } from '../pages/embarcaciones-page/embarcaciones-page.component';
import { EmbarcacionesPublicadasPageComponent } from '../pages/embarcaciones-publicadas-page/embarcaciones-publicadas-page.component';

export const routes: Routes = [
  {path: 'home', title: 'Home', component: HomePageComponent},
  {path: 'puertos', title: 'Puertos', component: PuertosPageComponent},
  {path: 'embarcaciones', title: 'Embarcaciones', component: EmbarcacionesPageComponent},
  {path: 'embarcaciones/publicaciones', title: 'Publicaciones', component: EmbarcacionesPublicadasPageComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

